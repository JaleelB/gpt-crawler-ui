import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="w-screen h-20 flex justify-center items-center px-4 md:px-6 self-end text-muted-foreground">
      Another web ui crafted by{" "}
      <div className="w-[30px] h-[30px] bg-zinc-50 rounded-full mx-2" />
      <Link href="#" className="hover:underline font-normal">
        Jaleel
      </Link>
    </footer>
  );
}
