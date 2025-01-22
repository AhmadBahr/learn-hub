import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})
export const metadata: Metadata = {
  title: "Learn Hub",
  description: "Learn Hub is a platform for learning and sharing knowledge.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.className} `}>
        <Providers>
          <div className="root-layout">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
