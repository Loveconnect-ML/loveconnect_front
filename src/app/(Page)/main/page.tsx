"use client";
import KakaoMap from "@/components/KakaoMap";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import CircleLoading from "@/components/v2/loadings/CircleLoading";
import { useGeo } from "@/hooks/useGeo";
import { FilePlus, MapIcon, PlusCircle, User, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { toast } from "react-hot-toast";
// import useKakaoLoader from "../../../hooks/useKakaoLoader";
import { Map, MapMarker } from "react-kakao-maps-sdk";

type Props = {};

function MainPage({ }: Props) {
  //   useKakaoLoader()
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
  const [drawer, setDrawer] = useState(true);
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

  const [myPage, setMyPage] = useState(false);

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

  const toggleDrawer = () => {
    setDrawer(!drawer);
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

    // console.log(message);

    setDiary((prev) => ({
      ...prev,
      result: message,
    }));

    // setDiary({
    //   title: diary.title,
    //   content: message,
    //   image: diary.image,
    // });

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


  const toggleMyPage = () => {
    setMyPage((prev) => !prev);
  }

  return (
    <div className="relative w-full h-full">
      {diaryPage ? (
        <div className="absolute flex flex-col items-center left-0 top-0 bg-white w-full h-full z-50">
          {diary.result ? (
            <div className="z-[70] h-full absolute top-0 justify-center gap-6 flex-col w-full text-lg flex items-center px-8 pt-10 pb-28">
              <div className=" mr-auto mb-4">
                <div className="w-fit">생성된 일기</div>
                <div className="font-PretendardRegular text-xs">
                  수정하고 업로드할 수 있어요!
                </div>
              </div>
              <textarea
                className="h-full font-PretendardRegular border-2 p-3 rounded-lg resize-none border-gray-300 text-lg w-full outline-none"
                value={diary.result}
                onChange={(e) =>
                  setDiary((prev) => ({
                    ...prev,
                    result: e.target.value,
                  }))
                }
              />
              <Button
                onClick={uploadDiary}
                className="mt-auto z-50 justify-center gap-2 flex-col w-full self-center flex items-center"
              >
                일기 업로드하기
              </Button>
            </div>
          ) : (
            <div className="pt-16 pb-28 relative justify-centerz h-full flex flex-col w-full left-0 overflow-y-auto scrollbar-hide">
              <div className="z-50 justify-centerz flex flex-col w-full">
                <div className="text-center w-full text-2xl">
                  AI로 일기와 한줄평 쓰기
                </div>
                <div className="font-PretendardRegular text-center w-full text-xs">
                  이미지와 텍스트를 입력하면 AI가 일기와 한줄평을 작성해줍니다
                </div>
              </div>
              <div className="justify-center flex-col w-full text-lg top-8 flex items-center px-8 py-6">
                <div className="w-fit mr-auto">제목</div>
                <input
                  onChange={(e) =>
                    setDiary((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className="h-10 font-PretendardRegular border-b-2 border-gray-300 text-lg w-full outline-none"
                  placeholder="한줄평 및 일기의 제목을 입력해주세요"
                />
              </div>
              <div className="justify-center gap-2 flex-col w-full text-lg flex items-center px-8 py-6">
                <div className="w-fit mr-auto">내용 쓰기</div>
                <textarea
                  onChange={(e) =>
                    setDiary((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                  className="h-32 font-PretendardRegular border-2 p-3 rounded-lg resize-none border-gray-300 text-lg w-full outline-none"
                  placeholder="내용을 입력해주세요"
                />
              </div>
              <div className="z-50 justify-center gap-2 flex-col w-full text-lg flex items-center px-8 py-6">
                <div className="w-fit mr-auto">이미지 업로드</div>
                <div className="h-fit z-50 relative flex flex-col gap-2 items-center justify-center border-2 p-3 rounded-lg resize-none border-gray-300 text-lg w-full outline-none">
                  <input
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          const result = e.target?.result;
                          if (typeof result === "string") {
                            setDiary((prev) => ({
                              ...prev,
                              image: result,
                            }));
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    type={"file"}
                    accept="image/*"
                    id="upload-photo"
                    className="cursor-pointer absolute w-full h-full opacity-0 z-50"
                  />
                  {diary.image ? (
                    <div className="w-32 h-fit">
                      <Image
                        src={diary.image}
                        alt=""
                        width={128}
                        height={128}
                      />
                    </div>
                  ) : (
                    <>
                      <PlusCircle size={48} className="text-gray-400" />
                      <div className="font-PretendardBold text-gray-400">
                        이미지를 업로드해주세요
                      </div>
                    </>
                  )}
                </div>
              </div>
              {loadingGPT ? (
                <div className="z-[80] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
                  <CircleLoading />
                </div>
              ) : <div className="px-8 pt-4">
                <Button
                  onClick={generateDiary}
                  className=" z-50 justify-center gap-2 flex-col w-full text-lg self-center flex items-center"
                >
                  일기 생성하기
                </Button>
              </div>}
            </div>
          )}
          <button
            onClick={toggleDiary}
            className="z-[90] absolute top-3 right-3 flex items-center justify-center rounded-full bg-white w-10 h-10"
          >
            <X fill="black" />
          </button>
        </div>
      ) : <></>}
      {myPage ? (
        <div className="absolute flex flex-col items-center left-0 top-0 bg-white w-full h-full z-50">
          <button
            onClick={toggleMyPage}
            className="z-[90] absolute top-3 right-3 flex items-center justify-center rounded-full bg-white w-10 h-10"
          >
            <X fill="black" />
          </button>
          <div className="pt-8 pb-16">
            <div className="text-center w-full text-2xl">
              마이페이지
            </div>
            <div className="font-PretendardRegular text-center w-full text-xs">
              내 정보와 일기를 확인해보세요
            </div>
            <div>
              {diaries?.map((diary, index) => (
                <div key={index} className="flex flex-col gap-2 w-full p-4 border-b-2 border-gray-300">
                  <div className="font-PretendardBold text-lg">{diary.title} / {diary.createdAt.split("T")[0]} 작성</div>
                  {/* <div className="font-PretendardRegular text-sm">{diary.content}</div> */}
                  <div className="font-PretendardRegular text-xs">{diary.location}</div>
                  <div className="font-PretendardRegular text-xs">{diary.result}</div>
                  <div>
                    <Image src={diary.imageSrc} alt="" width={128} height={128} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : <button
        onClick={() => {
          toggleMyPage();
          setDrawer(false);
        }}
        className="top-3 right-3 flex items-center justify-center absolute z-20 rounded-full bg-white w-10 h-10 shadow-lg"
      >
        <User fill="black" />
      </button>
      }
      <div className="z-20 absolute top-3 left-3">
        <Logo />
      </div>
      <KakaoMap setPosition={setPosition} position={position} />
      {drawer ? (
        <div className="absolute bottom-0 z-20 w-full h-96 rounded-t-3xl bg-white">
          <div className="relative flex flex-col justify-center w-full bg-white">
            <div className="text-start absolute top-6 left-6 text-md sm:text-xl font-PretendardBold text-indigo-600">
              오늘의 추천 장소에요
            </div>
            <div className="text-start absolute top-[54px] left-6 text-sm sm:text-md font-PretendardRegular">
              {places
                ? "주변 사람들과 함께 추천 장소에서 놀아보세요!"
                : "현재 위치 기반으로 추천 장소를 찾아드릴게요"}
            </div>
            {places ? (
              <div className="absolute flex flex-col items-center w-full gap-2 top-24 text-sm sm:text-md font-PretendardRegular">
                <div className="flex flex-col gap-4 h-full items-center pb-20 bg-white">
                  {places?.url ? (
                    <div className="h-fit">
                      <Image src={places?.url} alt="" width={128} height={128} />
                    </div>
                  ) : (
                    <div className="w-32 h-32 bg-gray-300 rounded-lg"></div>
                  )}
                  <div className="font-PretendardBold text-md sm:text-lg">
                    {places?.title}
                  </div>
                  <div className="font-PretendardMedium text-sm sm:text-md break-keep">
                    {places?.description}
                  </div>
                  <div className="p-2 bg-gray-200 font-PretendardRegular text-xs sm:text-sm h-24 overflow-y-scroll scrollbar-hide">
                    {places?.overview}
                  </div>
                  <Button
                    onClick={() => {
                      toggleDiary();
                      setDrawer(false);
                    }}
                    className="w-3/4 h-10 mt-auto"
                  >
                    해당 장소로 일기 작성하기
                  </Button>
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
