import { quickScraper } from "../src";

const testsArray: {
  href: true;
  output: string;
  selector: string;
  text: false;
  url: string;
}[] = [
  {
    selector:
      "div.col-sm-6:nth-child(1) > ul:nth-child(1) > li:nth-child(1) > a:nth-child(2)",
    output:
      "https://novelfull.com/oh-my-god-earthlings-are-insane/chapter-1.html",
    text: false,
    href: true,
    url: "https://novelfull.com/oh-my-god-earthlings-are-insane.html",
  },
  {
    selector: ".header-logo",
    output: "https://novelfull.com/",
    text: false,
    href: true,
    url: "https://novelfull.com/oh-my-god-earthlings-are-insane.html",
  },
  {
    selector:
      "div.BorderGrid-row:nth-child(1) > div:nth-child(1) > div:nth-child(3) > span:nth-child(2) > a:nth-child(1)",
    url: "https://github.com/knaxus/problem-solving-javascript",
    text: false,
    href: true,
    output: "https://ashokdey.in",
  },
];

describe("Test for PTWXZ - TEXT SELECTION", () => {
  testsArray.forEach(({ output, selector, text, url, href }, index) => {
    test(`#${index + 1}: Testing ${url}`, async () => {
      expect(
        await quickScraper({
          url,
          options: {
            test: {
              selector,
              text,
              href,
            },
          },
        }).then((scrapedData) => scrapedData.data.test.href)
      ).toBe(output);
    });
  });
});
