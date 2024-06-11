"use client";
import { Loading } from "@/components/Loading";
import { useLayoutEffect, useState } from "react";
import WaveBackground from "@/components/WaveBackground";
import useVh from "@/hooks/useVh";
import { useRouter } from "next/navigation";
import MainCard from "@/components/MainCard";
import TopNavbar from "@/components/v2/nav/TopNavbar";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const isScreenLoaded = useVh();
  const router = useRouter();


  useLayoutEffect(() => {
    router.prefetch("/main");

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);


  if (loading) {
    return (
      <div className="w-full h-full py-6 px-10">
        <div className="flex items-center justify-center w-full h-full">
          <Loading />
        </div>
      </div>
    );
  }


  return (
    <div className="w-full h-full py-6 px-10">
      {loading && isScreenLoaded ? (
        <div className="flex items-center justify-center w-full h-full">
          <Loading />
        </div>
      ) : (
        <>
          <WaveBackground />
          <div className="flex flex-col justify-evenly w-full h-full z-10">
            <TopNavbar />
            <MainCard />
          </div>
        </>
      )}
    </div>
  );
}
