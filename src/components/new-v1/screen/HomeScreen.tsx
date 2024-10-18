"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useState } from 'react'
import SearchBar from '../basic/SearchBar'

type Props = {}

function HomeScreen({ }: Props) {

    const [searchText, setSearchText] = useState('')
    const [resultImage, setResultImage] = useState('')

    const searchIdealType = () => {
        const response = fetch('/api/images', {
            method: 'POST',
            body: JSON.stringify({ prompt: searchText, type: "MATCH" }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        console.log(response)

    }

    const onChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
    }


    return <div className='w-full h-full flex flex-col'>
        <SearchBar onChangeSearchText={onChangeSearchText} onClickSearchButton={searchIdealType} />
        <Button className='font-PretendardBold bg-gradient-to-r from-red-400 to-indigo-300 border-[3px] border-white rounded-full drop-shadow-xl text-xl w-1/2 h-12 p-4 mx-auto mt-16 mb-auto'>생성!</Button>
        {/* <Image
            className='rounded-xl'
            src={resultImage}
            alt='Photo'
            width={500}
            height={500}
        /> */}
    </div>
}

export default HomeScreen