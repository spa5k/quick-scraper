export type QuickCrawler = {
  options: Record<string, SelectorOptions>;
  url: string;
};
export type SelectorOptions = {
  attrs?: Record<string, true> | undefined;
  href?: boolean;
  listItem?: boolean;
  nth?: number;
  selector: string;
  text: boolean;
};

// abc.text, abc.href, abc.attrs.customAttribute.

export type AttributeOutputs = {
  attrs?: Record<string, string> | undefined;
  href?: string;
  lists?: AttributeOutputs[];
  text?: string;
};

// output.raw=cheerio; output.data.text=something
export type DefaultOutputTypes = {
  data: Record<string, AttributeOutputs>;
  raw: cheerio.Root;
};

export type QuickCrawlerOutput = DefaultOutputTypes;
