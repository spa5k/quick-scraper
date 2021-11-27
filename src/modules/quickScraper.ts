import type {
  AttributeOutputs,
  QuickScraper,
  QuickScraperOutput,
} from "../types/QuickScraperType";
import { selectorHandler } from "../utils/selectorHandler";
import { urlParser } from "../utils/urlParser";

/**
 * @param  {} {url}
 * @param  {} options QuickScraper
 * @returns Promise output
 * @description Scrapes the page through the URL
 */

export const quickScraper = async ({
  url,
  options,
}: QuickScraper): Promise<QuickScraperOutput> => {
  const { html, raw: $ } = await urlParser(url);

  const optionKeys = Object.keys(options);

  const data: Record<string, AttributeOutputs> = {};

  optionKeys.forEach((key) => {
    const object = options[key];
    const {
      selector,
      href,
      customAttributes: attrs,
      listItem,
      text = true,
    } = object;

    if (listItem) {
      const lists: AttributeOutputs[] = [];
      $(selector).each((_i: number, childElement: cheerio.Element) => {
        const keyResult = selectorHandler({
          text,
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
        text,
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
    data,
    rawString: html,
  };
};
