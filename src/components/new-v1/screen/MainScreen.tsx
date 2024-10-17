"use client"
import React, { useState, useEffect, useLayoutEffect } from 'react';
import BottomNavbar from '@/components/v2/nav/BottomNavbar';
import TopNavbar from '../nav/TopNavbar';
import "./Screen.css";
import InitialProfileChat from '../chat/InitialProfileChat';
import WaveBackground from '@/components/WaveBackground';
import WebcamComponent from '@/components/WebcamComponent';
import HomeScreen from './HomeScreen';

const MainScreen = () => {
    const [isFirstRegister, setIsFirstRegister] = useState(false);
    const [isProfileEnrolled, setIsProfileEnrolled] = useState(true);

    useLayoutEffect(() => {
        // Uncomment the line below to fetch first register status from the server
        // fetchIsFirstRegister();
    }, []);

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
            <div className='z-10 sm:w-[500px] w-full py-16 h-full scrollbar-hide overflow-y-scroll'>
                {isFirstRegister ? (
                    <InitialProfileChat onRegistered={() => setIsFirstRegister(false)} />
                ) : isProfileEnrolled ? (
                    <HomeScreen />
                ) : (
                    <WebcamComponent mode='general' />
                )}
                <BottomNavbar />
            </div>
            <WaveBackground />
        </main>
    );
};

export default MainScreen;