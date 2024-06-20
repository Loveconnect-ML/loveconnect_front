// hooks/usePaddle.tsx
"use client";
import { initializePaddle, InitializePaddleOptions, Paddle } from "@paddle/paddle-js";
import { useEffect, useState } from "react";

export default function usePaddle() {
  const [paddle, setPaddle] = useState<Paddle>();
  
  useEffect(() => {
    initializePaddle({
      environment: process.env.NEXT_PUBLIC_PADDLE_ENV! ? "production" : "sandbox",
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!,
      eventCallback: async (data: any) => {
        // console.log(data);
        if (data.name == "checkout.loaded") {
          paddle?.Spinner.hide();
        };
        if (data.name == "checkout.completed") {
          paddle?.Spinner.hide();
          await fetch("/api/v2/payLimit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              type: "increment"
            }),
          })
        }
      }
      // seller: process.env.NEXT_PUBLIC_PADDLE_SELLER_ID as unknown as number,
    } as unknown as InitializePaddleOptions).then((paddleInstance: Paddle | undefined) => {
      if (paddleInstance) {
        setPaddle(paddleInstance);
      }
    });
  }, []);

  return paddle;
}