import EpisodeList from '@/components/v3/pages/my/EpisodeList'
import React from 'react'

type Props = {}

function page({ }: Props) {
    return (
        <div className="z-10 pb-16 flex flex-col flex-1 justify-start items-center w-full bg-white">
            <EpisodeList />
        </div>
    )
}

export default page