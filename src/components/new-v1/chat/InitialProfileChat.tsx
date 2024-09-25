"use client"
import React, { useState } from 'react'
import Bubble from '../chat/Bubble'

type Props = {}

const bubbles = [
    {
        id: 1,
        content: '안녕하세요! 저는 포토이스크의 관리자 이스크에요 :)',
        isMine: false,
    },
    {
        id: 2,
        content: '처음 시작하기 전에 간단한 질문 몇 가지만 드리려고 해요',
        isMine: false,
    },
    {
        id: 3,
        content: '먼저, 이름이 뭐에요?',
        isMine: false,
    },
    {
        id: 11,
        type: 'text',
        content: {
            value: '',
        },
        isMine: true,
    },
    {
        id: 4,
        content: '그리고, 성별은요?',
        isMine: false,
    },
    {
        id: 12,
        type: 'select',
        content: {
            value: [
                { label: '남성', value: "M" },
                { label: '여성', value: "F" },
                { label: '기타', value: "O" },
            ]
        },
        isMine: true,
    },
    {
        id: 5,
        content: '마지막으로, 생년월일을 알려주세요!',
        isMine: false,
    },
    {
        id: 13,
        type: 'text',
        content: {
            value: '',
        },
        isMine: true,
    },
    {
        id: 6,
        content: '감사합니다! 그럼, 이제 시작해볼까요?',
        isMine: false,
    },
]

function InitialProfileChat({ }: Props) {



    return (
        <div className='w-full h-full flex flex-col gap-3 p-5'>
            {bubbles.map((bubble: any) => bubble.isMine ? (
                <Bubble key={bubble.id}
                    content={bubble.content}
                    isMine={bubble.isMine}
                    type={bubble.type}
                />
            ) : (
                <Bubble key={bubble.id}
                    content={bubble.content}
                    isMine={bubble.isMine}
                    type={bubble.type}
                />
            ))}
        </div>
    )
}

export default InitialProfileChat