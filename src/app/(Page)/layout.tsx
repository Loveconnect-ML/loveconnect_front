"use client"
import IconButton from "@/components/v2/buttons/IconButton";
import BottomNavbar from "@/components/v2/nav/BottomNavbar";
import { paths } from "@/utils/data";
import { EyeIcon, ScanFaceIcon, User2Icon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const data = [
  {
    icon: <ScanFaceIcon size={32} />,
    label: "얼굴 스티커",
    pathname: "/main",
  },
  {
    icon: <EyeIcon size={32} />,
    label: "포즈 가이드",
    pathname: "/feedback",
  },
  {
    icon: <User2Icon size={32} />,
    label: "마이페이지",
    pathname: "/mypage",
  }
]

function Layout({ children }: Props) {

  const pathname = usePathname()


  return (
    <main className="flex justify-center items-center w-full h-full bg-gray-50 overflow-clip">
      <div className="select-none flex flex-col justify-start items-center w-full h-full sm:w-[500px] overflow-y-scroll scrollbar-hide font-IBMPlexSansKRSemiBold overflow-x-clip">
        {children}
        <BottomNavbar>
          {paths.map((path, index) => (
            <Link href={path.pathname} key={index}>
              <IconButton
                className={path.pathname === pathname ? "text-indigo-500 px-2 rounded-lg py-1" : "px-2 rounded-lg py-1"}
                size="md"
                direction="column"
                icon={data[index].icon}
                label={data[index].label}
              />
            </Link>
          ))}
        </BottomNavbar>
      </div>
    </main>
  );
}

export default Layout;
