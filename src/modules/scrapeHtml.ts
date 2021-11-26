import type {
  AttributeOutputs,
  QuickScraperHtml,
  QuickScraperOutput,
} from "../types/QuickScraperType";
import { htmlParser } from "../utils/htmlParser";
import { selectorHandler } from "../utils/selectorHandler";

/**
 * @html  String
 * @param  {} options
 * @param  {} baseUrl
 * @returns Promise<QuickScraperHtml>
 * @description Scrapes the HTML string
 */

export const scrapeHtml = async ({
  html,
  options,
  baseUrl,
}: QuickScraperHtml): Promise<QuickScraperOutput> => {
  const $ = htmlParser(html);

  const optionKeys = Object.keys(options);

  const data: Record<string, AttributeOutputs> = {};

  const url = baseUrl ? baseUrl : "";
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
