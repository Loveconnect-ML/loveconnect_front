"use client";
import KakaoMap from "@/components/KakaoMap";
import Logo from "@/components/Logo";
import MyPage from "@/components/v3/pages/main/MyPage";
import RecommendDrawer from "@/components/v3/pages/main/RecommendDrawer";
import { useGeo } from "@/hooks/useGeo";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type Props = {};

function MainPage({ }: Props) {

  const { error, location } = useGeo();

  const [places, setPlaces] = useState<{
    id: number;
    isHotplace: boolean | null;
    isAdvertisement: boolean | null;
    title: string;
    description: string;
    contentTypeId: number;
    contentId: number;
    x: number;
    y: number;
    url: string;
    overview: string;
  } | null>(null); // TourResponse[]
  const [diaryPage, setDiaryPage] = useState(false);

  const [position, setPosition] = useState({
    lat: location?.latitude,
    lng: location?.longitude
  });

  const [diaries, setDiaries] = useState<{
    id: number;
    title: string;
    content: string;
    imageSrc: string;
    result: string;
    location: string;
    placeForRecId: number;
    createdAt: string;
  }[]
  >([]);

  const [diary, setDiary] = useState<{
    title: string;
    content: string;
    image: string;
    result?: string;
  }>({
    title: "",
    content: "",
    image: "",
    result: "",
  });

  const [fetching, setFetching] = useState(false);
  const [loadingGPT, setLoadingGPT] = useState(false);

  useEffect(() => {
    fetchMyPage();
  }, []);

  const fetchPlaces = async () => {
    setFetching(true);

    async function init() {
      if (fetching) {
        toast("이미 요청 중입니다", {
          icon: "🔒",
        });
        return;
      }

      if (!position.lat || !position.lng) {
        toast("위치 정보를 가져올 수 없습니다. 지도 핀을 찍었는지 확인해주세요.", {
          icon: "🔒",
        });
        setFetching(false);
        return;
      }

      if (!location || error) {
        toast("위치 정보를 가져올 수 없습니다. 지도 핀을 찍었는지 확인해주세요.", {
          icon: "🔒",
        });
        setFetching(false);
        return;
      }

      const response = await fetch("/api/v2/tour", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          TYPE: "recommend",
          contentTypeId: 14,
          raidus: 200,
          mapX: position.lng,
          mapY: position.lat,
        }),
      });

      const { message } = await response.json();

      console.log(message);

      if (message?.length === 0) {
        setPlaces({
          id: 0,
          contentId: 0,
          contentTypeId: 0,
          description: "",
          isAdvertisement: false,
          isHotplace: true,
          overview: "오류가 발생하였습니다. 새로고침 후 다시 시도해주세요.",
          title: "오류",
          url: "",
          x: location?.longitude as number,
          y: location?.latitude as number,
        });
      } else {
        setPlaces(message);
      }
      setFetching(false);
    }

    init();
  };

  const toggleDiary = async () => {
    // toast("일기 작성 기능은 릴리즈 버전에서 사용 가능합니다", {
    //   icon: "🔒",
    // });
    if (loadingGPT) {
      toast("일기 생성 중입니다", {
        icon: "🔒",
      });
      return;
    }
    setDiaryPage((prev) => !prev);
  };

  const generateDiary = async () => {
    if (!diary.title || !diary.content || !diary.image) {
      toast("모든 항목을 입력해주세요", {
        icon: "🔒",
      });
      return;
    }

    setLoadingGPT(true);

    const response = await fetch("/api/v2/ai/diary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: diary.content,
        imgUrl: diary.image,
      }),
    });

    const { message } = await response.json();

    setDiary((prev) => ({
      ...prev,
      result: message,
    }));

    toast("일기가 생성되었습니다", {
      icon: "🔒",
    });

    setLoadingGPT(false);
  };

  const uploadDiary = async () => {
    if (!diary.title || !diary.content || !diary.image || !diary.result) {
      toast("모든 항목을 입력해주세요", {
        icon: "🔒",
      });
      return;
    }

    const response = await fetch("/api/v2/diary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: diary.title,
        content: diary.result,
        image: diary.image,
        result: diary.result,
        location: places?.title,
        placeForRecId: places?.id,
      }),
    });

    const { message } = await response.json();

    if (message === "success") {
      toast("일기가 업로드되었습니다", {
        icon: "🔒",
      });
    } else {
      toast("일기 업로드에 실패했습니다", {
        icon: "🔒",
      });
    }
    setDiaryPage(false);
  };

  const fetchMyPage = async () => {
    const response = await fetch("/api/v2/diary", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { message } = await response.json();

    setDiaries(message);
  }


  return (
    <main className="relative w-full h-full">
      <MyPage />
      <div className="z-20 absolute top-3 left-3">
        <Logo />
      </div>
      <KakaoMap setPosition={setPosition} position={position} />
      <RecommendDrawer />
    </main>
  );
}

export default MainPage;
