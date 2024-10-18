"use client"
import React, { useState, useEffect, useLayoutEffect } from 'react';
import BottomNavbar from '@/components/v2/nav/BottomNavbar';
import TopNavbar from '../nav/TopNavbar';
import "./Screen.css";
import InitialProfileChat from '../chat/InitialProfileChat';
import WaveBackground from '@/components/WaveBackground';
import WebcamComponent from '@/components/WebcamComponent';
import HomeScreen from './HomeScreen';
import PhotoEnrollmentScreen from './PhotoEnrollmentScreen';
import { useWebcamContext } from '@/components/WebcamProvider';
import toast from 'react-hot-toast';

const MainScreen = () => {
    const [isFirstRegister, setIsFirstRegister] = useState(true);
    const [isProfileEnrolled, setIsProfileEnrolled] = useState(false);
    const [isPhotoTaken, setIsPhotoTaken] = useState(false);

    const { imageUrls, setImageUrls } = useWebcamContext();

    useLayoutEffect(() => {
        // Uncomment the line below to fetch first register status from the server
        // fetchIsFirstRegister();
    }, []);

    useEffect(() => {
        if (imageUrls.length > 0) {
            setIsPhotoTaken(true);
        }

        if (imageUrls.length > 1) {
            toast("변환이 완료되었습니다!")
            setTimeout(() => {
                setIsProfileEnrolled(true);
            }, 3000)
        }
    }, [imageUrls]);

    const fetchIsFirstRegister = async () => {
        try {
            const res = await fetch('/api/user/{}/isFirstRegister');
            const data = await res.json();
            setIsFirstRegister(data.isFirstRegister);
        } catch (error) {
            console.error('Failed to fetch registration status', error);
        }
    };

    return (
        <main className='relative sm:w-[500px] w-full'>
            <TopNavbar />
            <div className={`z-10 sm:w-[500px] w-full h-full scrollbar-hide overflow-y-scroll ${isProfileEnrolled ? "py-16" : "pt-16"}`}>
                {isFirstRegister ? (
                    <InitialProfileChat onRegistered={() => setIsFirstRegister(false)} />
                ) : isProfileEnrolled ? (
                    <HomeScreen />
                ) : isPhotoTaken ? (
                    <PhotoEnrollmentScreen />
                ) : (
                    <WebcamComponent mode='general' />
                )}
                {/* {isProfileEnrolled && <BottomNavbar />} */}
            </div>
            <WaveBackground />
        </main>
    );
};

export default MainScreen;