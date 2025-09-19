import * as qiniu from "qiniu-js";

const domain = process.env.NEXT_PUBLIC_QINIU_DOMAIN;

export const getImageUrl = (quality: number, key: string) => {
  return qiniu.imageMogr2({ quality }, key, domain);
};
