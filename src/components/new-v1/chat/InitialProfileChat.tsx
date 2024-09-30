"use client"
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import Bubble from '../chat/Bubble'
import InputBubble from './InputBubble'

type Props = {}

const bubbles = [
    {
        id: 1,
        content: '안녕하세요! 저는 포토이스크의 관리자 이스크에요 :)',
        isMine: false,
        step: 0,
    },
    {
        id: 2,
        content: '처음 시작하기 전에 간단한 질문 몇 가지만 드리려고 해요',
        isMine: false,
        step: 0,
    },
    {
        id: 3,
        content: '먼저, 이름이 뭐에요?',
        isMine: false,
        step: 0,
    },
    {
        id: 11,
        content: "",
        isMine: true,
        step: 0,
    },
    {
        id: 4,
        content: '그리고, 성별은요?',
        isMine: false,
        step: 1,
    },
    {
        id: 12,
        content: {
            value: [
                { label: '남성', value: 'M' },
                { label: '여성', value: 'F' },
            ],
        },
        isMine: true,
        step: 1,
    },
    {
        id: 5,
        content: '마지막으로, 생년월일을 알려주세요! (ex.030214)',
        isMine: false,
        step: 2,
    },
    {
        id: 13,
        content: "",
        isMine: true,
        step: 2,
    },
    {
        id: 6,
        content: '감사합니다! 그럼, 이제 시작해볼까요?',
        isMine: false,
        step: 3,
    },
]

const fieldMap: { [key: number]: string } = {
    11: 'name',
    12: 'gender',
    13: 'birth',
}

function InitialProfileChat({ }: Props) {
    const [info, setInfo] = useState({
        name: '',
        gender: '',
        birth: '',
    })

    const [isDisabled, setIsDisabled] = useState([false, false, false])

    const [currentStep, setCurrentStep] = useState(0)

    const handleNext = () => {

        if (currentStep == 0 && info.name.length === 0) {
            toast.error('이름을 입력해주세요!')
            return
        }

        if (currentStep == 1 && info.gender.length === 0) {
            toast.error('성별을 선택해주세요!')
            return
        }

        if (currentStep == 2 && info.birth.length === 0) {
            toast.error('생년월일을 입력해주세요!')
            return
        }

        setCurrentStep((prev) => prev + 1)
        setIsDisabled((prev) => {
            const newDisabled = [...prev]
            newDisabled[currentStep] = true
            return newDisabled
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        const field = fieldMap[bubbles[currentStep].id]
        setInfo((prev) => ({ ...prev, [field]: value }))
    }

    return (
        <div className='w-full h-full flex flex-col gap-3 p-5'>
            {bubbles
                .filter((bubble) => bubble.step <= currentStep)
                .map((bubble: any) => {
                    if (bubble.isMine) {
                        const field = fieldMap[bubble.id]
                        return (
                            <InputBubble
                                key={bubble.id}
                                handleChange={handleChange}
                                handleNext={handleNext}
                                value={info[field]}
                                disabled={isDisabled[bubble.step]}
                            />
                        )
                    } else {
                        return (
                            <Bubble
                                key={bubble.id}
                                content={bubble.content}
                                isMine={bubble.isMine}
                            />
                        )
                    }
                })}
        </div>
    )
}

export default InitialProfileChat
