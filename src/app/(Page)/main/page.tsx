"use client";
import CircleLoading from "@/components/v2/loadings/CircleLoading";
import Logo from "@/components/v3/pages/main/Logo";
import { Menu, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

type Props = {};

function MainPage({ }: Props) {

  const [story, setStory] = useState<string>("");
  const [webtoonUrls, setWebtoonUrls] = useState<string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [cutsDescriptions, setCutsDescriptions] = useState<string[] | null>(null);

  const onChange = (e: any) => {
    setStory(e.target.value);
  }

  const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (story.length === 0) {
      toast.error("스토리를 입력해주세요");
      return;
    }

    if (story.length > 500) {
      toast.error("스토리는 500자 이내로 입력해주세요");
      return
    }

    await generateWebtoon();
  }

  const generateWebtoon = async () => {

    // API로 웹툰 생성
    setLoading(true);

    try {
      const res = await fetch("/api/v2/ai/webtoon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: story,
        }),
      });

      const data = await res.json();
      setWebtoonUrls(data.urls);
      setCutsDescriptions(data.descriptions);

      fetch("/api/v3/episode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          urls: data.urls,
          descriptions: data.descriptions,
        }),
      }).then((res) => {
        toast.success("웹툰이 저장되었습니다!");
      }).catch((error) => {
        toast.error("웹툰 저장에 실패했습니다");
      });

      setLoading(false);
    } catch (error) {
      toast.error("웹툰 생성 중 오류가 발생했습니다. 다시 시도해주세요!");
      setLoading(false);
    }
  }

  const onMyPage = () => {
    // toast("마이페이지 기능은 준비 중입니다", {
    //   icon: "🚧",
    // });
    window.location.pathname = "/my";

  }

  const onMenu = () => {
    toast("메뉴 기능은 준비 중입니다", {
      icon: "🚧",
    });
  }

  return (
    <div className="z-10 flex flex-col flex-1 justify-start items-center w-full bg-white">

      {/* Top Navbar */}
      <div className="flex w-full p-4 shadow-md">
        <button onClick={onMenu} className="mr-auto">
          <Menu size={32} />
        </button>
        <Link href="/">
          <Logo />
        </Link>
        <button onClick={onMyPage} className="ml-auto">
          <User size={32} />
        </button>
      </div>

      {/* Main Contents */}
      <div className="flex flex-col z-10 items-center w-full gap-4 p-6 ">
        <h1 className="text-2xl font-PretendardBold">AI로 웹툰을 만들어볼까요?</h1>
        <textarea
          value={story}
          onChange={onChange}
          placeholder={`스토리라인을 자세히 입력해주세요.\n\n예시: 이세계에 살았던 내가 현대 한국으로 오게 되었다...`}
          className="text-sm mx-auto w-full h-64 break-keep p-4 border-2 font-PretendardRegular border-gray-300 rounded-md resize-none"
        ></textarea>

        {/* Limit */}
        <p
          className="w-full text-sm text-end font-PretendardRegular text-gray-500"
          style={{ color: story.length > 500 ? "red" : "gray" }}
        >
          {story.length}/500자
        </p>

        {/* Submit Button */}
        <button
          disabled={loading}
          onClick={onClick}
          className="font-PretendardBold w-full disabled:opacity-30 text-white bg-gray-800 hover:bg-gray-900 top-80 p-3 rounded-full"
        >
          웹툰 생성하기
        </button>

        {/* Loading */}
        {loading &&
          <div className="mt-4 flex flex-col justify-center items-center gap-3 font-PretendardRegular">
            <CircleLoading />
            <p>웹툰 생성 중...</p>
          </div>
        }

        {/* Webtoon Images */}
        {webtoonUrls && !loading && webtoonUrls.map((url, idx) => (
          <div className="flex flex-col items-center" key={idx}>
            <Image key={idx} src={url} alt="Webtoon" width={324} height={648} />
            <p className="text-sm font-PretendardRegular">{cutsDescriptions && cutsDescriptions[idx]}</p>
          </div>
        ))}

      </div>

    </div>
  );
}

export default MainPage;
