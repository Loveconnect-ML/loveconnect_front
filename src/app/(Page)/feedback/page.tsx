"use client"
import KakaoAdFit from '@/components/KakaoAdFit'
import { Loading } from '@/components/Loading'
import Photos from '@/components/Photos'
import { Button } from '@/components/ui/button'
import CircleLoading from '@/components/v2/loadings/CircleLoading'
import WaveBackground from '@/components/WaveBackground'
import WebcamComponent from '@/components/v2/cams/WebcamComponent'
import WebcamProvider, { useWebcamContext } from '@/components/WebcamProvider'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'

type Props = {}

function Feedback({ }: Props) {

  const { imageUrls, setPoseUrl, isUserMode } = useWebcamContext();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);


  const [, setImageUrl] = useState<string>("");
  const [poseDescription, setPoseDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onClickToGeneratePose = async (e: any) => {
    e.preventDefault();

    if (!poseDescription) {
      toast.error("원하는 포즈를 묘사해주세요.");
      return;
    }

    try {
      setLoading(true);
      const image = await fetch("/api/v2/ai/img", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: poseDescription
        }),
      })

      const data = await image.json();
      const url = data.url;

      setPoseUrl(url);
      setImageUrl(url);
      setLoading(false);
    } catch (error) {
      toast.error("포즈 생성 중 오류가 발생했습니다. 다시 시도해주세요.");
      setLoading(false);
      setPoseUrl("");
    }

  }

  return (
    <>
      <WebcamComponent mode='pose' />
      <WaveBackground />
      <div className="relative w-full h-full sm:w-[500px] bg-indigo-200 pb-16">
        <div className="w-full flex justify-center my-4">
          <KakaoAdFit />
        </div>
        <div className='flex flex-col gap-8 justify-center items-center'>
          <div className="pb-20 rounded-t-3xl shadow-[0px_-0.5px_gray] flex flex-col justify-center w-full h-full bg-white">
            <div className="text-start ml-[5%] text-md sm:text-xl font-PretendardBold pt-8 text-indigo-600">
              AI 포즈 생성
            </div>
            <div className="text-start ml-[5%] text-sm sm:text-md font-PretendardRegular pt-1 pb-4">
              원하는 포즈를 생성하여 사진을 찍어주세요!
            </div>
            <textarea
              value={poseDescription}
              onChange={(e) => setPoseDescription(e.target.value)}
              placeholder="포즈를 묘사해주세요"
              className="mx-auto w-[90%] h-32 p-4 border-2 font-PretendardRegular border-gray-300 rounded-md resize-none"
            ></textarea>
            <Photos
              isUserMode={isUserMode}
              selections={selectedImages}
              setSelections={setSelectedImages}
              imageUrls={imageUrls}
              download={true}
            />
            {loading && (
              <div className="w-full gap-8 flex flex-col items-center justify-center">
                <CircleLoading />
                <p>최대 3분이 걸릴 수 있습니다...</p>
              </div>
            )}
            <div className='relative flex justify-center items-center bg-white w-full pb-16'>
              <Button
                className="absolute left-1/2 -translate-x-1/2 bottom-4 w-[90%] sm:w-[432px]"
                disabled={loading}
                onClick={onClickToGeneratePose}
              >
                포즈 생성하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Feedback