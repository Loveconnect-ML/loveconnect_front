import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import { clsx } from "clsx";
import { koKR } from "@clerk/localizations";
import Script from "next/script";
import WebcamProvider from "@/components/WebcamProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  applicationName: "Photoisk",
  title: "Photoisk",
  formatDetection: {
    telephone: false,
  },
  manifest: "/manifest.json",
  description: "AI와 함께하는 사진 이상형 매칭",
  keywords: [
    "Photoisk",
    "사진",
    "인생샷",
    "AI",
    "인공지능",
    "사진공유",
    "사진찍기",
  ],
  robots: "index, follow",
  openGraph: {
    siteName: "Photoisk",
    locale: "ko_KR",
    title: "Photoisk, AI와 함께하는 사진 이상형 매칭",
    description: "AI로 다양한 사진을 찍고 공유해보세요!",
    type: "website",
    url: "https://photoisk.com",
    images: [
      {
        url: "/Logo192.png",
        alt: "Photoisk",
        type: "image/png",
        width: "500",
        height: "500",
      },
    ],
  },
  icons: {
    icon: "/Logo192.png",
  },
  metadataBase: new URL("https://photoisk.com"),
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  width: "device-width",
  height: "device-height",
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
  userScalable: false,
  colorScheme: "normal",
};

const pretendardBold = localFont({
  src: "../../public/Pretendard-Bold.otf",
  variable: "--font-bold",
});

const pretendardMedium = localFont({
  src: "../../public/Pretendard-Medium.otf",
  variable: "--font-medium",
});

const pretendardRegular = localFont({
  src: "../../public/Pretendard-Regular.otf",
  variable: "--font-regular",
});

const ibmPlexSansKRSemiBold = localFont({
  src: "../../public/IBMPlexSansKR-SemiBold.otf",
  variable: "--font-IBMPlexSansKRSemiBold",
});

const ibmPlexSansKRMedium = localFont({
  src: "../../public/IBMPlexSansKR-Medium.otf",
  variable: "--font-IBMPlexSansKRMedium",
});

const ibmPlexSansKRBold = localFont({
  src: "../../public/IBMPlexSansKR-Bold.otf",
  variable: "--font-IBMPlexSansKRBold",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ClerkProvider localization={koKR}>
        <html lang="en">
          <Script
            type="text/javascript"
            src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&libraries=services&autoload=false`}
          ></Script>
          <body
            className={clsx(
              pretendardBold.variable,
              pretendardMedium.variable,
              pretendardRegular.variable,
              inter.className,
              ibmPlexSansKRSemiBold.variable,
              ibmPlexSansKRMedium.variable,
              ibmPlexSansKRBold.variable
            )}
          >
            <Toaster />
            <Suspense>
              <WebcamProvider>
                <div className="flex flex-col bg-white items-center w-screen h-screen select-none">
                  {children}
                </div>
              </WebcamProvider>
            </Suspense>
          </body>
        </html>
      </ClerkProvider>
    </>
  );
}
