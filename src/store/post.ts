/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { RootStore } from ".";

type IPost = {
  id: number;
  title: string;
  body: string;
};
export type IPostStore = {
  postList: IPost[];
  tags: string[];
  addPost: (post: IPost) => void;
  removeAllPosts: () => void;
  addTag: (tag: string) => void;
};

export const postState = {
  postList: [
    {
      id: 1,
      title: "Post 1",
      body: "This is the first post",
    },
    {
      id: 2,
      title: "Post 2",
      body: "This is the second post",
    },
  ],
  tags: ["tag1", "tag2"],
};

export const postActions = (set: any, get: any) => ({
  addPost: (post: IPost) => {
    set((state: RootStore) => {
      state.postState.postList.push(post);
    });
  },
  removeAllPosts: () =>
    set(() => ({
      postList: [],
    })),
  addTag: (tag: string) =>
    set((state: RootStore) => {
      state.postState.tags.push(tag);
    }),
});
