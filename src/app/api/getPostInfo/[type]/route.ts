import { RESPONSE_CODE, RESPONSE_MESSAGE } from "@/enum/response";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: any) {
  try {
    const { type } = await params;
    const res = await fetch("https://www.kecat.top/postJSON/postJSON.json");
    const data = await res.json();
    const targetValue = data?.[type];
    if (targetValue) {
      return NextResponse.json({
        code: RESPONSE_CODE.SUCCESS,
        msg: RESPONSE_MESSAGE.SUCCESS,
        data: targetValue,
      });
    } else {
      return NextResponse.json({
        code: RESPONSE_CODE.NOT_FOUND,
        msg: RESPONSE_MESSAGE.NOT_FOUND,
      });
    }
  } catch (error) {
    return NextResponse.json({
      code: RESPONSE_CODE.UNKNOWN_ERROR,
      msg: RESPONSE_MESSAGE.UNKNOWN_ERROR,
    });
  }
}
