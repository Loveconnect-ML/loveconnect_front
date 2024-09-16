"use client";
import React from "react";
import Link from "next/link";
import { Book, HomeIcon, PlusCircleIcon, Search, User } from 'lucide-react'
import { usePathname } from "next/navigation";

type Props = {

};


const bottomNavbarElements = [
  {
    icon: <HomeIcon />,
    link: '/'
  },
  {
    icon: <Search />,
    link: '/search'
  },
  {
    icon: <PlusCircleIcon className='text-white' fill='black' size={40} />,
    link: '/add'
  },
  {
    icon: <Book />,
    link: '/book'
  },
  {
    icon: <User />,
    link: '/profile'
  },
]


function BottomNavbar({ }: Props) {

  const pathname = usePathname();

  return (
    <div className="z-[60] h-16 fixed flex items-center justify-evenly bottom-0 w-full sm:w-[500px] bg-white shadow-xl shadow-black">
      {bottomNavbarElements.map((element, index) => (
        <Link
          key={index}
          href={element.link}
          replace={true}
          className={`p-3 flex justify-center items-center ${pathname === element.link ? 'text-black' : 'text-gray-500'}`}
        >
          {element.icon}
        </Link>
      ))}
    </div>
  );
}

export default BottomNavbar;
