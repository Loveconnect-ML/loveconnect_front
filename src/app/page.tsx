"use client";
import { Loading } from "@/components/Loading";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Instagram, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";
import WaveBackground from "@/components/WaveBackground";
import NavBar from "@/components/NavBar";
import useVh from "@/hooks/useVh";
import { useRouter } from "next/navigation";
import MainCard from "@/components/MainCard";

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
            <NavBar>
              <Logo />
              <p className="font-TTHakgyoansimUndongjangL bg-gradient-to-r from-red-600 to-indigo-400 inline-block text-transparent bg-clip-text">
                PHOTOisk
              </p>
              <Button className="ml-auto" variant="ghost">
                <Link
                  href={"https://www.instagram.com/sscc_ssu"}
                  about="_blank"
                >
                  <Instagram size={24} />
                </Link>
              </Button>
              <Button variant="ghost">
                <LinkIcon size={24} />
              </Button>
            </NavBar>
            <MainCard />
          </div>
        </>
      )}
    </div>
  );
}
