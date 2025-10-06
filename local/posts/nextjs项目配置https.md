# Nginx Proxy Manager（NPM）+ Next.js 博客部署配置文档（含避坑指南）

## 一、部署前提

1. 已安装 Docker 环境（可通过 `sudo systemctl status docker` 验证，确保状态为 `active`）
2. 已安装 Portainer（可选，用于可视化管理容器，也可全程通过命令行操作）
3. 已准备好域名（如 `myblog.com`），并完成 DNS 解析（将域名指向服务器公网 IP）
4. 服务器开放 80（HTTP）、443（HTTPS）、81（NPM 管理界面）端口（云服务器需配置安全组，本地服务器需开放防火墙端口）

## 二、第一步：配置 Docker 国内镜像源（加速镜像拉取）

### 1. 编辑 Docker 配置文件

```bash
# 打开 daemon.json 配置文件（若文件不存在会自动创建）
sudo nano /etc/docker/daemon.json
```

### 2. 写入国内镜像源配置

```json
{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn", // 中科大镜像源
    "https://hub-mirror.c.163.com", // 网易镜像源
    "https://cr.console.aliyun.com" // 阿里云镜像源（推荐）
  ],
  "live-restore": false // 可选配置，关闭容器实时恢复
}
```

### 3. 重启 Docker 使配置生效

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

### 4. 验证配置是否生效

```bash
docker info | grep "Registry Mirrors"
# 输出包含配置的镜像源地址即生效
```

### ❌ 避坑指南：Docker 配置文件语法错误

- **踩坑现象**：配置后 Docker 启动失败，执行 `sudo systemctl status docker` 显示「JSON 语法错误」
- **坑因**：`daemon.json` 格式不规范（如多顶级对象、缺少逗号、用单引号、末尾多逗号）
- **解决**：
  1. 确保仅一个顶级 `{}` 包裹所有配置
  2. 键值对用英文逗号分隔，最后一个键值对后无逗号
  3. 字符串必须用双引号（不可用单引号或无引号）
- **示例错误配置**：

  ```json
  // 错误1：多顶级对象
  { "registry-mirrors": ["xxx"] },
  { "live-restore": false }

  // 错误2：末尾多逗号
  {
      "registry-mirrors": ["xxx"],  // 末尾多逗号
  }
  ```

## 三、第二步：创建 Docker 存储卷（持久化 NPM 数据）

### 1. 创建存储卷（命令行操作）

```bash
# 创建 NPM 配置存储卷（保存代理规则、账号等）
docker volume create npm_data
# 创建 NPM SSL 证书存储卷（保存 Let's Encrypt 证书）
docker volume create npm_letsencrypt
```

### 2. 验证存储卷是否创建成功

```bash
docker volume ls
# 输出包含 npm_data 和 npm_letsencrypt 即成功
```

### ❌ 避坑指南：存储卷挂载路径错误

- **踩坑现象**：NPM 配置/证书丢失（容器重建后配置归零）
- **坑因**：启动 NPM 容器时，存储卷挂载路径与容器内部路径不匹配（NPM 固定路径为 `/data` 和 `/etc/letsencrypt`）
- **解决**：启动 NPM 时必须用 `-v npm_data:/data` 和 `-v npm_letsencrypt:/etc/letsencrypt`，不可自定义容器内路径

## 四、第三步：部署 Next.js 博客容器

### 1. 拉取 Next.js 镜像（若已本地构建镜像可跳过）

```bash
# 示例：拉取自定义 Next.js 镜像（替换为你的镜像名）
docker pull kecat/kecat-blog:0.1.0
```

### 2. 创建自定义 Docker 网络（解决容器间通信问题）

```bash
# 创建名为 my-network 的自定义网络（避免默认 bridge 网络 DNS 解析问题）
docker network create my-network
```

### 3. 启动 Next.js 容器（加入自定义网络）

```bash
docker run -d \
  --name kecat-blog \          # 容器名（后续 NPM 代理需用到）
  --network my-network \       # 加入自定义网络
  kecat/kecat-blog:0.1.0       # 你的 Next.js 镜像名
# 注意：无需映射 3000 端口到公网，仅需容器内部监听 3000 端口
```

### 4. 验证 Next.js 容器状态

```bash
docker ps | grep kecat-blog
# 状态为 Up 即启动成功；若失败，用 docker logs kecat-blog 查看报错
```

### ❌ 避坑指南 1：容器名重复导致创建失败

- **踩坑现象**：执行 `docker run` 时报错「Conflict. The container name "/kecat-blog" is already in use」
- **坑因**：之前创建过同名容器（即使已停止，容器名仍被占用）
- **解决**：强制删除旧容器后重建
  ```bash
  docker rm -f kecat-blog  # -f 强制删除，无论容器是否运行
  ```

### ❌ 避坑指南 2：Next.js 容器未加入自定义网络

- **踩坑现象**：NPM 无法访问 Next.js，`curl http://kecat-blog:3000` 报「Could not resolve host」
- **坑因**：Next.js 与 NPM 不在同一网络，Docker 无法通过容器名解析
- **解决**：启动容器时必须加 `--network my-network`，或事后将容器加入网络
  ```bash
  docker network connect my-network kecat-blog  # 事后加入网络
  ```

## 五、第四步：部署 Nginx Proxy Manager（NPM）容器

### 1. 拉取 NPM 官方镜像

```bash
docker pull jc21/nginx-proxy-manager:latest
```

### 2. 启动 NPM 容器（映射端口+挂载存储卷+加入自定义网络）

```bash
docker run -d \
  --name nginx-proxy-manager \  # NPM 容器名
  -p 80:80 \                    # 映射 HTTP 端口（主机:容器）
  -p 443:443 \                  # 映射 HTTPS 端口
  -p 81:81 \                    # 映射 NPM 管理界面端口
  --network my-network \        # 加入自定义网络（与 Next.js 同网络）
  -v npm_data:/data \           # 挂载配置存储卷
  -v npm_letsencrypt:/etc/letsencrypt \  # 挂载证书存储卷
  jc21/nginx-proxy-manager:latest  # NPM 官方镜像
```

### 3. 验证 NPM 容器状态

```bash
docker ps | grep nginx-proxy-manager
# 状态为 Up 且端口映射正常（80->80、443->443、81->81）即成功
```

### ❌ 避坑指南：NPM 配置中加入无效参数

- **踩坑现象**：NPM 容器启动失败，日志报「unknown key 'restart-policy'」
- **坑因**：在 `daemon.json` 中加入了容器级配置（`restart-policy` 是容器启动参数，非 Docker 守护进程配置）
- **解决**：删除 `daemon.json` 中的 `restart-policy` 相关配置，容器自启动需用 `docker update --restart=always 容器名`

## 六、第五步：配置 NPM 反向代理（实现 HTTPS 访问）

### 1. 登录 NPM 管理界面

- 浏览器访问：`http://服务器公网IP:81`
- 默认账号：`admin@example.com`
- 默认密码：`changeme`
- 首次登录需修改密码（记好新密码，后续管理用）

### 2. 添加反向代理规则（关联 NPM 与 Next.js）

1. 进入 NPM 主界面 → 左侧 `Hosts` → `Proxy Hosts` → 右上角 `Add Proxy Host`
2. 配置 `Details` 标签页（核心配置）：
   - **Domain Names**：输入你的域名（如 `myblog.com`，多个域名用逗号分隔）
   - **Scheme**：选择 `http`（容器内部通信无需 HTTPS）
   - **Forward Hostname / IP**：输入 Next.js 容器名 `kecat-blog`（Docker 内部通过容器名解析）
   - **Forward Port**：输入 `3000`（Next.js 容器内部默认端口）
   - 其他默认，点击 `Save`

### 3. 配置 SSL 证书（启用 HTTPS）

1. 找到刚创建的代理规则 → 右侧 `Edit` → 切换到 `SSL` 标签页
2. 配置 SSL 证书：
   - **SSL Certificate**：选择 `Request a new SSL Certificate`（申请免费 Let's Encrypt 证书）
   - 勾选 `Force SSL`（强制 HTTP 跳转 HTTPS，确保安全）
   - 勾选 `HTTP/2 Support`（启用 HTTP/2，提升访问速度）
   - **Email Address**：输入你的邮箱（用于证书过期提醒，NPM 会自动续期）
   - 勾选 `I agree to the Let's Encrypt Terms of Service`
   - 点击 `Save`，等待证书申请完成（约 10-30 秒）

### 4. 验证 HTTPS 是否生效

- 浏览器访问 `https://你的域名`（如 `https://myblog.com`）
- 地址栏显示「小绿锁」，且页面正常加载 Next.js 博客 → 配置成功

### ❌ 避坑指南 1：NPM 代理配置中填错后端地址/端口

- **踩坑现象**：访问域名显示 502 Bad Gateway
- **坑因**：
  1. `Forward Hostname / IP` 填了服务器公网 IP（而非容器名 `kecat-blog`）
  2. `Forward Port` 填了 80/443（而非 Next.js 内部端口 3000）
- **解决**：严格按步骤 2 配置，`Forward Hostname` 填容器名，`Forward Port` 填 3000

### ❌ 避坑指南 2：SSL 证书申请失败

- **踩坑现象**：点击 Save 后报「Could not validate challenge」
- **坑因**：
  1. 域名未解析到服务器 IP（或解析未生效，DNS 生效需 5-10 分钟）
  2. 服务器 80 端口未开放（Let's Encrypt 需通过 80 端口验证域名所有权）
- **解决**：
  1. 用 `ping 你的域名` 验证解析是否指向服务器 IP
  2. 检查云服务器安全组/防火墙，确保 80 端口开放

## 七、常见问题排查（补充）

### 1. 访问域名显示 502 Bad Gateway（续）

- **排查步骤**：
  1. 确认 Next.js 容器运行：`docker ps | grep kecat-blog`（状态为 Up）
  2. 验证 NPM 与 Next.js 网络连通：进入 NPM 容器执行 `curl http://kecat-blog:3000`，返回 HTML 即正常
  3. 若 `curl` 失败，重启 Docker 网络服务：`sudo systemctl restart docker`

### 2. 浏览器显示旧 favicon（网页图标）

- **踩坑现象**：HTTPS 访问正常，但标签页显示之前其他服务的图标
- **坑因**：浏览器缓存（favicon 缓存时间较长）
- **解决**：清除浏览器缓存（Chrome：Ctrl+Shift+Del → 勾选「缓存的图片和文件」）

### 3. 443 端口被占用

- **排查命令**：`sudo netstat -tulpn | grep 443`
- **解决**：停止占用进程（如占用进程为 Nginx，执行 `sudo systemctl stop nginx`），再重启 NPM 容器

## 八、后续维护

1. **容器自启动配置**：避免服务器重启后手动启动容器
   ```bash
   docker update --restart=always portainer
   docker update --restart=always kecat-blog
   docker update --restart=always nginx-proxy-manager
   ```
2. **备份 NPM 数据**：Docker 存储卷默认路径为 `/var/lib/docker/volumes/`，复制 `npm_data` 和 `npm_letsencrypt` 目录即可备份
3. **证书续期**：NPM 自动续期 Let's Encrypt 证书（有效期 90 天），无需手动操作

## 九、命令行汇总（快速参考）

| 操作目的         | 命令                                                                       |
| ---------------- | -------------------------------------------------------------------------- |
| 重启 Docker      | `sudo systemctl restart docker`                                            |
| 查看容器状态     | `docker ps`（运行中）/ `docker ps -a`（所有）                              |
| 查看容器日志     | `docker logs 容器名`（如 `docker logs kecat-blog`）                        |
| 强制删除容器     | `docker rm -f 容器名`                                                      |
| 进入容器内部     | `docker exec -it 容器名 sh`（如 `docker exec -it nginx-proxy-manager sh`） |
| 查看 Docker 网络 | `docker network ls` / `docker network inspect my-network`                  |
| 设置容器自启动   | `docker update --restart=always 容器名`                                    |
