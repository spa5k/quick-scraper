import { quickScraper } from "../src";

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

describe("Test for PTWXZ - TEXT SELECTION", () => {
  testsArray.forEach(({ output, selector, text, url, attr }, index) => {
    const { name } = attr;

    test(`#${index + 1}: Testing ${url}`, async () => {
      await expect(
        quickScraper({
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
        }).then((scrapedData) => scrapedData.data.test.customAttributes![name])
      ).resolves.toBe(output);
    });
  });
});
