"use client"
import { Button } from '@/components/ui/button'
import WaveBackground from '@/components/WaveBackground'
import usePaddle from '@/hooks/usePaddle'
import { CheckCircle, CreditCard } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

type Props = {}

function PayPage({ }: Props) {

    const [agree, setAgree] = useState(false)

    const paddle = usePaddle();

    const openCheckout = () => {
        paddle?.Checkout.open({
            items: [
                {
                    priceId: "pri_01j0b96h6anf3r8af3dj8e7kv9", // you can find it in the product catalog
                    quantity: 1,
                },
            ],
            customer: {
                email: "" // email of your current logged in user
            },
            customData: {
                // other custom metadata you want to pass
            },
            settings: {
                
            },
        });
        paddle?.Spinner.show();
    };

    return (
        <>
            <WaveBackground />
            <div className="relative h-full bg-white w-full sm:w-[500px]">
                <div className="w-full flex flex-col items-center justify-center h-full">
                    <CreditCard size={64} />
                    <h1 className="text-2xl mt-8 font-PretendardBold">결제 페이지</h1>
                    <div className='flex'>
                        <span className='font-PretendardBold'>1,900원&nbsp;</span>
                        <span className='font-PretendardRegular'>결제를 진행합니다</span>
                    </div>
                    <button onClick={() => setAgree((v) => !v)} className='flex absolute bottom-40 gap-1 items-center font-PretendardMedium justify-center'>
                        <div className={agree ? "text-green-500" : ""}>약관동의</div>
                        <CheckCircle className={agree ? "text-green-500" : ""} size={16} />
                    </button>
                    <Link className='font-PretendardRegular flex absolute bottom-28 gap-1 items-center justify-center text-gray-400 border-b-[3px] border-gray-300' href="/terms" target={'_blank'}>약관보기</Link>
                    <Button
                        onClick={openCheckout}
                        disabled={!agree}
                        className='absolute w-[90%] bottom-4 left-1/2 -translate-x-1/2 sm:w-[432px] bg-primary hover:text-white text-primary-foreground hover:bg-primary/90'
                    >
                        결제하기
                    </Button>
                </div>
            </div>
        </>
    )
}

export default PayPage