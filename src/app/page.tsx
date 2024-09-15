"use client";

import { useAuth } from "@clerk/nextjs";
import MainScreen from "@/components/new-v1/screen/MainScreen";
import LoginScreen from "@/components/new-v1/screen/LoginScreen ";

export default function Home() {

  const { isSignedIn } = useAuth();

  return isSignedIn ? (
    <MainScreen />
  ) : (
    <LoginScreen />
  );
}
