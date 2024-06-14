import Image from "next/image";
import React from "react";
import LogoImage from "/public/Logo.png";

type Props = {};

function Logo({}: Props) {
  return (
    <div className="w-16 h-16 invisible sm:visible">
      <Image src={LogoImage} alt="SSCC" className="w-full h-full" />
    </div>
  );
}

export default Logo;
