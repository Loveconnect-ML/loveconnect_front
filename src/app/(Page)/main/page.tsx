"use client";
import Logo from "@/components/Logo";
import CircleLoading from "@/components/v2/loadings/CircleLoading";
import { Smile, User, X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
// import useKakaoLoader from "../../../hooks/useKakaoLoader";
import { Map } from "react-kakao-maps-sdk";

type Props = {};

function MainPage({}: Props) {
  //   useKakaoLoader();

  const [drawer, setDrawer] = useState(true);

  const toggleDrawer = () => {
    if (!drawer) {
      toast("장소 추천 기능은 준비중입니다", {
        icon: "🔒",
      });
    }

    setDrawer(!drawer);
  };

  return (
    <div className="relative w-full h-full">
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
      <Map
        className="z-10"
        center={{
          lat: 37.5665,
          lng: 126.978,
        }}
        style={{
          width: "500px",
          height: "100vh",
        }}
        level={3}
      />
      {/* MOCK DATA */}
      {drawer ? (
        <div className="absolute bottom-0 z-20 border-t border-x border-gray-700 w-full h-72 rounded-t-3xl bg-white">
          <div className="relative flex flex-col justify-center w-full bg-white">
            <div className="text-start absolute top-6 left-6 text-md sm:text-xl font-PretendardBold text-indigo-600">
              오늘의 추천 장소에요
            </div>
            <div className="text-start absolute top-14 left-6 text-sm sm:text-md font-PretendardRegular">
              리스트를 확인하고 주변 친구와 놀러가볼까요?
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 top-28">
              <CircleLoading />
            </div>
          </div>
          <div className="relative w-full h-full flex flex-col justify-center items-center">
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
          <Smile />
        </button>
      )}
    </div>
  );
}

export default MainPage;
