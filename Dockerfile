# 阶段 1: 构建应用 (Builder Stage)
# 使用官方的 Node.js LTS (长期支持) 版本作为基础镜像，并命名为 "builder"
# Alpine 版本体积更小，是构建镜像的首选
FROM node:20-alpine AS builder

# 在容器内设置一个工作目录
WORKDIR /app

# 1. 首先复制 package.json 和 package-lock.json
# 这是一个优化技巧。Docker 会缓存每一步的结果。
# 因为依赖文件 (package.json) 变化的频率远低于源代码，
# 所以我们先复制它们并安装依赖。这样，只要你的依赖不变，
# 下次构建时 Docker 就会跳过这一步，大大加快构建速度。
COPY package*.json ./

# 安装项目的生产和开发依赖
RUN npm i pnpm -g
RUN pnpm i

# 2. 复制项目的所有源代码到工作目录
COPY . .
RUN npx tsc next.config.ts --outDir .
# 3. 构建 Next.js 应用
# 这个命令会读取你的代码，执行打包、优化等操作，生成一个可以在生产环境运行的 `.next` 文件夹
RUN npm run build

# 阶段 2: 运行应用 (Runner Stage)
# 再次使用一个干净、精简的 Node.js 镜像来运行最终的应用
# 这就是 "多阶段构建"，可以确保最终的镜像只包含运行所需的文件，而没有构建工具和源代码，从而减小镜像体积
FROM node:20-alpine AS runner

# 设置工作目录
WORKDIR /app

# 设置环境变量为生产环境，这对 Next.js 的行为有重要影响
ENV NODE_ENV=production

# 从 "builder" 阶段复制构建产物到当前阶段
# --from=builder 是关键，它告诉 Docker 从名为 "builder" 的上一阶段复制文件
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# 暴露 Next.js 生产服务器默认监听的端口
EXPOSE 3000

# 定义容器启动时要执行的命令
# 这个命令会启动 Next.js 的生产服务器
CMD ["npm", "start"]