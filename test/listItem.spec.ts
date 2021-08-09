import { quickScraper } from "../src";

describe("Test for PTWXZ - TEXT SELECTION", () => {
  test(`#${1}: Testing ${"https://www.ptwxz.com/html/11/11622/"}`, async () => {
    expect(
      await quickScraper({
        url: "https://www.ptwxz.com/html/11/11622/",
        options: {
          test: {
            selector: ".centent > ul> li",
            listItem: true,
          },
        },
      }).then((scrapedData) => scrapedData.data.test.lists?.length)
    ).toBeGreaterThan(100);
  });
});
