"use client";

import { usePostStore } from "@/store/post";
import { shallow } from "zustand/shallow";

export const Tags = () => {
  // const { tags } = usePostStore();
  // const { tags } = usePostStore((state) => ({ tags: state.tags }), shallow);
  const [tags] = usePostStore((state) => [state.tags], shallow);
  return (
    <>
      <div>
        Tags {" =>> "} {Math.random()}
      </div>
      {tags.map((tag) => (
        <div key={tag}>{tag}</div>
      ))}
    </>
  );
};
