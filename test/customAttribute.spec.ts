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
    selector: ".header-logo > img:nth-child(1)",
    output:
      "/uploads/thumbs/banner-75b2b7a774-e3b318a6dc29b96947534819abc91cd3.png",
    text: false,
    attr: {
      name: "src",
    },
    url: "https://novelfull.com/oh-my-god-earthlings-are-insane.html",
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
      expect(
        await quickScraper({
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
      ).toBe(output);
    });
  });
});
