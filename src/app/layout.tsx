import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "포토이스크",
  description: "AI 인생네컷",
};

export const viewport: Metadata = {
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <main className="flex justify-center items-center w-full bg-gray-50 overflow-clip"> */}
        {/* <div className="flex flex-col justify-start items-center w-full sm:w-[500px] overflow-y-scroll scrollbar-hide bg-white font-PretendardBold"> */}
        <Suspense>
          <div className="flex flex-col justify-start items-center w-screen h-screen bg-white font-IBMPlexSansKRSemiBold select-none">
            {children}
          </div>
        </Suspense>
        {/* </div> */}
        {/* </main> */}
      </body>
    </html>
  );
}
