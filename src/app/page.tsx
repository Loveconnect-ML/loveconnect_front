"use client";
import { Loading } from "@/components/Loading";
import { useLayoutEffect, useState } from "react";
import WaveBackground from "@/components/WaveBackground";
import useVh from "@/hooks/useVh";
import { useRouter } from "next/navigation";
import MainCard from "@/components/MainCard";
import TopNavbar from "@/components/v2/nav/TopNavbar";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  
  const router = useRouter();

  useLayoutEffect(() => {
    router.prefetch("/main");
  }, []);
  
  return (
    <div className="w-full h-full py-6 px-10">
      <WaveBackground />
      <div className="flex flex-col justify-evenly w-full h-full z-10">
        <TopNavbar />
        <MainCard />
      </div>
    </div>
  );
}
