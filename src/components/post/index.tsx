"use client";

import { useStore } from "@/store/StoreProvider";

export const Post = () => {
  const postList = useStore().postState.postList;
  const addPost = useStore().addPost;
  return (
    <div>
      <div>
        Post {" =>> "} {Math.random()}
      </div>
      {postList.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
      <button
        onClick={() =>
          addPost({
            id: postList.length + 1,
            title: "test post",
            body: "test body",
          })
        }
      >
        add post
      </button>
    </div>
  );
};
