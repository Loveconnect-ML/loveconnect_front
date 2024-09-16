import React from 'react'

type Props = {}


function Snapshots({ }: Props) {
    return (
        <div className='flex justify-evenly'>
            {[1, 2, 3, 4, 5].map((snap) => {
                return (
                    <div key={snap} className='bg-gray-200 h-12 w-12 p-2 m-2 rounded-full'>
                    </div>
                )
            })}
        </div>
    )
}

export default Snapshots