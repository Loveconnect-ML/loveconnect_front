"use client"
import React, { useLayoutEffect, useState } from 'react'
import Snap from '../content/Snap'
import Snapshots from '../content/Snapshots'
import BottomNavbar from '@/components/v2/nav/BottomNavbar'
import TopNavbar from '../nav/TopNavbar'
import "./Screen.css"
import InitialProfileChat from '../chat/InitialProfileChat'
import WaveBackground from '@/components/WaveBackground'
import { Camera } from 'react-camera-pro'


const defaultErrorMessages = {
    noCameraAccessible: 'No camera device accessible. Please connect your camera or try a different browser.',
    permissionDenied: 'Permission denied. Please refresh and give camera permission.',
    switchCamera:
        'It is not possible to switch camera to different one because there is only one video device accessible.',
    canvas: 'Canvas is not supported.'
}

type Props = {}

function MainScreen({ }: Props) {

    const [isFirstRegister, setIsFirstRegister] = useState(true)
    // const [chatBubbles, setChatBubbles] = useState<any>([])

    const fetchIsFirstRegister = async () => {
        const res = await fetch('/api/user/{}/isFirstRegister')
        const data = await res.json()
        setIsFirstRegister(data.isFirstRegister)
    }

    const fetchChatBubbles = async () => {
        const res = await fetch('/api/user/{}/chatBubbles')
        const data = await res.json()
        // setChatBubbles(data.chatBubbles)
    }

    const fetchCompleteRegister = async () => {
        const res = await fetch('/api/user/{}/completeRegister')
        const data = await res.json()
        setIsFirstRegister(data.isFirstRegister)
    }

    useLayoutEffect(() => {
        // fetchIsFirstRegister()
        // setIsFirstRegister(false)
    }, [])

    useLayoutEffect(() => {
        // fetchChatBubbles()
    }, [])

    const snaps = [
        {
            id: 1,
            title: 'Snap 1',
            content: 'This is the first snap',
            createdAt: new Date().toISOString().split('T')[0],
        },
    ]


    return <main className='relative'>
        <div className='z-10 sm:w-[500px] w-full pb-16 h-full scrollbar-hide overflow-y-scroll'>
            <TopNavbar />
            {isFirstRegister ? (
                <>
                    <InitialProfileChat onRegistered={() => setIsFirstRegister(false)} />
                </>
            ) : (
                <Camera
                    errorMessages={defaultErrorMessages}
                />
            )}
            <BottomNavbar />
        </div>
        <WaveBackground />
    </main>
}

export default MainScreen