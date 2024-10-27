import Image from 'next/image'
import React from 'react'
import LogoImage from "/public/NEW_LOGO.svg";

type Props = {}

function Logo({ }: Props) {
    return (
        <button className="flex items-center gap-2 h-8">
            <Image src={LogoImage} alt="SSCC" className="w-full h-full" />
            <div className="font-TTHakgyoansimUndongjangL bg-gradient-to-r from-red-600 to-indigo-400 inline-block text-transparent bg-clip-text">
                Photoisk
            </div>
        </button>
    )
}

export default Logo