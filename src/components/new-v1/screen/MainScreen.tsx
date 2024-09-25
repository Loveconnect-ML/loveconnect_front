"use client"
import React, { useLayoutEffect, useState } from 'react'
import Snap from '../content/Snap'
import Snapshots from '../content/Snapshots'
import BottomNavbar from '@/components/v2/nav/BottomNavbar'
import TopNavbar from '../nav/TopNavbar'
import "./Screen.css"
import InitialProfileChat from '../chat/InitialProfileChat'
import WaveBackground from '@/components/WaveBackground'

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
            {isFirstRegister ? (
                <>
                    <TopNavbar />
                    <InitialProfileChat />
                </>
            ) : (
                <>
                    <TopNavbar />
                    <Snapshots />
                    <div className='p-5'>
                        {snaps.map((snap) => (
                            <Snap key={snap.id} {...snap} />
                        ))}
                    </div>
                </>
            )}
            <BottomNavbar />
        </div>
        <WaveBackground />
    </main>
}

export default MainScreen