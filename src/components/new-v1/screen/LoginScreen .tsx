import React from 'react'
import WaveBackground from "@/components/WaveBackground";
import TopNavbar from "@/components/v2/nav/TopNavbar";
import MainCard from "@/components/v3/pages/home/MainCard";

type Props = {}

function LoginScreen({ }: Props) {
    return (
        <div className="w-full h-full py-6 px-10">
            <WaveBackground />
            <div className="flex flex-col justify-evenly w-full h-full z-10">
                <TopNavbar />
                <div className="my-auto h-full flex justify-center items-center space-x-8">
                    <div
                        // bg-white
                        className={`flex flex-col justify-center w-full h-3/4 gap-4 text-center rounded-lg drop-shadow-2xl bg-no-repeat`}
                    >
                        <h1 className="text-3xl sm:text-6xl mt-auto font-TTHakgyoansimUndongjangL bg-gradient-to-r from-red-600 to-indigo-400 inline-block text-transparent bg-clip-text">
                            PHOTOisk
                        </h1>
                        <p className="text:sm sm:text-xl text-black font-PretendardBold">
                            AI로 남기는 여러분의 소중한 인생샷
                        </p>
                        <MainCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen 