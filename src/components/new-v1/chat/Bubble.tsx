"use client"
import React, { useState } from 'react'
import { motion } from "framer-motion"

interface ChatBubbleProps {
    content: any
    isMine: boolean
    type: string
}
function Bubble({ content, isMine, type }: ChatBubbleProps) {

    const [value, setValue] = useState(content.value)

    const handleChange = (e: any) => {
        setValue(e.target.value)
    }

    return (
        <motion.div
            className={`flex p-2 rounded-lg ${isMine ? 'bg-gray-100 self-end' : 'bg-gray-200 self-start'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >

            {isMine && type == 'select' ? (
                <select
                    className='w-full text-center rounded-lg resize-none bg-transparent outline-none'
                >
                    {content.value.map((option: { label: string, value: string }, index: number) => (
                        <option key={index} value={option.value}>{option.label}</option>
                    ))}
                </select>
            ) : isMine && type == "text" ? (
                <input
                    onChange={handleChange}
                    value={value}
                    className='border-b-2 border-gray-300 w-full text-center resize-none bg-transparent outline-none'
                    maxLength={6}
                />
            ) : (
                <p>{content}</p>
            )}
        </motion.div>
    )
}

export default Bubble