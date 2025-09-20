import { RootStore } from ".";

export type IPost = {
  id: number;
  title: string;
  body: string;
  content?: string; // 完整内容
  excerpt?: string; // 摘要
  author: string;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  readTime: number; // 预估阅读时间（分钟）
  views: number;
  likes: number;
  coverImage?: string;
  published: boolean;
};

export type ICategory = {
  id: string;
  name: string;
  description?: string;
  count: number;
};

export type IComment = {
  id: number;
  postId: number;
  author: string;
  content: string;
  createdAt: string;
  replies?: IComment[];
};

export type IPostState = {
  postList: IPost[];
  categories: ICategory[];
  allTags: string[];
  comments: IComment[];
  searchQuery: string;
  selectedCategory: string;
  selectedTags: string[];
  sortBy: "date" | "views" | "likes";
  sortOrder: "asc" | "desc";
  currentPost: IPost | null;
};

export type IPostActions = {
  // Actions
  addPost: (
    post: Omit<IPost, "id" | "createdAt" | "updatedAt" | "views" | "likes">
  ) => void;
  updatePost: (id: number, updates: Partial<IPost>) => void;
  deletePost: (id: number) => void;
  setCurrentPost: (post: IPost | null) => void;

  addCategory: (category: Omit<ICategory, "count">) => void;
  updateCategory: (id: string, updates: Partial<ICategory>) => void;
  deleteCategory: (id: string) => void;

  addComment: (comment: Omit<IComment, "id" | "createdAt">) => void;
  deleteComment: (id: number) => void;

  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setSelectedTags: (tags: string[]) => void;
  setSortBy: (sortBy: "date" | "views" | "likes") => void;
  setSortOrder: (order: "asc" | "desc") => void;

  likePost: (id: number) => void;
  incrementViews: (id: number) => void;

  getFilteredPosts: () => IPost[];
  getPostsByCategory: (category: string) => IPost[];
  getPostsByTag: (tag: string) => IPost[];
};

export type IPostStore = IPostState & IPostActions;

// Mock 数据生成函数
const generateMockPosts = (): IPost[] => {
  const authors = [
    "张三",
    "李四",
    "王五",
    "赵六",
    "钱七",
    "孙八",
    "周九",
    "吴十",
  ];
  const categories = [
    "前端开发",
    "后端开发",
    "编程语言",
    "设计",
    "工具",
    "架构",
  ];
  const tagPool = [
    "React",
    "Vue",
    "Angular",
    "Next.js",
    "Nuxt.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Python",
    "Java",
    "Go",
    "Rust",
    "CSS",
    "HTML",
    "Sass",
    "Less",
    "Webpack",
    "Vite",
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "MongoDB",
    "MySQL",
    "PostgreSQL",
    "Redis",
    "GraphQL",
    "REST API",
    "微服务",
    "单页应用",
    "PWA",
    "移动开发",
    "响应式设计",
    "UI/UX",
    "设计系统",
    "性能优化",
    "SEO",
    "测试",
    "CI/CD",
    "DevOps",
    "安全",
    "区块链",
    "AI",
    "机器学习",
    "数据分析",
  ];

  const titles = [
    "Next.js 15 新特性详解",
    "TypeScript 最佳实践指南",
    "现代 CSS 布局技术",
    "React 18 并发特性深度解析",
    "Vue 3 Composition API 实战指南",
    "Node.js 性能优化技巧",
    "微服务架构设计模式",
    "前端工程化最佳实践",
    "GraphQL vs REST API 对比分析",
    "Docker 容器化部署实战",
    "Webpack 5 模块联邦详解",
    "PWA 渐进式 Web 应用开发",
    "前端安全防护策略",
    "响应式设计进阶技巧",
    "JavaScript 异步编程模式",
    "CSS-in-JS 解决方案对比",
    "前端监控与错误追踪",
    "Web Components 组件化开发",
    "Serverless 架构实践",
    "前端测试策略与工具选择",
  ];

  return titles.map((title, index) => {
    const id = index + 1;
    const author = authors[Math.floor(Math.random() * authors.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const numTags = Math.floor(Math.random() * 4) + 2; // 2-5个标签
    const tags = Array.from(
      { length: numTags },
      () => tagPool[Math.floor(Math.random() * tagPool.length)]
    ).filter((tag, idx, arr) => arr.indexOf(tag) === idx); // 去重

    const readTime = Math.floor(Math.random() * 15) + 3; // 3-17分钟
    const views = Math.floor(Math.random() * 1000) + 50; // 50-1049浏览量
    const likes = Math.floor(Math.random() * 100) + 5; // 5-104点赞数

    // 生成创建时间（最近30天内）
    const daysAgo = Math.floor(Math.random() * 30);
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - daysAgo);

    // 更新时间可能与创建时间相同或稍晚
    const updatedAt = new Date(createdAt);
    if (Math.random() > 0.7) {
      // 30%的概率有更新
      updatedAt.setHours(updatedAt.getHours() + Math.floor(Math.random() * 48));
    }

    const body = `探索${title}的核心概念和实践应用，深入分析技术细节，分享实战经验和最佳实践。本文将帮助你更好地理解和掌握相关技术。`;

    const content = `# ${title}

## 概述

${body}

## 核心特性

### 1. 主要功能
详细介绍主要功能和特性，包括使用场景和优势分析。

### 2. 技术实现
深入分析技术实现原理，提供代码示例和最佳实践。

### 3. 性能优化
探讨性能优化策略和实际应用中的注意事项。

## 实战案例

通过具体的实战案例，展示如何在项目中应用这些技术。

\`\`\`javascript
// 示例代码
const example = {
  title: "${title}",
  description: "实战示例",
  implementation: () => {
    console.log("具体实现逻辑");
  }
};
\`\`\`

## 最佳实践

1. **代码规范** - 遵循统一的代码规范和风格指南
2. **性能考虑** - 注重性能优化和用户体验
3. **可维护性** - 编写易于维护和扩展的代码
4. **测试覆盖** - 确保充分的测试覆盖率

## 总结

${title}为现代开发提供了强大的能力，通过合理使用可以显著提升开发效率和项目质量。建议在实际项目中逐步应用这些技术和最佳实践。

## 参考资源

- 官方文档
- 社区最佳实践
- 相关技术博客
- 开源项目案例`;

    return {
      id,
      title,
      body,
      content,
      excerpt: body,
      author,
      category,
      tags,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
      readTime,
      views,
      likes,
      coverImage: Math.random() > 0.3 ? `/images/post-${id}.jpg` : undefined, // 70%有封面图
      published: true,
    };
  });
};

export const postState: IPostState = {
  postList: generateMockPosts(),
  categories: [
    {
      id: "frontend",
      name: "前端开发",
      description: "前端技术相关文章",
      count: 8,
    },
    {
      id: "backend",
      name: "后端开发",
      description: "后端技术和架构",
      count: 4,
    },
    {
      id: "programming",
      name: "编程语言",
      description: "编程语言学习和实践",
      count: 3,
    },
    {
      id: "design",
      name: "设计",
      description: "UI/UX 设计相关",
      count: 2,
    },
    {
      id: "tools",
      name: "工具",
      description: "开发工具和效率提升",
      count: 2,
    },
    {
      id: "architecture",
      name: "架构",
      description: "系统架构和设计模式",
      count: 1,
    },
  ],
  allTags: [
    "Next.js",
    "React",
    "TypeScript",
    "JavaScript",
    "最佳实践",
    "CSS",
    "布局",
    "响应式设计",
    "Vue",
    "Angular",
    "Node.js",
    "Python",
    "Java",
    "Go",
    "Rust",
    "HTML",
    "Sass",
    "Less",
    "Webpack",
    "Vite",
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "MongoDB",
    "MySQL",
    "PostgreSQL",
    "Redis",
    "GraphQL",
    "REST API",
    "微服务",
    "单页应用",
    "PWA",
    "移动开发",
    "UI/UX",
    "设计系统",
    "性能优化",
    "SEO",
    "测试",
    "CI/CD",
    "DevOps",
    "安全",
    "区块链",
    "AI",
    "机器学习",
    "数据分析",
  ],
  comments: [
    {
      id: 1,
      postId: 1,
      author: "读者A",
      content: "很好的文章，学到了很多！",
      createdAt: "2024-01-16T08:30:00Z",
    },
    {
      id: 2,
      postId: 1,
      author: "读者B",
      content: "期待更多关于 Next.js 的内容。",
      createdAt: "2024-01-16T10:15:00Z",
    },
  ],
  searchQuery: "",
  selectedCategory: "",
  selectedTags: [],
  sortBy: "date",
  sortOrder: "desc",
  currentPost: null,
};

export const postActions = (set: any, get: any) => ({
  addPost: (
    post: Omit<IPost, "id" | "createdAt" | "updatedAt" | "views" | "likes">
  ) => {
    set((state: RootStore) => {
      const newPost: IPost = {
        ...post,
        id: Math.max(...state.postState.postList.map((p) => p.id), 0) + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: 0,
        likes: 0,
      };
      state.postState.postList.push(newPost);

      // 更新分类计数
      const category = state.postState.categories.find(
        (c) => c.name === post.category
      );
      if (category) {
        category.count++;
      }

      // 更新标签列表
      post.tags.forEach((tag) => {
        if (!state.postState.allTags.includes(tag)) {
          state.postState.allTags.push(tag);
        }
      });
    });
  },

  updatePost: (id: number, updates: Partial<IPost>) => {
    set((state: RootStore) => {
      const postIndex = state.postState.postList.findIndex((p) => p.id === id);
      if (postIndex !== -1) {
        state.postState.postList[postIndex] = {
          ...state.postState.postList[postIndex],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
      }
    });
  },

  deletePost: (id: number) => {
    set((state: RootStore) => {
      const postIndex = state.postState.postList.findIndex((p) => p.id === id);
      if (postIndex !== -1) {
        const post = state.postState.postList[postIndex];
        state.postState.postList.splice(postIndex, 1);

        // 更新分类计数
        const category = state.postState.categories.find(
          (c) => c.name === post.category
        );
        if (category && category.count > 0) {
          category.count--;
        }
      }
    });
  },

  setCurrentPost: (post: IPost | null) => {
    set((state: RootStore) => {
      state.postState.currentPost = post;
    });
  },

  addCategory: (category: Omit<ICategory, "count">) => {
    set((state: RootStore) => {
      state.postState.categories.push({ ...category, count: 0 });
    });
  },

  updateCategory: (id: string, updates: Partial<ICategory>) => {
    set((state: RootStore) => {
      const categoryIndex = state.postState.categories.findIndex(
        (c) => c.id === id
      );
      if (categoryIndex !== -1) {
        state.postState.categories[categoryIndex] = {
          ...state.postState.categories[categoryIndex],
          ...updates,
        };
      }
    });
  },

  deleteCategory: (id: string) => {
    set((state: RootStore) => {
      state.postState.categories = state.postState.categories.filter(
        (c) => c.id !== id
      );
    });
  },

  addComment: (comment: Omit<IComment, "id" | "createdAt">) => {
    set((state: RootStore) => {
      const newComment: IComment = {
        ...comment,
        id: Math.max(...state.postState.comments.map((c) => c.id), 0) + 1,
        createdAt: new Date().toISOString(),
      };
      state.postState.comments.push(newComment);
    });
  },

  deleteComment: (id: number) => {
    set((state: RootStore) => {
      state.postState.comments = state.postState.comments.filter(
        (c) => c.id !== id
      );
    });
  },

  setSearchQuery: (query: string) => {
    set((state: RootStore) => {
      state.postState.searchQuery = query;
    });
  },

  setSelectedCategory: (category: string) => {
    set((state: RootStore) => {
      state.postState.selectedCategory = category;
    });
  },

  setSelectedTags: (tags: string[]) => {
    set((state: RootStore) => {
      state.postState.selectedTags = tags;
    });
  },

  setSortBy: (sortBy: "date" | "views" | "likes") => {
    set((state: RootStore) => {
      state.postState.sortBy = sortBy;
    });
  },

  setSortOrder: (order: "asc" | "desc") => {
    set((state: RootStore) => {
      state.postState.sortOrder = order;
    });
  },

  likePost: (id: number) => {
    set((state: RootStore) => {
      const post = state.postState.postList.find((p) => p.id === id);
      if (post) {
        post.likes++;
      }
    });
  },

  incrementViews: (id: number) => {
    set((state: RootStore) => {
      const post = state.postState.postList.find((p) => p.id === id);
      if (post) {
        post.views++;
      }
    });
  },

  getFilteredPosts: () => {
    const state = get() as RootStore;
    let filtered = [...state.postState.postList];

    // 搜索过滤
    if (state.postState.searchQuery) {
      const query = state.postState.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.body.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // 分类过滤
    if (state.postState.selectedCategory) {
      filtered = filtered.filter(
        (post) => post.category === state.postState.selectedCategory
      );
    }

    // 标签过滤
    if (state.postState.selectedTags.length > 0) {
      filtered = filtered.filter((post) =>
        state.postState.selectedTags.some((tag) => post.tags.includes(tag))
      );
    }

    // 排序
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (state.postState.sortBy) {
        case "date":
          comparison =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case "views":
          comparison = a.views - b.views;
          break;
        case "likes":
          comparison = a.likes - b.likes;
          break;
      }
      return state.postState.sortOrder === "asc" ? comparison : -comparison;
    });

    return filtered;
  },

  getPostsByCategory: (category: string) => {
    const state = get() as RootStore;
    return state.postState.postList.filter(
      (post) => post.category === category
    );
  },

  getPostsByTag: (tag: string) => {
    const state = get() as RootStore;
    return state.postState.postList.filter((post) => post.tags.includes(tag));
  },
});
