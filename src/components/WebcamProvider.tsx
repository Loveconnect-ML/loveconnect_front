"use client";
import React, { createContext, useContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

interface ContextType {
  imageUrls: string[];
  setImageUrls: any;
}

const WebcamContext = createContext<ContextType>({
  imageUrls: [],
  setImageUrls: () => {},
});

export function useWebcamContext() {
  const context = useContext(WebcamContext);
  return context;
}

function WebcamProvider({ children }: Props) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  return (
    <WebcamContext.Provider value={{ imageUrls, setImageUrls }}>
      {children}
    </WebcamContext.Provider>
  );
}

export default WebcamProvider;
