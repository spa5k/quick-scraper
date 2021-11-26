import { load } from "cheerio";
import { isUrlOnline } from "is-url-online";
import type { Page } from "puppeteer";

export const urlParserHeadless = async (
  url: string,
  page: Page
): Promise<cheerio.Root> => {
  const isUrlExist = await isUrlOnline(url);
  if (!isUrlExist) {
    throw new Error("No Such url");
  }
  const navigationPromise = page.waitForNavigation();

  await page.goto(url, { waitUntil: "domcontentloaded" });

  await navigationPromise;

  const context = await page.content();

  return load(context);
};
