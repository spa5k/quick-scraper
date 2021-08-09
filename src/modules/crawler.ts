import type {
  AttributeOutputs,
  QuickCrawler,
  QuickCrawlerOutput,
} from "../types/QuickCrawlerType";
import { scraper } from "../utils/scraper";
import { selectorHandler } from "./selectorHandler";

export const crawler = async ({
  url,
  options,
}: QuickCrawler): Promise<QuickCrawlerOutput> => {
  const $ = await scraper(url);

  const optionKeys = Object.keys(options);

  const data: Record<string, AttributeOutputs> = {};

  optionKeys.forEach((key) => {
    const object = options[key];
    const { selector, href, attrs, listItem } = object;

    if (listItem) {
      const lists: AttributeOutputs[] = [];
      $(selector).each((_i, childElement) => {
        const keyResult = selectorHandler({
          text: true,
          href,
          url,
          attrs,
          childElement,
          data: $,
        });
        lists.push(keyResult);
      });

      data[key] = {
        lists,
      };
    } else {
      const keyResult = selectorHandler({
        text: true,
        data: $,
        selector,
        href,
        url,
        attrs,
      });
      data[key] = keyResult;
    }
  });

  return {
    raw: $,
    data,
  };
};
