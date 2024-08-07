"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email(),
  subject: z.string().min(2, {
    message: "Subject must be at least 2 characters.",
  }),
  message: z.string().min(2, {
    message: "Message must be at least 2 characters.",
  }),
});

export default function ContactMe() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, subject, message } = values;
    setIsLoading(true);

    await fetch("/api/send-email", {
      method: "POST",
      body: JSON.stringify({ email, subject, message }),
    })
      .then((response) => {
        if (response.ok) {
          toast({
            title: "Message sent!",
            description: "I'll get back to you soon.",
          });
          form.reset();
        } else {
          toast({
            title: "Error sending message",
            description: "Please try again later.",
          });
        }
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        toast({
          title: "Error sending message",
          description: "Please try again later.",
        });
      });

    setIsLoading(false);
    form.reset();
  }

  return (
    <div className="h-full w-full bg-slate-900 px-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex h-full flex-col"
        >
          <div className="flex h-12 items-center border-b p-2">
            <FormLabel className="w-20">To:</FormLabel>
            <p className="text-slate-400">malin@malingrafton.com</p>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex items-center border-b p-2">
                <FormLabel className="w-20">Email:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your email"
                    className="m-0 border-none bg-transparent focus-visible:ring-0 active:ring-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem className="flex items-center border-b p-2">
                <FormLabel className="w-20">Subject:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your subject"
                    className="m-0 border-none bg-transparent focus-visible:ring-0 active:ring-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-grow flex-col">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex flex-grow flex-col items-center p-2">
                  <FormControl className="flex-grow">
                    <Textarea
                      placeholder="Your message"
                      className="m-0 h-full border-none bg-transparent focus-visible:ring-0 active:ring-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mb-5 text-black"
              variant="outline"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
