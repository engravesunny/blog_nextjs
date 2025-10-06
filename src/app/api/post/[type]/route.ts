import { POSTINFO_OPERATION } from "@/enum/post";
import { RESPONSE_CODE, RESPONSE_MESSAGE } from "@/enum/response";
import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest, { params }: any) {
  try {
    const { type } = await params;
    const data = await request.json();
    const filePath = path.join(process.cwd(), "data", "info.json");
    if (type === POSTINFO_OPERATION.GET) {
      const fileContent = fs.readFileSync(filePath, "utf8");
      const data = JSON.parse(fileContent);
      console.log("[ data ] >", data);
      // 获取文章信息
      return NextResponse.json({
        code: RESPONSE_CODE.SUCCESS,
        msg: RESPONSE_MESSAGE.SUCCESS,
      });
    }
    if (type === POSTINFO_OPERATION.UPDATE) {
      // 更新文章信息
      console.log("[ data ] >", data);
      console.log("[ await params ] >", await params);
      const fileContent = fs.readFileSync(filePath, "utf8");
      console.log("[ filePath ] >", filePath);
      console.log("[ fileContent ] >", fileContent);
    }
    return NextResponse.json({
      code: RESPONSE_CODE.NOT_FOUND,
      msg: RESPONSE_MESSAGE.NOT_FOUND,
    });
  } catch (error) {
    return NextResponse.json({
      code: RESPONSE_CODE.UNKNOWN_ERROR,
      msg: RESPONSE_MESSAGE.UNKNOWN_ERROR,
    });
  }
}
