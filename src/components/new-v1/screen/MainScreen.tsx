"use client"
import React from 'react'
import Snap from '../content/Snap'
import Snapshots from '../content/Snapshots'
import TopNavbar from '../nav/TopNavbar'
import "./Screen.css"

type Props = {}

function MainScreen({ }: Props) {

    const snaps = [
        {
            id: 1,
            title: 'Snap 1',
            content: 'This is the first snap',
            createdAt: new Date().toISOString().split('T')[0],
        },
    ]

    return (
        <main className='sm:w-[500px] w-full pb-16'>
            <div className='p-5'>
                <TopNavbar />
            </div>
            <Snapshots />
            <div className='p-5'>
                {snaps.map((snap) => (
                    <Snap key={snap.id} {...snap} />
                ))}
            </div>
        </main>
    )
}

export default MainScreen