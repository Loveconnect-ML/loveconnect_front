"use client"
import WaveBackground from '@/components/WaveBackground'
import { CheckCircle } from 'lucide-react'
import React, { useState } from 'react'

type Props = {}

function PayPage({ }: Props) {

    const [agree, setAgree] = useState(false)

    return (
        <>
            <WaveBackground />
            <div className="relative h-full bg-white w-full sm:w-[500px]">
                <div className="w-full flex flex-col items-center justify-center h-full">
                    <h1 className="text-2xl mt-8 font-PretendardBold">결제 페이지</h1>
                    <div className='flex'>
                        <span className='font-PretendardBold'>1,900원&nbsp;</span>
                        <span className='font-PretendardRegular'>결제를 진행합니다</span>
                    </div>
                    <button onClick={() => setAgree((v) => !v)} className='flex mb-8 mt-auto gap-1 items-center justify-center'>
                        <div className={agree ? "text-green-500" : ""}>약관동의</div>
                        <CheckCircle className={agree ? "text-green-500" : ""} size={16} />
                    </button>
                </div>
            </div>
        </>
    )
}

export default PayPage