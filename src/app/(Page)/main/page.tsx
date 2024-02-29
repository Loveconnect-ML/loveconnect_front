"use client";
import { Loading } from "@/components/Loading";
import WebcamComponent from "@/components/WebcamComponent";
import WebcamProvider from "@/components/WebcamProvider";
import PhotoiskPage from "@/components/pages/PhotoiskPage";
import React, { useLayoutEffect, useState } from "react";

type Props = {};

function Main({}: Props) {
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3500);
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full py-6 px-10">
        <div className="flex items-center justify-center w-full h-full">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <>
      {loading ? null : (
        <WebcamProvider>
          <WebcamComponent />
          <PhotoiskPage />
        </WebcamProvider>
      )}
    </>
  );
}

export default Main;
