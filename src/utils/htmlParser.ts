import { load } from "cheerio";

export const htmlParser = (html: string): cheerio.Root => load(html);
