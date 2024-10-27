"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useState } from 'react'
import SearchBar from '../basic/SearchBar'

type Props = {}

function HomeScreen({ }: Props) {

    const [searchText, setSearchText] = useState('')
    const [resultImage, setResultImage] = useState('')

    const [list, setList] = useState<any>([])
    const [id, setId] = useState('')

    const searchIdealType = async () => {
        // console.log("clicked")

        const response = await fetch('/api/images', {
            method: 'POST',
            body: JSON.stringify({ prompt: searchText, type: "MATCH" }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()

        const response2 = await fetch('/api/images', {
            method: 'POST',
            body: JSON.stringify({ id: data.id, type: "FIND" }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        setId(data.id)

        const data2 = await response2.blob()

        const image = URL.createObjectURL(data2)

        setResultImage(image)

    }

    const onChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
    }

    const recommend = async () => {
        const response = await fetch("/api/images/recommend", {
            method: 'POST',
            body: JSON.stringify({
                id: id
            }),
            headers: {
                'Content-Type': 'application/json'
            }

        })
        const data = await response.json()

        const imgs: any = []

        for (let j = 0; j < data.list.length; j++) {
            const response2 = await fetch('/api/images', {
                method: 'POST',
                body: JSON.stringify({ id: data.list[j], type: "FIND" }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const r = await response2.blob()

            const i = URL.createObjectURL(r)
            imgs.push(i)
        }

        setList([...imgs])
    }


    return <div className='w-full h-full flex flex-col'>
        <SearchBar onChangeSearchText={onChangeSearchText} />
        <Button
            onClick={searchIdealType}
            className='font-PretendardBold bg-black text-white rounded-full drop-shadow-xl text-xl w-1/2 h-12 p-4 mx-auto mt-auto mb-16'
        >
            이상형 생성!
        </Button>

        {
            resultImage && (
                <>
                    <Image
                        className='rounded-xl'
                        src={resultImage}
                        alt='Photo'
                        width={500}
                        height={500}
                    />
                    <h1>
                        이상형이 맞나요?
                    </h1>
                    <Button onClick={recommend} className='font-PretendardBold bg-gradient-to-r from-red-400 to-indigo-300 border-[3px] border-white rounded-full drop-shadow-xl text-xl w-1/2 h-12 p-4 mx-auto mt-16 mb-auto'>네!</Button>
                </>
            )
        }
        <div className="w-full flex flex-wrap">
            {list?.map((str: string, i: number) => (
                <Image
                    key={`image-${i}`}
                    className='rounded-xl'
                    src={str}
                    alt='Photo'
                    width={500}
                    height={500}
                />
            ))}
        </div>
    </div>
}

export default HomeScreen