import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "./ui/use-toast";
import { useFormStatus } from "react-dom";
import { Icons } from "./icons";
import { Dispatch, SetStateAction, useRef } from "react";

const FormSchema = z.object({
  url: z.string().url({ message: "Invalid URL format." }),
  match: z.string().min(1, { message: "Match pattern is required." }),
  selector: z.string().min(1, { message: "Selector is required." }),
  maxPagesToCrawl: z
    .string()
    .transform((value) => parseInt(value, 10))
    .refine((value) => !isNaN(value) && value > 0, {
      message: "Must crawl at least one page.",
    }),
  // maxPagesToCrawl: z
  //   .number()
  //   .min(1, { message: "Must crawl at least one page." }),
  cookie: z
    .object({
      name: z.string().optional(),
      value: z.string().optional(),
    })
    .refine(
      (data) => {
        // If one is provided, both become required
        if (data.name && !data.value) {
          return false; // Invalid if name is provided but value is not
        }
        if (data.value && !data.name) {
          return false; // Invalid if value is provided but name is not
        }
        return true; // Valid if both or neither are provided
      },
      {
        message: "Both cookie name and value are required if one is provided.",
      }
    )
    .optional(),
});

export default function CrawlerForm({
  resultsHandler,
}: {
  resultsHandler: Dispatch<SetStateAction<any>>;
}) {
  const { pending } = useFormStatus();
  const ref = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: "",
      match: "",
      selector: "",
      maxPagesToCrawl: 10,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // const response = await fetch("/api/crawl", {
    //   method: "POST",
    //   body: JSON.stringify(formData),
    // }).then((res) => res.json());

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NODE_SERVER_URL}/crawl`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());

    // const result = await crawlAction(formData);

    if (response.success) {
      toast({
        title: "Crawler Config Submitted",
        description: "Your crawler config was submitted successfully.",
      });
    } else {
      toast({
        title: response.error,
        variant: "destructive",
        description: "Your crawler config failed to submit.",
      });
    }

    resultsHandler(response.data.data);
    ref.current?.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-2">
                Start URL
                <span className="text-red-500">&#42;</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="https://example.com"
                  type="url"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter the URL where the crawler should start.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="match"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-2">
                Match Pattern
                <span className="text-red-500">&#42;</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/**" {...field} />
              </FormControl>
              <FormDescription>
                Specify a pattern for URLs to be crawled.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="selector"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-2">
                Selector
                <span className="text-red-500">&#42;</span>
              </FormLabel>
              <FormControl>
                <Input placeholder=".content" {...field} />
              </FormControl>
              <FormDescription>
                CSS selector to extract content from the page.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maxPagesToCrawl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-2">
                Max Pages to Crawl
                <span className="text-red-500">&#42;</span>
              </FormLabel>
              <FormControl>
                <Input type="number" max={10} min={1} {...field} />
              </FormControl>
              <FormDescription>
                Limit the number of pages the crawler will visit.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <FormLabel>Cookie</FormLabel>
          <FormDescription className="pt-1 pb-4">
            Add a cookie to be sent with the request.
          </FormDescription>
          <div className="w-full flex space-x-2">
            <FormField
              name={`cookie.name`}
              render={({ field }) => (
                <FormItem className="min-w-[100px] w-full">
                  <FormControl>
                    <Input placeholder="Cookie name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name={`cookie.value`}
              render={({ field }) => (
                <FormItem className="min-w-[100px] w-full">
                  <FormControl>
                    <Input placeholder="Cookie value" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button
          type="submit"
          className="w-full rounded-md"
          aria-disabled={pending}
          disabled={pending}
        >
          {pending && <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />}
          Submit
        </Button>
      </form>
    </Form>
  );
}
