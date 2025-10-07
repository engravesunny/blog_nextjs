import { RESPONSE_CODE, RESPONSE_MESSAGE } from "@/enum/response";
import { IResponseBody } from "../_type";
import { NextResponse } from "next/server";

interface IResponseCB {
  success: (data: any) => NextResponse<IResponseBody>;
  not_found: () => NextResponse<IResponseBody>;
  unknown: () => NextResponse<IResponseBody>;
}

export const handleResponse = (): IResponseCB => {
  return {
    success: (data: any) =>
      NextResponse.json({
        code: RESPONSE_CODE.SUCCESS,
        message: RESPONSE_MESSAGE.SUCCESS,
        data,
      }),
    not_found: () =>
      NextResponse.json({
        code: RESPONSE_CODE.NOT_FOUND,
        message: RESPONSE_MESSAGE.NOT_FOUND,
      }),
    unknown: () =>
      NextResponse.json({
        code: RESPONSE_CODE.UNKNOWN_ERROR,
        message: RESPONSE_MESSAGE.UNKNOWN_ERROR,
      }),
  };
};
