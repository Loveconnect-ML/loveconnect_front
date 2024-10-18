"use client"
import { Loading } from '@/components/Loading';
import { Button } from '@/components/ui/button';
import { useWebcamContext } from '@/components/WebcamProvider';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

type Props = {}

function PhotoEnrollmentScreen({ }: Props) {

    const { imageUrls, setImageUrls } = useWebcamContext();
    const [isTransformed, setIsTransformed] = useState(false);
    const [isLoaded, setIsLoaded] = useState(true);
    const router = useRouter();

    const transformImage = async () => {
        setIsLoaded(false);
        try {
            const res = await fetch('/api/images', {
                method: 'POST',
                body: JSON.stringify({ image: imageUrls[0] }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            const url = data.url;
            setImageUrls([url, ...imageUrls]);
            setIsLoaded(true);
            setIsTransformed(true);
        } catch (error) {
            console.error('Failed to transform image', error);
        }
    }

    // const enrollImage = async () => {
    //     try {
    //         const res = await fetch('/api/images', {
    //             method: 'POST',
    //             body: JSON.stringify({ image: imageUrls[0], type: "ENROLL" }),
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //         const data = await res.json();
    //         const url = data.url;
    //         setImageUrls([url]);
    //         setIsTransformed(true);
    //     } catch (error) {
    //         console.error('Failed to enroll image', error);
    //     }
    // }

    return (
        <div className='flex flex-col w-full justify-center'>
            <h1 className='font-PretendardBold text-lg text-center'>찍은 사진을 이제 AI로 변환하여 등록해볼까요?</h1>
            <div className='px-8 py-4'>
                <Image className='rounded-xl' src={imageUrls[0]} alt='Photo' width={500} height={500} />
            </div>
            {isTransformed ? isLoaded ? (
                // <Button
                //     onClick={enrollImage}
                //     className='rounded-full w-2/3 mx-auto'
                // >
                //     등록하기
                // </Button>
                <></>
            ) : (
                <></>
            ) : (
                <Button
                    disabled={!isLoaded}
                    onClick={transformImage}
                    className='rounded-full w-2/3 mx-auto'
                >
                    변환하기
                </Button>

            )}

            {isLoaded ? (
                <></>
            ) : (
                <div className='w-full flex justify-center'>
                    <Loading />
                </div>
            )}
        </div>
    )
}

export default PhotoEnrollmentScreen