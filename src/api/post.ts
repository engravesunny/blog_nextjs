import { get, post } from "@/utils/request";

export const getPostList = async () => {
  return await post("/post/get");
};

export const changePostList = async (data: any) => {
  console.log("[ postinit ] >");
  return await post("/post/update", data);
};
