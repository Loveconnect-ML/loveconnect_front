"use client"
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Camera } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {};
const terms =
  "본 프로그램 이용중 발생하는 이미지 파일이\n 추후 프로그램 성능개선에 활용될 수 있다는 사실을 인지하였으며\n 이에 동의합니다.";

function MainCard({}: Props) {
    
  const router = useRouter();

  const onClickToMain = () => {
    router.push("/main");
  };

  return (
    <div className="my-auto h-full flex justify-center items-center space-x-8">
      <div
      // bg-white 
        className={`flex flex-col justify-center w-full sm:w-3/4 h-3/4 gap-4 text-center rounded-lg drop-shadow-2xl bg-no-repeat`}
      >
        <h1 className="text-3xl sm:text-6xl mt-auto font-TTHakgyoansimUndongjangL bg-gradient-to-r from-red-600 to-indigo-400 inline-block text-transparent bg-clip-text">
          PHOTOisk
        </h1>
        <p className="text:md sm:text-2xl bg-gradient-to-r from-red-600 to-indigo-400 inline-block text-transparent bg-clip-text">
          AI로 남기는 여러분의 소중한 인생샷
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="text-lg sm:text-3xl mt-auto mb-12 w-fit self-center p-6 sm:p-8 space-x-2 rounded-full"
              variant="default"
            >
              <div>나만의 AI사진 찍기!</div>
              <Camera size={32} />
            </Button>
          </DialogTrigger>
          <DialogContent className="font-PretendardRegular sm:max-w-md">
            <DialogHeader>
              <DialogTitle>약관 및 동의</DialogTitle>
              <DialogDescription>
                본 프로그램의 약관을 꼼꼼이 읽어주세요
              </DialogDescription>
            </DialogHeader>
            <div className="text-start font-PretendardBold text-md break-keep leading-7">
              {terms.split("\n").map((term, index) => (
                <span key={index}>{term}</span>
              ))}
            </div>
            <DialogFooter>
              <DialogClose className="mr-auto">닫기</DialogClose>
              <DialogClose
                onClick={onClickToMain}
                className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md"
              >
                동의 후 다음으로
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default MainCard;
