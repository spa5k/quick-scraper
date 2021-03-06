import { quickScraper } from "../src";

const testsArray: {
  href: true;
  output: string;
  selector: string;
  text: false;
  url: string;
}[] = [
  {
    selector: ".url",
    output: "https://github.com/spa5k",
    text: false,
    href: true,
    url: "https://github.com/spa5k/fastify-slonik",
  },
  {
    selector: "#content > main:nth-child(1) > p:nth-child(3) > a:nth-child(3)",
    output: "https://doc.rust-lang.org/book/ch01-01-installation.html",
    text: false,
    href: true,
    url: "https://doc.rust-lang.org/book/title-page.html",
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
      await expect(
        quickScraper({
          url,
          options: {
            test: {
              selector,
              text,
              href,
            },
          },
        }).then((scrapedData) => scrapedData.data.test.href)
      ).resolves.toBe(output);
    });
  });
});
