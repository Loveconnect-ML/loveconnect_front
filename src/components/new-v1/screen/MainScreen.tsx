"use client"
import React, { useState, useEffect } from 'react';
import BottomNavbar from '@/components/v2/nav/BottomNavbar';
import TopNavbar from '../nav/TopNavbar';
import "./Screen.css";
import InitialProfileChat from '../chat/InitialProfileChat';
import WaveBackground from '@/components/WaveBackground';
import WebcamComponent from '@/components/WebcamComponent';
import HomeScreen from './HomeScreen';
import PhotoEnrollmentScreen from './PhotoEnrollmentScreen';
import { useWebcamContext } from '@/components/WebcamProvider';
import useFirstRegisterStatus from '@/hooks/useFirstRegisterStatus';
import toast from 'react-hot-toast';

const MainScreen = () => {
    const { isFirstRegister, setFirstRegisterComplete } = useFirstRegisterStatus();
    const { imageUrls } = useWebcamContext();
    const [isProfileEnrolled, setIsProfileEnrolled] = useState(false);

    useEffect(() => {
        setIsProfileEnrolled(imageUrls.length > 0);
    }, [imageUrls]);

    return (
        <main className='relative sm:w-[500px] w-full'>
            <TopNavbar />
            <div className={`z-10 sm:w-[500px] w-full h-full scrollbar-hide overflow-y-scroll ${isProfileEnrolled ? "py-16" : "pt-16"}`}>
                {isFirstRegister ? (
                    <InitialProfileChat onRegistered={setFirstRegisterComplete} />
                ) : isProfileEnrolled ? (
                    <HomeScreen />
                ) : (
                    <WebcamComponent mode='general' />
                )}
            </div>
            <WaveBackground />
        </main>
    );
};

export default MainScreen;