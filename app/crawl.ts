"use server";
import { PlaywrightCrawler } from "crawlee";
import { Page } from "playwright";
import { z } from "zod";

/* 
    @see https://github.com/JaleelB/gpt-crawler/blob/main/config.ts 
    for the original config file
*/
type Config = {
  /** URL to start the crawl */
  url: string;
  /** Pattern to match against for links on a page to subsequently crawl */
  match: string;
  /** Selector to grab the inner text from */
  selector: string;
  /** Don't crawl more than this many pages */
  maxPagesToCrawl: number;
  /** Optional cookie to be set. E.g. for Cookie Consent */
  cookie?: { name?: string; value?: string };
};

export type CrawlResult = {
  title: string;
  url: string | undefined;
  html: string;
};

const requestSchema = z.object({
  url: z.string().url(),
  match: z.string(),
  selector: z.string(),
  maxPagesToCrawl: z.number().min(1),
  cookie: z
    .object({
      name: z.string().optional(),
      value: z.string().optional(),
    })
    .optional(),
});

async function getPageHtml(page: Page, selector: string) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel) as HTMLElement | null;
    return el?.innerText || "";
  }, selector);
}

export async function crawlAction(input: Config) {
  try {
    const validatedInput = requestSchema.parse(input);
    const { url, match, selector, maxPagesToCrawl, cookie } = validatedInput;
    const results: CrawlResult[] = [];

    const crawler = new PlaywrightCrawler({
      async requestHandler({ request, page, enqueueLinks, log, pushData }) {
        if (cookie && cookie.name && cookie.value) {
          const cookieConfig = {
            name: cookie.name,
            value: cookie.value,
            url: request.loadedUrl,
          };
          await page.context().addCookies([cookieConfig]);
        }

        const title = await page.title();
        log.info(`Crawling ${request.loadedUrl}...`);

        await page.waitForSelector(selector, { timeout: 1000 });
        const html = await getPageHtml(page, selector);

        results.push({ title, url: request.loadedUrl, html });
        await enqueueLinks({ globs: [match] });
      },
      maxRequestsPerCrawl: maxPagesToCrawl,
    });

    await crawler.run([url]);

    return { success: true, data: results };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation error",
        details: error.errors,
      };
    } else {
      return { success: false, error: "Internal Server Error" };
    }
  }
}
