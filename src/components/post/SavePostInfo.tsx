"use client";

import { IPostState } from "@/store/post";
import { useEffect } from "react";

interface ISavePostInfo {
  postInfo: IPostState;
}

export function SavePostInfo(props: ISavePostInfo) {
  const { postInfo } = props;
  useEffect(() => {
    console.log("[ postInfo ] >", postInfo);
  }, [postInfo]);

  return null;
}
