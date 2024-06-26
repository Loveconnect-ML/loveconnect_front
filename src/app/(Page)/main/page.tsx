"use client";
import React from "react";
// import useKakaoLoader from "../../../hooks/useKakaoLoader";
import { Map } from "react-kakao-maps-sdk";

type Props = {};

function MainPage({}: Props) {
  //   useKakaoLoader();

  return (
    <div>
      <Map
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
    </div>
  );
}

export default MainPage;
