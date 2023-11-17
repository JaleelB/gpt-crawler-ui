"use client";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Icons } from "./icons";
import { useEffect, useRef } from "react";

export default function SiteHeader() {
  const ref = useRef<HTMLHeadElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 10) {
        ref.current?.classList.add(
          "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        );
      } else {
        ref.current?.classList.remove(
          "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        );
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      ref={ref}
      className="sticky top-0 w-screen h-20 flex justify-between items-center px-4 md:px-6"
    >
      <Link
        href="/"
        className="w-8 h-10 inline-flex items-center justify-center"
      >
        <Icons.logo className="w-6 h-6" />
      </Link>
      <nav>
        <Link
          href=""
          className={buttonVariants({
            variant: "default",
            className: "rounded-full py-5 ",
          })}
        >
          Get Started
        </Link>
      </nav>
    </header>
  );
}
