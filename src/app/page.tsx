"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRef, useState } from "react";

export default function Home() {
  const [imageFile, setImageFile] = useState<any>(null);
  const ref = useRef<HTMLInputElement>(null);
  const [response, setResponse] = useState<ImageResponse | null>(null);

  const onClickToGenerateImage = async () => {

    console.log(imageFile)

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        init_image: imageFile,
        positivePrompt: "A beautiful landscape",
        negativePrompt: "A landscape with a lot of pollution",
      }),
    })

    // console.log(res)
    
    const data = await res.json();
      
    // console.log(data)

    setResponse(data);
  };

  const onUploadImage = (e: any) => {
    const reader = new FileReader();
    const file = e.target.files?.[0];
    reader.readAsDataURL(file);
    reader.onload = (data) => {
      // console.log((data.currentTarget as any)?.result)
      // setImageFile((data.currentTarget as any)?.result);
      setImageFile(reader.result);
      console.log(reader.result)
    };
    // setImageFile(file);
    // console.log(file);
  };

  return (
    <main className="flex justify-center items-center w-screen h-screen bg-gray-50">
      <div className="flex flex-col justify-center items-center w-full sm:w-[500px] h-full bg-white">
        <input
          type="file"
          accept="image/*"
          onChange={onUploadImage}
          ref={ref}
        />
        <Image
          src={`data:image/png;base64,${response?.artifacts?.[0]?.base64}` ?? "/test.png"}
          alt="generated image"
          width={100}
          height={100}
        />
        <Button
          onClick={onClickToGenerateImage}
          className="fixed bottom-4 w-[90%] sm:w-[432px]"
        >
          이미지 생성
        </Button>
      </div>
    </main>
  );
}
