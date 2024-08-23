import { Button } from '@/components/ui/button';
import CircleLoading from '@/components/v2/loadings/CircleLoading';
import { PlusCircle, X } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

type Props = {}

function DiaryPage({ }: Props) {

    const [diaryPage, setDiaryPage] = React.useState(false);

    const toggleDiary = () => {
        setDiaryPage(!diaryPage);
    };

    const [diary, setDiary] = React.useState<{
        title: string;
        content: string;
        image: string;
        result?: string;
    }>({
        title: "",
        content: "",
        image: "",
        result: "",
    });

    const [loadingGPT, setLoadingGPT] = React.useState(false);

    const generateDiary = () => {

    }

    const uploadDiary = () => {
    }

    return (
        <>
            {diaryPage ? (
                <div className="absolute flex flex-col items-center left-0 top-0 bg-white w-full h-full z-50">
                    {diary.result ? (
                        <div className="z-[70] h-full absolute top-0 justify-center gap-6 flex-col w-full text-lg flex items-center px-8 pt-10 pb-28">
                            <div className=" mr-auto mb-4">
                                <div className="w-fit">생성된 일기</div>
                                <div className="font-PretendardRegular text-xs">
                                    수정하고 업로드할 수 있어요!
                                </div>
                            </div>
                            <textarea
                                className="h-full font-PretendardRegular border-2 p-3 rounded-lg resize-none border-gray-300 text-lg w-full outline-none"
                                value={diary.result}
                                onChange={(e) =>
                                    setDiary((prev) => ({
                                        ...prev,
                                        result: e.target.value,
                                    }))
                                }
                            />
                            <Button
                                onClick={uploadDiary}
                                className="mt-auto z-50 justify-center gap-2 flex-col w-full self-center flex items-center"
                            >
                                일기 업로드하기
                            </Button>
                        </div>
                    ) : (
                        <div className="pt-16 pb-28 relative justify-centerz h-full flex flex-col w-full left-0 overflow-y-auto scrollbar-hide">
                            <div className="z-50 justify-centerz flex flex-col w-full">
                                <div className="text-center w-full text-2xl">
                                    AI로 일기와 한줄평 쓰기
                                </div>
                                <div className="font-PretendardRegular text-center w-full text-xs">
                                    이미지와 텍스트를 입력하면 AI가 일기와 한줄평을 작성해줍니다
                                </div>
                            </div>
                            <div className="justify-center flex-col w-full text-lg top-8 flex items-center px-8 py-6">
                                <div className="w-fit mr-auto">제목</div>
                                <input
                                    onChange={(e) =>
                                        setDiary((prev) => ({
                                            ...prev,
                                            title: e.target.value,
                                        }))
                                    }
                                    className="h-10 font-PretendardRegular border-b-2 border-gray-300 text-lg w-full outline-none"
                                    placeholder="한줄평 및 일기의 제목을 입력해주세요"
                                />
                            </div>
                            <div className="justify-center gap-2 flex-col w-full text-lg flex items-center px-8 py-6">
                                <div className="w-fit mr-auto">내용 쓰기</div>
                                <textarea
                                    onChange={(e) =>
                                        setDiary((prev) => ({
                                            ...prev,
                                            content: e.target.value,
                                        }))
                                    }
                                    className="h-32 font-PretendardRegular border-2 p-3 rounded-lg resize-none border-gray-300 text-lg w-full outline-none"
                                    placeholder="내용을 입력해주세요"
                                />
                            </div>
                            <div className="z-50 justify-center gap-2 flex-col w-full text-lg flex items-center px-8 py-6">
                                <div className="w-fit mr-auto">이미지 업로드</div>
                                <div className="h-fit z-50 relative flex flex-col gap-2 items-center justify-center border-2 p-3 rounded-lg resize-none border-gray-300 text-lg w-full outline-none">
                                    <input
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onload = (e) => {
                                                    const result = e.target?.result;
                                                    if (typeof result === "string") {
                                                        setDiary((prev) => ({
                                                            ...prev,
                                                            image: result,
                                                        }));
                                                    }
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        type={"file"}
                                        accept="image/*"
                                        id="upload-photo"
                                        className="cursor-pointer absolute w-full h-full opacity-0 z-50"
                                    />
                                    {diary.image ? (
                                        <div className="w-32 h-fit">
                                            <Image
                                                src={diary.image}
                                                alt=""
                                                width={128}
                                                height={128}
                                            />
                                        </div>
                                    ) : (
                                        <>
                                            <PlusCircle size={48} className="text-gray-400" />
                                            <div className="font-PretendardBold text-gray-400">
                                                이미지를 업로드해주세요
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                            {loadingGPT ? (
                                <div className="z-[80] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
                                    <CircleLoading />
                                </div>
                            ) : <div className="px-8 pt-4">
                                <Button
                                    onClick={generateDiary}
                                    className=" z-50 justify-center gap-2 flex-col w-full text-lg self-center flex items-center"
                                >
                                    일기 생성하기
                                </Button>
                            </div>}
                        </div>
                    )}
                    <button
                        onClick={toggleDiary}
                        className="z-[90] absolute top-3 right-3 flex items-center justify-center rounded-full bg-white w-10 h-10"
                    >
                        <X fill="black" />
                    </button>
                </div>
            ) : null}
        </>
    )
}

export default DiaryPage