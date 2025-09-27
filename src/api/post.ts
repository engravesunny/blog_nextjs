import { get } from "@/utils/request";

export const getPostList = async () => {
  return await get("/getPostInfo/postInfo");
};
