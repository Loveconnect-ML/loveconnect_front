import { User, X } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

type Props = {}

function MyPage({ }: Props) {

    const [myPage, setMyPage] = React.useState(false);
    const [diaries, setDiaries] = React.useState<any | null>(null);

    const toggleMyPage = () => {
        setMyPage(!myPage);
    };


    return (
        <>
            {myPage ? (
                <div className="absolute flex flex-col items-center left-0 top-0 bg-white w-full h-full z-50">
                    <button
                        onClick={toggleMyPage}
                        className="z-[90] absolute top-3 right-3 flex items-center justify-center rounded-full bg-white w-10 h-10"
                    >
                        <X fill="black" />
                    </button>
                    <div className="pt-8 pb-16">
                        <div className="text-center w-full text-2xl">
                            마이페이지
                        </div>
                        <div className="font-PretendardRegular text-center w-full text-xs">
                            내 정보와 일기를 확인해보세요
                        </div>
                        <div>
                            {diaries?.map((diary: any, index: number) => (
                                <div key={index} className="flex flex-col gap-2 w-full p-4 border-b-2 border-gray-300">
                                    <div className="font-PretendardBold text-lg">{diary.title} / {diary.createdAt.split("T")[0]} 작성</div>
                                    {/* <div className="font-PretendardRegular text-sm">{diary.content}</div> */}
                                    <div className="font-PretendardRegular text-xs">{diary.location}</div>
                                    <div className="font-PretendardRegular text-xs">{diary.result}</div>
                                    <div>
                                        <Image src={diary.imageSrc} alt="" width={128} height={128} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : <button
                onClick={() => {
                    toggleMyPage();
                }}
                className="top-3 right-3 flex items-center justify-center absolute z-20 rounded-full bg-white w-10 h-10 shadow-lg"
            >
                <User fill="black" />
            </button>
            }
        </>
    )
}

export default MyPage