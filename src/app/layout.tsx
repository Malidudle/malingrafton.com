import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import ClientLoader from "@/components/client-loader";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Malin Grafton | Personal Website",
  description:
    "Hey, I'm Malin Grafton. This is my personal website. Click on the icons to see what I'm up to.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="fJgxWCbHyeIbia5gxNEou-TPT5z6HpFLS2NmtNLHHVA"
        />
      </head>
      <body className={inter.className}>
        <ClientLoader>
          <Navbar />
          {children}
          <Toaster />
        </ClientLoader>
      </body>
    </html>
  );
}
