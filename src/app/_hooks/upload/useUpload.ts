import { useState } from "react";
import { getToken } from "./token";
import * as qiniu from "qiniu-js";

export { getImageUrl } from "./getUrl";

export const useQiniuUpload = () => {
  const [uploadPercentage, setUploadPercentage] = useState(0);
  /**
   *
   * @param { File } file
   * @param { string } dir
   * @param { string } name
   * @returns { Promise<any> }
   */
  const uploadFile = (
    file: any = null,
    dir: string = "/test",
    name: string = "test.txt"
  ) => {
    return new Promise((resolve, reject) => {
      const key = dir + name;
      const token = getToken(key);
      const observable = qiniu.upload(
        file,
        key,
        token,
        {},
        {
          useCdnDomain: true,
          region: qiniu.region.z2,
        }
      );
      observable.subscribe({
        next(res) {
          // 更新进度
          setUploadPercentage(Math.ceil(res.total.percent));
        },
        error(err) {
          reject(err.message);
        },
        complete(res) {
          resolve("https://www.kecat.top/" + res.key);
          setUploadPercentage(0);
        },
      }); // 上传开始
    });
  };

  return {
    uploadPercentage,
    uploadFile,
  };
};
