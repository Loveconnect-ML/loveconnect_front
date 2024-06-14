"use client";
import React, { useState } from "react";
import { useWebcamContext } from "../WebcamProvider";
import { Button } from "../ui/button";
import Photos from "../Photos";
import WaveBackground from "../WaveBackground";
import { Loading } from "../Loading";
import { useQRCode } from "next-qrcode";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LinkIcon } from "lucide-react";
import { toast } from "react-hot-toast";

type Props = {};
// 밝은 조명에서 하면 더 잘 나옴, 정면 얼굴이 가장 잘 나옴
function PhotoiskPage({ }: Props) {
  const { Canvas } = useQRCode();

  const router = useRouter();

  const { imageUrls } = useWebcamContext();
  const [response, setResponse] = useState<any | null>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);

  const [responseIdx, setResponseIdx] = useState(0);

  const [clickedCount, setClickedCount] = useState(0);
  const [popup, setPopup] = useState(false);

  const onClickToRegenerateImage = async (e: any) => {
    e.preventDefault();

    setPopup(true);
  }

  const onClickToRetouchImage = async (e: any) => {
    e.preventDefault();

    // if (clickedCount >= 1) {
    //   setPopup(true);
    //   return;
    // }

    if (selectedImages.length === 0) {
      alert("이미지를 선택해주세요");
      return;
    }

    if (clicked) {
      alert("이미지 생성 중입니다...");
      return;
    }

    setClicked(true);
    setLoading(true);
    for (const image of selectedImages) {
      const res = await fetch("/api/sticker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: image,
        }),
      });

      try {
        const data = await res.json();
        setResponse((prev: any) => [...prev, data]);
      } catch (e) {
        toast.error("이미지 생성에 실패했습니다. 새로고침 후 다시 시도해주세요.");
        window.location.reload();
      }
    }
    setClickedCount((prev) => prev + 1);
    setLoading(false);
    setClicked(false);
  };


  const copyUrl = () => {
    navigator.clipboard.writeText(`https://photoisk.com/output?image=${response?.[responseIdx]}`)
    toast.success("공유링크가 복사되었습니다")
  }

  return (
    <>
      <WaveBackground />
      <div className="relative w-full sm:w-[500px] bg-white">
        <div className="h-full pb-[20%]">
          <Photos
            selections={selectedImages}
            setSelections={setSelectedImages}
            imageUrls={imageUrls}
          />

          {loading ? (
            <div className="w-full gap-16 flex flex-col items-center justify-center">
              <Loading />
              <p>최대 3분이 걸릴 수 있습니다...</p>
            </div>
          ) : (
            <Photos
              download={true}
              imageUrls={response?.map((res: any) => res) || null}
              setResponseIdx={setResponseIdx}
            />
          )}
          {response && response.length > 0 && (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="bg-primary hover:text-white text-primary-foreground hover:bg-primary/90 absolute right-8 bottom-4 w-[40%] sm:w-[200px]"
                  variant="outline"
                  disabled={loading || clicked || response.length === 0}
                >
                  공유
                </Button>
              </DialogTrigger>
              <DialogContent className="font-PretendardBold sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>인스타로 공유하기</DialogTitle>
                </DialogHeader>
                <div className="flex justify-center items-center space-x-2">
                  <Canvas
                    text={`https://photoisk.com/output?image=${response?.[responseIdx]}`}
                    options={{
                      errorCorrectionLevel: "M",
                      margin: 3,
                      scale: 4,
                      width: 200,
                    }}
                  />
                </div>
                <DialogFooter className="flex gap-3 items-center justify-center">
                  <DialogClose
                    onClick={() => router.replace("/")}
                    className="font-PretendardMedium bg-primary text-primary-foreground hover:bg-primary/90 h-10 w-[90%] mx-auto rounded-md"
                  >
                    끝내기
                  </DialogClose>
                  <Button variant="ghost" onClick={copyUrl}>
                    <LinkIcon size={24} />
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
        {popup && (
          <Dialog open={popup} onOpenChange={setPopup}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>유료 서비스</DialogTitle>
              </DialogHeader>
              <div className="text-start font-PretendardMedium text-md break-keep leading-7">
                더 많은 이미지를 생성하시려면 결제가 필요합니다.
              </div>
              <DialogFooter>
                <DialogClose
                  onClick={() => setPopup(false)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 w-full rounded-md"
                >
                  <Link href={"/pay"} target="_blank">
                    결제하기
                  </Link>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
        {response && response.length > 0 ? <Button
          disabled={clicked}
          onClick={onClickToRegenerateImage}
          className="absolute left-8 bottom-4 w-[40%] sm:w-[200px] bg-white text-black hover:bg-primary hover:text-white border-2 border-primary"
        >
          이미지 재생성
        </Button> : (
          <Button
            disabled={clicked}
            onClick={onClickToRetouchImage}
            className="absolute left-1/2 -translate-x-1/2 bottom-4 w-[90%] sm:w-[432px]"
          >
            이미지 생성
          </Button>
        )}
      </div>
    </>
  );
}

export default PhotoiskPage;
