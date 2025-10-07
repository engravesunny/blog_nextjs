import { POSTINFO_OPERATION } from "@/enum/post";
import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import { handleResponse } from "../../_utils";

const response = handleResponse();

export async function POST(request: NextRequest, { params }: any) {
  try {
    const { type } = await params;
    const filePath = path.join(process.cwd(), "data", "info.json");
    if (type === POSTINFO_OPERATION.GET) {
      // 获取文章信息
      const fileContent = fs.readFileSync(filePath, "utf8");
      const data = JSON.parse(fileContent);
      return response.success(data);
    }
    if (type === POSTINFO_OPERATION.UPDATE) {
      // 更新文章信息
      const data = await request.json();
      console.log("[ data ] >", data);
      console.log("[ await params ] >", await params);
      const fileContent = fs.readFileSync(filePath, "utf8");
      console.log("[ filePath ] >", filePath);
      console.log("[ fileContent ] >", fileContent);
    }
    return response.not_found();
  } catch (error) {
    return response.unknown();
  }
}
