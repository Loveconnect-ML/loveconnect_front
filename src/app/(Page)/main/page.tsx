import WebcamComponent from "@/components/WebcamComponent";
import WebcamProvider from "@/components/WebcamProvider";
import PhotoiskPage from "@/components/pages/PhotoiskPage";
import React from "react";

type Props = {};

function Main({}: Props) {
  return (
    <WebcamProvider>
      <WebcamComponent />
      <PhotoiskPage />
    </WebcamProvider>
  );
}

export default Main;
