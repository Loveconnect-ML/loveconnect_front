"use client"
import useFetchSnaps from '@/hooks/useFetchContents'
import React from 'react'
import Snap from '../content/Snap'
import "./MainScreen.css"

type Props = {}

function MainScreen({ }: Props) {

    const snaps = useFetchSnaps()

    return (
        <main className='sm:w-[500px] w-full'>
            <div>
                {snaps.map((snap) => (
                    <Snap key={snap.id} {...snap} />
                ))}
            </div>
        </main>
    )
}

export default MainScreen