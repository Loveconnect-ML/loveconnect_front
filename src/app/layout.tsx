import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import localFont from 'next/font/local';
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { Toaster } from 'react-hot-toast';
import { clsx } from "clsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "포토이스크",
  description: "AI 인생네컷",
};

export const viewport: Metadata = {
  viewport: "width=device-width, initial-scale=1",
};

const pretendardBold = localFont({
  src: '../../public/Pretendard-Bold.otf',
  variable: '--font-bold',
})

const pretendardMedium = localFont({
  src: '../../public/Pretendard-Medium.otf',
  variable: '--font-medium',
})

const pretendardRegular = localFont({
  src: '../../public/Pretendard-Regular.otf',
  variable: '--font-regular',
})

const ibmPlexSansKRSemiBold = localFont({
  src: '../../public/IBMPlexSansKR-SemiBold.otf',
  variable: '--font-IBMPlexSansKRSemiBold',
})

const ibmPlexSansKRMedium = localFont({
  src: '../../public/IBMPlexSansKR-Medium.otf',
  variable: '--font-IBMPlexSansKRMedium',
})

const ibmPlexSansKRBold = localFont({
  src: '../../public/IBMPlexSansKR-Bold.otf',
  variable: '--font-IBMPlexSansKRBold',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        {/*<Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9708481151156136"
        crossOrigin="anonymous"></Script>*/}
        <body className={clsx(pretendardBold.variable, pretendardMedium.variable, pretendardRegular.variable, inter.className, ibmPlexSansKRSemiBold.variable, ibmPlexSansKRMedium.variable, ibmPlexSansKRBold.variable)}>
          <Toaster />
          {/* <main className="flex justify-center items-center w-full bg-gray-50 overflow-clip"> */}
          {/* <div className="flex flex-col justify-start items-center w-full sm:w-[500px] overflow-y-scroll scrollbar-hide bg-white font-PretendardBold"> */}
          {/* <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn> */}
          <Suspense>
            <div className="flex flex-col justify-start items-center w-screen h-screen bg-white font-IBMPlexSansKRSemiBold select-none">
              {children}
            </div>
          </Suspense>
          {/* </div> */}
          {/* </main> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
