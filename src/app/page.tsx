"use client";
import { Loading } from "@/components/Loading";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Camera, Instagram, Link } from "lucide-react";
import { useLayoutEffect, useState } from "react";
import WaveBackground from "@/components/WaveBackground";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/navigation";

const terms =
  "본 프로그램 이용중 발생하는 이미지 파일이\n 추후 프로그램 성능개선에 활용될 수 있다는 사실을 인지하였으며\n 이에 동의합니다.";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useLayoutEffect(() => {
    router.prefetch("/main");
  }, []);

  const onClickToMain = () => {
    router.push("/main");
  };

  setTimeout(() => {
    setLoading(false);
  }, 1500);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <Loading />
        </div>
      ) : (
        <>
          <WaveBackground />
          <div className="flex flex-col justify-evenly w-full h-full z-10">
            <NavBar>
              <Logo />
              <p>Photoisk.</p>
              <Button className="ml-auto" variant="ghost">
                <Instagram size={32} />
              </Button>
              <Button variant="ghost">
                <Link size={32} />
              </Button>
            </NavBar>
            <div className="my-auto h-full flex justify-center items-center space-x-8]">
              <div
                className={`flex flex-col justify-center w-3/4 h-2/3 space-y-4 text-center rounded-lg drop-shadow-2xl bg-white bg-no-repeat`}
              >
                <h1 className="text-6xl font-bold">Photoisk</h1>
                <p className="text-2xl">AI로 남기는 여러분의 소중한 인생샷</p>
              </div>
              {/* <motion.div
                animate={{ x: [-50, 0], opacity: [0, 1] }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="w-64 h-64"
              >
                <Image
                  src={landing1}
                  alt="landing1"
                  className="w-full h-full rounded-[64px]"
                />
              </motion.div>
              <motion.div
                animate={{ x: [-50, 0], opacity: [0, 1] }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <ArrowRight size={64} />
              </motion.div>
              <motion.div
                animate={{ x: [-50, 0], opacity: [0, 1] }}
                transition={{ delay: 1.3, duration: 0.5 }}
                className="w-64 h-64"
              >
                <Image
                  src={landing2}
                  alt="landing2"
                  className="w-full h-full rounded-[64px]"
                />
              </motion.div> */}
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="text-3xl p-8 space-x-2 rounded-full"
                  variant="default"
                >
                  <div>나만의 AI사진 찍기!</div>
                  <Camera className="mb-1" size={40} />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>약관 및 동의</DialogTitle>
                  <DialogDescription>
                    본 프로그램의 약관을 꼼꼼이 읽어주세요
                  </DialogDescription>
                </DialogHeader>
                <div className="text-start text-md break-keep">
                  {terms.split("\n").map((term, index) => (
                    <span key={index}>{term}</span>
                  ))}
                </div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose>닫기</DialogClose>
                  <DialogClose
                    onClick={onClickToMain}
                    className="ml-auto bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md"
                  >
                    동의 후 다음으로
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </>
      )}
    </>
  );
}
