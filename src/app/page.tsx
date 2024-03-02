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
  const [auth, setAuth] = useState(false);
  const [password, setPassword] = useState<string>("");

  useLayoutEffect(() => {
    router.prefetch("/main");

    if (localStorage.getItem("auth")) {
      handleAuth(localStorage.getItem("auth") as string);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const handleAuth = async (authKey: string) => {
    const res = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({ password: authKey }),
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("auth", authKey);
      setAuth(true);
    }
  };

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
          {auth ? (
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
          ) : (
            <div className="flex flex-col justify-center items-center w-full h-full bg-black bg-opacity-50 z-50">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="text"
                className="bg-white"
              />
              <button onClick={() => handleAuth(password)}>handleAuth</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
