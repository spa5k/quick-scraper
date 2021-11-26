import puppeteer from "puppeteer";
import { quickScraperHeadless } from "../src";

jest.setTimeout(25_000);

describe("Test for PTWXZ - TEXT SELECTION - HEADLESS", () => {
  test(`#${1}: Testing https://www.ptwxz.com/html/11/11622/`, async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await expect(
      quickScraperHeadless({
        url: "https://www.ptwxz.com/html/11/11622/",
        options: {
          test: {
            selector: ".centent > ul> li",
            listItem: true,
          },
        },
        page,
      }).then((scrapedData) => scrapedData.data.test.lists?.length)
    ).resolves.toBeGreaterThan(100);

    await browser.close();
  });
});
