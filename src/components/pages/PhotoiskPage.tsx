"use client";
import React, { useState } from "react";
import { useWebcamContext } from "../WebcamProvider";
import { Button } from "../ui/button";
import Photos from "../Photos";
import WaveBackground from "../WaveBackground";
import { useQRCode } from "next-qrcode";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowBigDown, FilterIcon, LinkIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import KakaoAdFit from "../KakaoAdFit";
import CircleLoading from "../v2/loadings/CircleLoading";

type Props = {};
// 밝은 조명에서 하면 더 잘 나옴, 정면 얼굴이 가장 잘 나옴
function PhotoiskPage({ }: Props) {
  const { Canvas } = useQRCode();

  const router = useRouter();

  const { imageUrls, filter, setFilter, isUserMode } = useWebcamContext();
  const [response, setResponse] = useState<any | null>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [additionalDecoPrompt, setAdditionalDecoPrompt] = useState<string>("");

  const [responseIdx, setResponseIdx] = useState(0);

  const [clickedCount, setClickedCount] = useState(0);
  const [popup, setPopup] = useState(false);

  const onClickToRegenerateImage = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/v2/payLimit", {
      method: "GET",
    });

    const data = await res.json();

    if (!data.available) {
      setPopup(true);
      toast("이미지 생성 횟수를 초과하였습니다. 결제 후 이용해주세요.", {
        icon: "🔒",
      });
      return;
    }

    setClicked(true);
    setLoading(true);
    await generateImage();
    setClickedCount((prev) => prev + 1);
    setLoading(false);
    setClicked(false);
  };

  const onClickToRetouchImage = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/v2/payLimit", {
      method: "GET",
    });

    const data = await res.json();

    if (!data.available) {
      setPopup(true);
      toast("이미지 생성 횟수를 초과하였습니다. 결제 후 이용해주세요.", {
        icon: "🔒",
      });
      return;
    }

    if (selectedImages.length === 0) {
      toast.error("이미지를 선택해주세요");
      return;
    }

    if (clicked) {
      toast.error("이미지 생성 중입니다...");
      return;
    }
    setClicked(true);
    setLoading(true);
    await generateImage();
    setClickedCount((prev) => prev + 1);
    setLoading(false);
    setClicked(false);
  };

  const generateImage = async () => {
    for (const image of selectedImages) {
      const res = await fetch("/api/sticker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:
          additionalDecoPrompt === ""
            ? JSON.stringify({
              image: image,
            })
            : JSON.stringify({
              image: image,
              prompt: additionalDecoPrompt,
            }),
      });

      try {
        const data = await res.json();
        setResponse((prev: any) => [...prev, data]);
      } catch (e) {
        toast.error(
          "이미지 생성에 실패했습니다. 새로고침 후 다시 시도해주세요."
        );
        window.location.reload();
      }
    }
  };

  const handleAdditionalDecoPrompt = (e: any) => {
    setAdditionalDecoPrompt(e.target.value);
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(
      `https://photoisk.com/output?image=${response?.[responseIdx]}`
    );
    toast.success("공유링크가 복사되었습니다");
  };

  return (
    <>
      <WaveBackground />
      <div className="relative w-full h-full sm:w-[500px] bg-indigo-200 pb-16">
        <div className="w-full flex justify-center my-4">
          <KakaoAdFit />
        </div>
        <div className="flex flex-col pb-16 rounded-t-3xl bg-white shadow-[0px_-0.5px_gray]">
          <div className="text-start ml-[5%] text-md sm:text-xl font-PretendardBold pt-8 text-indigo-600">
            AI 사진 변환
          </div>
          <div className="text-start ml-[5%] text-sm sm:text-md font-PretendardRegular pt-1 pb-4">
            사진 촬영 후 AI로 변환할 이미지를 선택해주세요!
          </div>
          <textarea
            value={additionalDecoPrompt}
            onChange={handleAdditionalDecoPrompt}
            placeholder="꾸미고 싶은 요소를 추가해보세요"
            className="mx-auto w-[90%] h-32 p-4 border-2 font-PretendardRegular border-gray-300 rounded-md resize-none"
          ></textarea>
          <Photos
            isUserMode={isUserMode}
            download={false}
            selections={selectedImages}
            setSelections={setSelectedImages}
            imageUrls={imageUrls}
            filter={filter}
          />
          <button className="absolute w-fit border-white border-4 z-30 top-80 right-8 p-2 bg-gray-800 rounded-full"
            onClick={() => setFilter((prev: boolean) => !prev)}
          >
            {filter ? <FilterIcon size={16} color="red" /> : <FilterIcon size={16} color="white" />}
          </button>

          {selectedImages?.length > 0 && response?.length == 0 && (
            <div className="text-center text-md sm:text-xl font-PretendardMedium pt-8 flex flex-col items-center justify-center">
              <div>페이지 끝에 있는 이미지 생성 버튼을 눌러주세요!</div>
              <motion.div
                animate={{ y: [0, 2.5, 0, -2.5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-center text-md sm:text-xl font-PretendardBold py-4"
              >
                <ArrowBigDown size={32} />
              </motion.div>
            </div>
          )}

          <Photos
            download={true}
            imageUrls={
              response?.map((res: any) => {
                return `https://${process.env.NEXT_PUBLIC_STORAGE_DOMAIN}/${res}`;
              }) || null
            }
            filter={filter}
            setResponseIdx={setResponseIdx}
            type="sticker"
          />
          {loading && (
            <div className="w-full gap-8 flex flex-col items-center justify-center">
              <CircleLoading />
              <p>최대 3분이 걸릴 수 있습니다...</p>
            </div>
          )}
          <div className="relative bg-transparent pt-20">
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
            {response && response.length > 0 ? (
              <Button
                disabled={clicked}
                onClick={onClickToRegenerateImage}
                className="absolute left-8 bottom-4 w-[40%] sm:w-[200px] bg-white text-black hover:bg-primary hover:text-white border-2 border-primary"
              >
                이미지 재생성
              </Button>
            ) : (
              <Button
                disabled={clicked}
                onClick={onClickToRetouchImage}
                className="absolute left-1/2 -translate-x-1/2 bottom-4 w-[90%] sm:w-[432px]"
              >
                이미지 생성
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PhotoiskPage;
