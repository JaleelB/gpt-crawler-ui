import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { BrainCog } from "lucide-react";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 w-screen h-20 flex justify-between items-center px-4 md:px-6">
      <Link
        href="/"
        className="w-8 h-10 inline-flex items-center justify-center"
      >
        <BrainCog className="w-6 h-6" />
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
