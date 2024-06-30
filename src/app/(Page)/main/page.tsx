"use client";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import CircleLoading from "@/components/v2/loadings/CircleLoading";
import { useGeo } from "@/hooks/useGeo";
import { FilePlus, MapIcon, PlusCircle, User, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
// import useKakaoLoader from "../../../hooks/useKakaoLoader";
import { Map, MapMarker } from "react-kakao-maps-sdk";

type Props = {};

function MainPage({}: Props) {
  //   useKakaoLoader()

  const [places, setPlaces] = useState<{
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
  const [drawer, setDrawer] = useState(true);
  const [diaryPage, setDiaryPage] = useState(false);

  const [fetching, setFetching] = useState(false);

  const { error, location } = useGeo();

  const fetchPlaces = async () => {
    setFetching(true);

    async function init() {
      if (fetching) {
        return;
      }

      const response = await fetch("/api/v2/tour ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          TYPE: "recommend",
          contentTypeId: 14,
          raidus: 200,
          mapX: location?.longitude,
          mapY: location?.latitude,
        }),
      });

      const { message } = await response.json();

      console.log(message);

      if (message.length === 0) {
        setPlaces({
          contentId: 0,
          contentTypeId: 0,
          description: "",
          isAdvertisement: false,
          isHotplace: true,
          overview: "오류가 발생하였습니다.",
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

  const toggleDrawer = () => {
    if (!drawer) {
      toast("장소 추천 기능은 준비중입니다", {
        icon: "🔒",
      });
    }

    setDrawer(!drawer);
  };

  const toggleDiary = async () => {
    toast("일기 작성 기능은 준비중입니다", {
      icon: "🔒",
    });
    setDiaryPage((prev) => !prev);
  };

  const onClickToGenerateDiary = async (e: any) => {
    const file = e.target.files[0];
  };

  return (
    <div className="relative w-full h-full">
      {diaryPage && (
        <div className="absolute flex flex-col items-center left-0 top-0 bg-white w-full h-full z-50">
          <div className="pt-16 pb-28 relative justify-centerz h-full flex flex-col w-full left-0 overflow-y-auto scrollbar-hide">
            <div className="z-50 justify-centerz flex flex-col w-full">
              <div className="text-center w-full text-2xl">
                AI로 일기와 한줄평 쓰기
              </div>
              <div className="font-PretendardRegular text-center w-full text-xs">
                이미지와 텍스트를 입력하면 AI가 일기와 한줄평을 작성해줍니다
              </div>
            </div>
            <div className="justify-center gap-2 flex-col w-full text-lg top-8 flex items-center px-8 py-6">
              <div className="w-fit mr-auto">장소</div>
              <input
                className="h-10 font-PretendardRegular border-b-2 border-gray-300 text-lg w-full outline-none"
                placeholder="한줄평 및 일기의 제목을 입력해주세요"
              />
            </div>
            <div className="justify-center gap-2 flex-col w-full text-lg flex items-center px-8 py-6">
              <div className="w-fit mr-auto">내용 쓰기</div>
              <textarea
                className="h-32 font-PretendardRegular border-2 p-3 rounded-lg resize-none border-gray-300 text-lg w-full outline-none"
                placeholder="내용을 입력해주세요"
              />
            </div>
            <div className="z-50 justify-center gap-2 flex-col w-full text-lg flex items-center px-8 py-6">
              <div className="w-fit mr-auto">이미지 업로드</div>
              <div className="h-32 z-50 relative flex flex-col gap-2 items-center justify-center border-2 p-3 rounded-lg resize-none border-gray-300 text-lg w-full outline-none">
                <input
                  type={"file"}
                  accept="image/*"
                  id="upload-photo"
                  className="cursor-pointer absolute w-full h-full opacity-0 z-50"
                />
                <PlusCircle size={48} className="text-gray-400" />
                <div className="font-PretendardBold text-gray-400">
                  이미지를 업로드해주세요
                </div>
              </div>
            </div>
            <div className="px-8 pt-4">
              <Button className=" z-50 justify-center gap-2 flex-col w-full text-lg self-center flex items-center">
                일기 생성하기
              </Button>
            </div>
          </div>
          <button
            onClick={toggleDiary}
            className="absolute top-3 right-3 flex items-center justify-center rounded-full bg-white w-10 h-10"
          >
            <X fill="black" />
          </button>
        </div>
      )}
      <button
        onClick={toggleDiary}
        className="absolute top-16 right-3 flex items-center justify-center z-20 rounded-full bg-white w-10 h-10 shadow-lg"
      >
        <FilePlus fill="white" color="black" />
      </button>
      <button
        onClick={() =>
          toast("마이페이지 기능은 준비중입니다", {
            icon: "🔒",
          })
        }
        className="top-3 right-3 flex items-center justify-center absolute z-20 rounded-full bg-white w-10 h-10 shadow-lg"
      >
        <User fill="black" />
      </button>
      <div className="z-20 absolute top-3 left-3">
        <Logo />
      </div>
      {places ? (
        <Map
          className="z-10"
          center={{
            lng: places?.x,
            lat: places?.y,
          }}
          style={{
            width: "500px",
            height: "100vh",
          }}
          level={3}
          onCenterChanged={(e) => {
            const latlng = e.getCenter();
          }}
        >
          <MapMarker
            position={{
              lng: places?.x,
              lat: places?.y,
            }}
          />
        </Map>
      ) : (
        <Map
          className="z-10"
          center={{
            lng: location?.longitude as number,
            lat: location?.latitude as number,
          }}
          style={{
            width: "500px",
            height: "100vh",
          }}
          level={3}
        ></Map>
      )}
      {/* MOCK DATA */}
      {drawer ? (
        <div className="absolute bottom-0 z-20 border-t-2 border-x-2 border-gray-700 w-full h-80 rounded-t-3xl bg-white">
          <div className="relative flex flex-col justify-center w-full bg-white">
            <div className="text-start absolute top-6 left-6 text-md sm:text-xl font-PretendardBold text-indigo-600">
              오늘의 추천 장소에요
            </div>
            <div className="text-start absolute top-[54px] left-6 text-sm sm:text-md font-PretendardRegular">
              {places
                ? "주변 사람들과 함께 추천 장소에서 놀아보세요!"
                : "버튼을 클릭하면 현재 위치 기반으로 추천 장소를 찾아드릴게요"}
            </div>
            {places ? (
              <div className="absolute flex gap-6 top-24 h-full left-6 text-sm sm:text-md font-PretendardRegular">
                <div>
                  {places?.url && (
                    <Image
                      src={places?.url}
                      alt="place"
                      width={128}
                      height={128}
                    />
                  )}
                </div>
                <div className="flex flex-col gap-3 w-72 h-32">
                  <div className="">
                    <div className="font-PretendardBold text-md sm:text-lg">
                      {places?.title}
                    </div>
                    <div className="font-PretendardMedium text-sm sm:text-md">
                      {places?.description}
                    </div>
                  </div>
                  <div className="font-PretendardRegular text-xs sm:text-sm w-full h-36 overflow-y-scroll scrollbar-hide">
                    {places?.overview}
                  </div>
                </div>
              </div>
            ) : fetching ? (
              <div className="absolute left-1/2 -translate-x-1/2 top-28">
                <CircleLoading />
              </div>
            ) : (
              <Button
                onClick={fetchPlaces}
                className="absolute top-40 self-center flex items-center justify-center w-4/5 h-10"
              >
                장소 추천 받기
              </Button>
            )}
          </div>

          <div className="relative flex flex-col justify-center items-center">
            <button
              onClick={toggleDrawer}
              className="absolute top-3 right-3 flex items-center justify-center rounded-full bg-white w-10 h-10"
            >
              <X fill="black" />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={toggleDrawer}
          className="bottom-20 right-3 flex items-center justify-center absolute z-20 rounded-full bg-white w-10 h-10 shadow-lg"
        >
          <MapIcon />
        </button>
      )}
    </div>
  );
}

export default MainPage;
