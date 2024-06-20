"use client"
import { Loading } from '@/components/Loading'
import Button from '@/components/v2/buttons/Button'
import WaveBackground from '@/components/WaveBackground'
import WebcamComponent from '@/components/WebcamComponent'
import WebcamProvider, { useWebcamContext } from '@/components/WebcamProvider'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'

type Props = {}

function Feedback({ }: Props) {

  const router = useRouter();

  const { setPoseUrl } = useWebcamContext();

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
      <WebcamComponent />
      <WaveBackground />
      <div className="relative flex flex-col gap-8 justify-center items-center w-full h-full sm:w-[500px] bg-white py-16">
        <h1 className="text-xl font-PretendardBold text-center">이미지를 생성하여 포즈를 취해보세요!</h1>
        <textarea
          value={poseDescription}
          onChange={(e) => setPoseDescription(e.target.value)}
          placeholder="포즈를 묘사해주세요"
          className="w-[90%] h-32 p-4 border-2 font-PretendardRegular border-gray-300 rounded-md resize-none"
        ></textarea>
        {loading ? (
          <Loading />
        ) : null}
        <div className='flex justify-center items-center bg-white h-full pb-16'>
          <Button
            className="font-PretendardSemiBold bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md"
            size='lg'
            disabled={loading}
            onClick={onClickToGeneratePose}
            label='포즈 생성하기'
          />
        </div>
      </div>
    </>
  )
}

export default Feedback