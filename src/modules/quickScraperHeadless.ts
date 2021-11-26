import type {
  AttributeOutputs,
  QuickScraperHeadless,
  QuickScraperOutput,
} from "../types/QuickScraperType";
import { selectorHandler } from "../utils/selectorHandler";
import { urlParserHeadless } from "../utils/urlParserHeadless";

/**
 * @param  {} url Url to be scraped
 * @param {} page Puppeteer Page Object
 * @param  {} options QuickScraper
 * @returns Promise output
 * @description Scrapes the page through the URL by using headless browser
 */
export const quickScraperHeadless = async ({
  url,
  options,
  page,
}: QuickScraperHeadless): Promise<QuickScraperOutput> => {
  const $ = await urlParserHeadless(url, page);

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
    raw: $,
    data,
  };
};
