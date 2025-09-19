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

export const postState: IPostState = {
  postList: [
    {
      id: 1,
      title: "Next.js 15 新特性详解",
      body: "探索 Next.js 15 带来的革命性变化，包括 React 19 支持、Turbopack 优化等。",
      content: `# Next.js 15 新特性详解

Next.js 15 是一个重要的版本更新，带来了许多令人兴奋的新特性和改进。

## 主要特性

### 1. React 19 支持
Next.js 15 完全支持 React 19，包括新的并发特性和服务器组件改进。

### 2. Turbopack 稳定版
Turbopack 现在已经稳定，提供了显著的构建性能提升。

### 3. 改进的缓存策略
新的缓存机制让应用程序更加高效。

## 总结
Next.js 15 是一个值得升级的版本，为开发者提供了更好的开发体验。`,
      excerpt:
        "探索 Next.js 15 带来的革命性变化，包括 React 19 支持、Turbopack 优化等。",
      author: "张三",
      category: "前端开发",
      tags: ["Next.js", "React", "前端"],
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z",
      readTime: 5,
      views: 128,
      likes: 23,
      coverImage: "/images/nextjs-15.jpg",
      published: true,
    },
    {
      id: 2,
      title: "TypeScript 最佳实践指南",
      body: "分享在大型项目中使用 TypeScript 的经验和最佳实践，提高代码质量和开发效率。",
      content: `# TypeScript 最佳实践指南

TypeScript 已经成为现代前端开发的标准工具。本文将分享一些在大型项目中的最佳实践。

## 类型定义

### 1. 接口 vs 类型别名
- 优先使用接口定义对象类型
- 使用类型别名定义联合类型和复杂类型

### 2. 泛型的使用
合理使用泛型可以提高代码的复用性和类型安全性。

## 项目配置

### tsconfig.json 配置
严格的 TypeScript 配置有助于捕获潜在的错误。

## 总结
遵循这些最佳实践可以让你的 TypeScript 项目更加健壮和可维护。`,
      excerpt:
        "分享在大型项目中使用 TypeScript 的经验和最佳实践，提高代码质量和开发效率。",
      author: "李四",
      category: "编程语言",
      tags: ["TypeScript", "JavaScript", "最佳实践"],
      createdAt: "2024-01-10T14:30:00Z",
      updatedAt: "2024-01-12T09:15:00Z",
      readTime: 8,
      views: 256,
      likes: 45,
      coverImage: "/images/typescript-guide.jpg",
      published: true,
    },
    {
      id: 3,
      title: "现代 CSS 布局技术",
      body: "深入了解 CSS Grid、Flexbox 和容器查询等现代布局技术，构建响应式网页设计。",
      content: `# 现代 CSS 布局技术

CSS 布局技术在过去几年中发生了巨大变化。让我们探索这些现代技术。

## CSS Grid

CSS Grid 是二维布局系统，非常适合复杂的页面布局。

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}
\`\`\`

## Flexbox

Flexbox 是一维布局系统，适合组件内部的布局。

## 容器查询

容器查询让组件可以根据其容器的大小进行响应式设计。

## 总结
掌握这些现代布局技术可以让你创建更灵活和响应式的网页设计。`,
      excerpt:
        "深入了解 CSS Grid、Flexbox 和容器查询等现代布局技术，构建响应式网页设计。",
      author: "王五",
      category: "前端开发",
      tags: ["CSS", "布局", "响应式设计"],
      createdAt: "2024-01-08T16:45:00Z",
      updatedAt: "2024-01-08T16:45:00Z",
      readTime: 6,
      views: 189,
      likes: 34,
      coverImage: "/images/css-layout.jpg",
      published: true,
    },
  ],
  categories: [
    {
      id: "frontend",
      name: "前端开发",
      description: "前端技术相关文章",
      count: 2,
    },
    {
      id: "programming",
      name: "编程语言",
      description: "编程语言学习和实践",
      count: 1,
    },
    { id: "design", name: "设计", description: "UI/UX 设计相关", count: 0 },
    {
      id: "backend",
      name: "后端开发",
      description: "后端技术和架构",
      count: 0,
    },
  ],
  allTags: [
    "Next.js",
    "React",
    "前端",
    "TypeScript",
    "JavaScript",
    "最佳实践",
    "CSS",
    "布局",
    "响应式设计",
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
