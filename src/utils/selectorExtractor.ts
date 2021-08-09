import { isUrlString } from "is-url-online";
import URL from "url";

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
}: SelectorExtractor): Record<string, string> => {
  const $ = data;
  if (!$) {
    throw new Error("e");
  }

  const output: Record<string, string> = {};
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
      const abcd = data.attr(key);
      if (key && abcd) {
        output[key] = abcd;
      }
    });
  }
  return output;
};
