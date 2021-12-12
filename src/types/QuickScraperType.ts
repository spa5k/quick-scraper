import type { Page } from "playwright-chromium";

export type QuickScraper = {
  options: Record<string, SelectorOptions>;
  url: string;
};

export type QuickScraperHeadless = {
  options: Record<string, SelectorOptions>;
  page: Page;
  url: string;
};

export type QuickScraperHtml = {
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

export type QuickScraperOutput = {
  data: Record<string, AttributeOutputs>;
  rawString: string;
};

export type HTMLScraperOutput = {
  data: Record<string, AttributeOutputs>;
};
