import { isUrlString } from "is-url-online";
import URL from "url";
import type { AttributeOutputs } from "../types/QuickCrawlerType";

type SelectorExtractor = {
  attrs?: Record<string, true>;
  data: cheerio.Cheerio;
  href?: boolean;
  text?: boolean;
  url?: string;
};

export const selectorExtractor = ({
  attrs,
  data,
  href,
  text,
  url,
}: SelectorExtractor): AttributeOutputs => {
  const $ = data;
  if (!$) {
    throw new Error("e");
  }

  const output: AttributeOutputs = {};
  if (text) {
    output.text = data.text();
  }

  if (href) {
    let href = data.prop("href");
    try {
      isUrlString(href);
    } catch {
      const { href: absoluteUrl } = new URL.URL(href, url);

      href = absoluteUrl;
    }

    output.href = href;
  }

  if (attrs) {
    const keys = Object.keys(attrs);
    keys.forEach((key) => {
      const attribute = data.attr(key);
      if (key && attribute) {
        output.attrs = {
          [key]: attribute,
        };
      }
    });
  }
  if (!text) {
    delete output.text;
  }
  return output;
};
