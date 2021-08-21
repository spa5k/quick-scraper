import type {
  AttributeOutputs,
  QuickCrawlerHtml,
  QuickCrawlerOutput
} from "../types/QuickCrawlerType";
import { htmlParser } from "../utils/htmlParser";
import { selectorHandler } from "../utils/selectorHandler";

export const scrapeHtml = async ({
  html,
  options,
  baseUrl,
}: QuickCrawlerHtml): Promise<QuickCrawlerOutput> => {
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
      $(selector).each((_i, childElement) => {
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
