"use client";
import React, { createContext, useContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

interface ContextType {
  imageUrls: string[];
  setImageUrls: any;
  poseUrl: string;
  setPoseUrl: any;
}

const WebcamContext = createContext<ContextType>({
  imageUrls: [],
  setImageUrls: () => {},
  poseUrl: "",
  setPoseUrl: () => {},
});

export function useWebcamContext() {
  const context = useContext(WebcamContext);
  return context;
}

function WebcamProvider({ children }: Props) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [poseUrl, setPoseUrl] = useState<string>("");
  
  return (
    <WebcamContext.Provider value={{ imageUrls, setImageUrls, poseUrl, setPoseUrl }}>
      {children}
    </WebcamContext.Provider>
  );
}

export default WebcamProvider;
