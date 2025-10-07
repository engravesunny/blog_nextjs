import { IPostState } from "@/store/post";
import { ApiResponse, post } from "@/utils/request";

export const getPostInfo = async (): Promise<ApiResponse<IPostState>> => {
  return await post<IPostState>("/post/get");
};

export const changePostInfo = async (
  data: any
): Promise<ApiResponse<IPostState>> => {
  console.log("[ postinit ] >");
  return await post<IPostState>("/post/update", data);
};
