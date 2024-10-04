"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Bubble from "../chat/Bubble";
import InputBubble from "./InputBubble";
import SelectionBubble from "./SelectionBubble";

const bubbles: any = [
    { id: 1, content: "안녕하세요! 저는 포토이스크의 관리자 이스크에요 :)", isMine: false, step: 0 },
    { id: 2, content: "처음 시작하기 전에 간단한 질문 몇 가지만 드리려고 해요", isMine: false, step: 0 },
    { id: 3, content: "먼저, 이름이 뭐에요?", isMine: false, step: 0 },
    { id: 11, content: "", isMine: true, step: 0 },
    { id: 4, content: "그리고, 성별은요?", isMine: false, step: 1 },
    { id: 12, content: { value: [{ label: "남성", value: "M" }, { label: "여성", value: "F" }] }, isMine: true, step: 1 },
    { id: 5, content: "마지막으로, 생년월일을 알려주세요! (ex.030214)", isMine: false, step: 2 },
    { id: 13, content: "", isMine: true, step: 2 },
    { id: 6, content: "감사합니다! 그럼, 이제 시작해볼까요?", isMine: false, step: 3 }
];

const fieldMap: any = {
    0: "name",
    1: "gender",
    2: "birth"
};

const InitialProfileChat = ({ onRegistered }: {
    onRegistered: () => void
}) => {
    const [info, setInfo] = useState<any>({ name: "", gender: "", birth: "" });
    const [isDisabled, setIsDisabled] = useState([false, false, false]);
    const [currentStep, setCurrentStep] = useState(0);

    const validateInput = () => {
        const validationMessages = [
            "이름을 입력해주세요!",
            "성별을 선택해주세요!",
            "생년월일을 입력해주세요!"
        ];
        const field = fieldMap[currentStep];
        if (!info[field]) {
            toast.error(validationMessages[currentStep]);
            return false;
        }
        return true;
    };

    const handleNext = () => {
        if (!validateInput()) return;

        setCurrentStep((prev) => prev + 1);
        setIsDisabled((prev) => prev.map((disabled, idx) => (idx === currentStep ? true : disabled)));
    };

    const handleChange = (e: any) => {
        const value = e.target.value;
        const field = fieldMap[currentStep];
        if (field) {
            setInfo((prev: any) => ({ ...prev, [field]: value }));
        }
    };

    return (
        <div className="w-full h-full flex flex-col gap-3 p-5">
            {bubbles.filter((bubble: any) => bubble.step <= currentStep).map((bubble: any) => (
                bubble.isMine ? (
                    bubble.step === 1 ? (
                        <SelectionBubble
                            key={bubble.id}
                            handleChange={handleChange}
                            handleNext={handleNext}
                            value={info[fieldMap[bubble.step]]}
                            disabled={isDisabled[bubble.step]}
                            options={bubbles.find((b: any) => b.id === bubble.id).content.value}
                        />
                    ) : (
                        <InputBubble
                            key={bubble.id}
                            handleChange={handleChange}
                            handleNext={handleNext}
                            value={info[fieldMap[bubble.step]]}
                            disabled={isDisabled[bubble.step]}
                        />
                    )
                ) : bubble.step == 3 ? (
                    <>
                        <Bubble key={bubble.id} content={bubble.content} isMine={bubble.isMine} />
                        <Button
                            className="w-1/2 ml-auto"
                            onClick={onRegistered}
                        >
                            좋아요!
                        </Button>
                    </>
                ) : (
                    <Bubble key={bubble.id} content={bubble.content} isMine={bubble.isMine} />
                )
            ))}
        </div>
    );
};

export default InitialProfileChat;

