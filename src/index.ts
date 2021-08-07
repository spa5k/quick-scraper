/* eslint-disable promise/prefer-await-to-callbacks */
import chardet from "chardet";
import got, { Response } from "got";
import pkg from "iconv-lite";
import { isUrlOnline } from "is-url-online";

const main = async (url: string) => {
  const { decode } = pkg;
  const isUrlExist = await isUrlOnline(url);
  if (!isUrlExist) {
    return;
  }
  let response: Response<Buffer>;
  try {
    response = await got(url, {
      responseType: "buffer",
    });
  } catch (error) {
    console.log(error.response.body);
    return;
  }

  const encodingType = chardet.detect(response.rawBody);

  const decodedHtml = decode(response.rawBody, encodingType as string);
  // console.log(decodedHtml);
};

// eslint-disable-next-line unicorn/prefer-top-level-await
main("https://www.ptwxz.com/html/7/7811/").catch((error) => {
  console.log(error);
});


