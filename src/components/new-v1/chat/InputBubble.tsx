import React from 'react'
import { Send } from 'lucide-react'
import { motion } from 'framer-motion'


type InputBubbleBaseProps = {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: string
    handleNext: () => void
    disabled: boolean
}

type TextInputBubbleProps = InputBubbleBaseProps
type InputBubbleProps = TextInputBubbleProps

const InputBubble = ({ handleChange, value, handleNext, disabled }: InputBubbleProps) => {
    return (
        <motion.div
            className="flex p-2 rounded-lg bg-gray-100 self-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="flex">
                <input
                    onChange={handleChange}
                    value={value}
                    className="border-b-2 border-gray-300 w-full text-center bg-transparent outline-none"
                    disabled={disabled}
                />
                <button onClick={handleNext} disabled={disabled}>
                    <Send className="rounded-full text-sm p-1 text-white bg-black cursor-pointer" />
                </button>
            </div>
        </motion.div>
    );
};

export default InputBubble
