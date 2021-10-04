import type { AttributeOutputs } from "../types/QuickCrawlerType";
import { selectorExtractor } from "./selectorExtractor";
// Input will take the options -
/*
attributes the selector wants-
is it for a list item, also if it has a childrenSelector-
data is the cheerio's root;
attrs is the optional attributes to be selected;
*/

type SelectorHandler = {
  attrs?: Record<string, true>;
  childElement?: cheerio.Element;
  data: cheerio.Root;
  href?: boolean;
  selector?: string;
  text: boolean;
  url: string;
};

export const selectorHandler = ({
  href,
  attrs,
  text,
  selector,
  data,
  url,
  childElement,
}: SelectorHandler): AttributeOutputs => {
  const $ = data;

  if (!$) {
    throw new Error("no data found");
  }

  if (childElement) {
    const selectedNode = $(childElement);
    return selectorExtractor({
      attrs,
      data: selectedNode,
      href,
      text,
      url,
    });
  }
  const selectedNode = $(selector);
  return selectorExtractor({
    attrs,
    data: selectedNode,
    href,
    text,
    url,
  });
};
