import React from 'react'
import "./Screen.css"

type Props = {}

function ProfileScreen({ }: Props) {
    return (
        <main className='sm:w-[500px] w-full pb-16'>
            <div className='p-5'>
                <h1 className='text-xl font-TTHakgyoansimUndongjangL'>Profile</h1>
            </div>
        </main>
    )
}

export default ProfileScreen