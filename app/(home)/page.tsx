"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <main className="px-4 container flex flex-grow flex-col items-center justify-between p-24">
      <section className="z-10 max-w-4xl w-full space-y-6 md:space-y-10">
        <h1 className="text-4xl md:text-6xl lg:text-7xl md:leading-[4.35rem] lg:leading-[5rem] tracking-tight font-bold text-center font-gradient">
          Transform Web Content into Custom GPT Data
        </h1>
        <p className="mx-auto text-center max-w-2xl text-muted-foreground">
          Empower your AI with tailored datasets. WebCrawlUI-GPT simplifies the
          process of converting web pages into structured GPT-friendly data.
        </p>
        <form
          className="w-full mx-auto max-w-2xl flex items-center justify-center gap-3"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Link
            href="/crawl"
            className={buttonVariants({
              variant: "outline",
              className:
                "bg-white/5 border-2 px-6 py-6 text-white hover:border-white/10 rounded-full transition-all",
            })}
          >
            View Github
          </Link>
          <Button
            variant="default"
            type="submit"
            className={cn("px-6 py-6 w-fit")}
          >
            <Link href="/crawl">Start Crawling</Link>
          </Button>
        </form>
      </section>
      <section className="w-full max-w-5xl mt-10">
        <div className="w-full h-[520px] bg-zinc-50"></div>
      </section>
    </main>
  );
}
