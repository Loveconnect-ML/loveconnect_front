import { Button } from '@/components/ui/button';
import CircleLoading from '@/components/v2/loadings/CircleLoading';
import { MapIcon, X } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react'

type Props = {}

function RecommendDrawer({ }: Props) {

    const [drawer, setDrawer] = useState(true);

    const toggleDrawer = () => {
        setDrawer(!drawer);
    };

    const [places, setPlaces] = useState<any | null>(null);

    const [fetching, setFetching] = useState(false);

    const fetchPlaces = async () => {
    };

    return (
        <>
            {drawer ? (
                <div className="absolute bottom-0 z-20 w-full h-96 rounded-t-3xl bg-white">
                    <div className="relative flex flex-col justify-center w-full bg-white">
                        <div className="text-start absolute top-6 left-6 text-md sm:text-xl font-PretendardBold text-indigo-600">
                            오늘의 추천 장소에요
                        </div>
                        <div className="text-start absolute top-[54px] left-6 text-sm sm:text-md font-PretendardRegular">
                            {places
                                ? "주변 사람들과 함께 추천 장소에서 놀아보세요!"
                                : "현재 위치 기반으로 추천 장소를 찾아드릴게요"}
                        </div>
                        {places ? (
                            <div className="absolute flex flex-col items-center w-full gap-2 top-24 text-sm sm:text-md font-PretendardRegular">
                                <div className="flex flex-col gap-4 h-full items-center pb-20 bg-white">
                                    {places?.url ? (
                                        <div className="h-fit">
                                            <Image src={places?.url} alt="" width={128} height={128} />
                                        </div>
                                    ) : (
                                        <div className="w-32 h-32 bg-gray-300 rounded-lg"></div>
                                    )}
                                    <div className="font-PretendardBold text-md sm:text-lg">
                                        {places?.title}
                                    </div>
                                    <div className="font-PretendardMedium text-sm sm:text-md break-keep">
                                        {places?.description}
                                    </div>
                                    <div className="p-2 bg-gray-200 font-PretendardRegular text-xs sm:text-sm h-24 overflow-y-scroll scrollbar-hide">
                                        {places?.overview}
                                    </div>
                                    <Button
                                        onClick={() => {
                                            setDrawer(false);
                                        }}
                                        className="w-3/4 h-10 mt-auto"
                                    >
                                        해당 장소로 일기 작성하기
                                    </Button>
                                </div>
                            </div>
                        ) : fetching ? (
                            <div className="absolute left-1/2 -translate-x-1/2 top-28">
                                <CircleLoading />
                            </div>
                        ) : (
                            <Button
                                onClick={fetchPlaces}
                                className="absolute top-40 self-center flex items-center justify-center w-4/5 h-10"
                            >
                                장소 추천 받기
                            </Button>
                        )}
                    </div>

                    <div className="relative flex flex-col justify-center items-center">
                        <button
                            onClick={toggleDrawer}
                            className="absolute top-3 right-3 flex items-center justify-center rounded-full bg-white w-10 h-10"
                        >
                            <X fill="black" />
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={toggleDrawer}
                    className="bottom-20 right-3 flex items-center justify-center absolute z-20 rounded-full bg-white w-10 h-10 shadow-lg"
                >
                    <MapIcon />
                </button>
            )}
        </>
    )
}

export default RecommendDrawer