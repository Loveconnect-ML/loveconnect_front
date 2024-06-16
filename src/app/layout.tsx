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
import { koKR } from "@clerk/localizations";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Photoisk: AI로 남기는 여러분의 소중한 인생샷",
  description: "AI로 다양한 사진을 찍고 공유해보세요!",
  keywords: ["Photoisk", "사진", "인생샷", "AI", "인공지능", "사진공유", "사진찍기"],
  robots: 'index, follow',
  openGraph: {
    siteName: "Photoisk",
    locale: 'ko_KR',
    title: 'Photoisk, AI로 남기는 여러분의 소중한 인생샷',
    description: 'AI로 다양한 사진을 찍고 공유해보세요!',
    type: 'website',
    url: 'https://photoisk.com',
    images: [
      {
        url: '/Logo.png',
        alt: 'Photoisk',
        type: 'image/png',
        width: '500',
        height: '500',
      }
    ]
  },
  icons: {
    icon: "/Logo.png",
  },
  metadataBase: new URL("https://photoisk.com"),
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
    <ClerkProvider localization={koKR}>
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
