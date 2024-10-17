import { Button } from '@/components/ui/button'
import React from 'react'
import SearchBar from '../basic/SearchBar'

type Props = {}

function HomeScreen({ }: Props) {
    return <div className='w-full h-full flex flex-col'>
        <SearchBar />
        <Button className='font-PretendardBold bg-gradient-to-r from-red-400 to-indigo-300 border-[3px] border-white rounded-full drop-shadow-xl text-xl w-1/2 h-12 p-4 mx-auto mt-16 mb-auto'>생성!</Button>
    </div>
}

export default HomeScreen