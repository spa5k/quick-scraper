import puppeteer from "puppeteer";
import { quickScraperHeadless } from "../src";

const testsArray: {
  output: string;
  selector: string;
  url: string;
}[] = [
  {
    selector: "ul.ulitem:nth-child(1) > li:nth-child(1) > a:nth-child(1)",
    output: "设为首页",
    url: "https://www.ptwxz.com/bookinfo/11/11622.html",
  },
  {
    selector:
      "#centerm > div:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > span:nth-child(1) > h1:nth-child(1)",
    output: "陆地键仙",
    url: "https://www.ptwxz.com/bookinfo/11/11622.html",
  },
  {
    selector: ".hero__subtitle",
    url: "https://typestrong.org/ts-node/",
    output: "TypeScript execution and REPL for node.js",
  },
];
jest.setTimeout(25_000);

describe("Test for PTWXZ - TEXT SELECTION - HEADLESS", () => {
  testsArray.forEach(({ output, selector, url }, index) => {
    test(`#${index + 1}: Testing ${url}`, async () => {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();

      await expect(
        quickScraperHeadless({
          url,
          options: {
            test: {
              selector,
            },
          },
          page,
        }).then((scrapedData) => scrapedData.data.test.text)
      ).resolves.toBe(output);

      await browser.close();
    });
  });
});
