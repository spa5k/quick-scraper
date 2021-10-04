export type QuickCrawler = {
  options: Record<string, SelectorOptions>;
  url: string;
};

export type QuickCrawlerHtml = {
  baseUrl?: string;
  html: string;
  options: Record<string, SelectorOptions>;
};

export type SelectorOptions = {
  customAttributes?: Record<string, true>;
  href?: boolean;
  listItem?: boolean;
  selector: string;
  text?: boolean;
};

export type AttributeOutputs = {
  customAttributes?: Record<string, string>;
  href?: string;
  lists?: AttributeOutputs[];
  text?: string;
};

export type QuickCrawlerOutput = {
  data: Record<string, AttributeOutputs>;
  raw: cheerio.Root;
};
