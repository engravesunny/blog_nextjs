"use client";

import React from "react";
import { useStore } from "@/store/StoreProvider";

export const Post = () => {
  const postList = useStore().postState.postList;
  const addPost = useStore().addPost;
  const tags = useStore().postState.tags;

  return (
    <div className="post-container">
      <h1 className="blog-title">我的博客</h1>

      <div className="tags-section">
        {tags.map((tag, index) => (
          <span key={index} className="tag">
            #{tag}
          </span>
        ))}
      </div>

      <div className="posts-grid">
        {postList.map((post) => (
          <article key={post.id} className="post-card">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-body">{post.body}</p>
            <div className="post-meta">
              <span className="post-date">
                {new Date().toLocaleDateString()}
              </span>
              <button className="read-more-btn">阅读更多</button>
            </div>
          </article>
        ))}
      </div>

      <div className="action-buttons">
        <button
          className="add-post-btn"
          onClick={() =>
            addPost({
              id: postList.length + 1,
              title: "新文章 " + (postList.length + 1),
              body: "这是一篇新创建的博客文章内容。在这里可以分享我的想法、经验和知识。",
            })
          }
        >
          + 添加文章
        </button>
      </div>
    </div>
  );
};
