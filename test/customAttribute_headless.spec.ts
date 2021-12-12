// import puppeteer from "puppeteer";
import { chromium } from "playwright-chromium";
import { quickScraperHeadless } from "../src";

const testsArray: {
  attr: {
    name: string;
  };
  output: string;
  selector: string;
  text: false;
  url: string;
}[] = [
  {
    selector: ".nav-wide-wrapper",
    output: "Page navigation",
    text: false,
    attr: {
      name: "aria-label",
    },
    url: "https://doc.rust-lang.org/book/title-page.html",
  },
  {
    selector: "#reverseSinglyLinkedList",
    output: "reverseSinglyLinkedList",
    text: false,
    attr: {
      name: "id",
    },
    url: "https://thatjsdude.com/interview/linkedList.html",
  },
  {
    selector: "#gfg-footer",
    url: "https://www.geeksforgeeks.org/top-20-linked-list-interview-question/",
    text: false,
    attr: {
      name: "id",
    },
    output: "gfg-footer",
  },
];

jest.setTimeout(25_000);

describe("Test for PTWXZ - TEXT SELECTION - HEADLESS", () => {
  testsArray.forEach(({ output, selector, text, url, attr }, index) => {
    const { name } = attr;

    test(`#${index + 1}: Testing ${url}`, async () => {
      const browser = await chromium.launch({ headless: true });
      const page = await browser.newPage();

      await expect(
        quickScraperHeadless({
          url,
          options: {
            test: {
              selector,
              text,
              customAttributes: {
                [name]: true,
              },
            },
          },
          page,
        }).then((scrapedData) => scrapedData.data.test.customAttributes![name])
      ).resolves.toBe(output);

      await browser.close();
    });
  });
});
