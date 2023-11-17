"use client";
import CopyButton from "@/components/copy-button";
import CrawlerForm from "@/components/crawler-form";
import { useState } from "react";

export default function CrawlerHome() {
  const [data, setData] = useState(null);

  return (
    <main className="px-4 container max-w-7xl flex flex-col flex-grow">
      <section className="flex max-w-[980px] flex-col items-start gap-2 px-4 md:px-8 pt-8 md:pt-12 pb-8">
        <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
          GPT Crawler
        </h2>
        <p className="text-muted-foreground">
          Customize and start a web crawler to generate knowledge files for your
          custom GPT models.
        </p>
      </section>
      <section className="flex flex-col lg:flex-row justify-between gap-8 md:gap-16 px-4 md:px-8 pt-8 md:pt-12 pb-16 md:pb-24">
        <div className="w-full lg:w-2/5 rounded-sm">
          <CrawlerForm resultsHandler={setData} />
        </div>
        <div className="mt-16 lg:mt-0 w-full lg:w-3/5 rounded-xl border bg-card text-card-foreground shadow p-4">
          <pre className="min-h-[450px] overflow-y-auto relative w-full h-full">
            {data !== null && (
              <CopyButton
                value={JSON.stringify(data, null, 2)}
                copyable={true}
              />
            )}
            <code className="whitespace-pre-wrap">
              {data !== null && JSON.stringify(data, null, 2)}
            </code>
          </pre>
        </div>
      </section>
    </main>
  );
}
