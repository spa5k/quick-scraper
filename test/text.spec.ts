import { quickScraper } from "../src";

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

describe("Test for PTWXZ - TEXT SELECTION", () => {
  testsArray.forEach(({ output, selector, url }, index) => {
    test(`#${index + 1}: Testing ${url}`, async () => {
      expect(
        await quickScraper({
          url,
          options: {
            test: {
              selector,
            },
          },
        }).then((scrapedData) => scrapedData.data.test.text)
      ).toBe(output);
    });
  });
});
