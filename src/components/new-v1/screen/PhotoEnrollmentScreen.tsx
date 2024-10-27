"use client"
import { Loading } from '@/components/Loading';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';
import useImageTransformation from '@/hooks/useImageTransformation';
import { useWebcamContext } from '@/components/WebcamProvider';

function PhotoEnrollmentScreen() {
    const { imageUrls } = useWebcamContext();
    const { isLoaded, isTransformed, transformImage } = useImageTransformation(imageUrls);

    return (
        <div className='flex flex-col w-full justify-center'>
            <h1 className='font-PretendardBold text-lg text-center'>찍은 사진을 이제 AI로 변환하여 등록해볼까요?</h1>
            <div className='px-8 py-4'>
                <Image className='rounded-xl' src={imageUrls[0]} alt='Photo' width={500} height={500} />
            </div>
            {!isTransformed && (
                <Button
                    disabled={!isLoaded}
                    onClick={transformImage}
                    className='rounded-full w-2/3 mx-auto'
                >
                    변환하기
                </Button>
            )}
            {!isLoaded && (
                <div className='w-full flex justify-center'>
                    <Loading />
                </div>
            )}
        </div>
    );
}

export default PhotoEnrollmentScreen;