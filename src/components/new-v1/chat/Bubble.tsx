"use client"
import React from 'react'
import { motion } from "framer-motion"

interface ChatBubbleProps {
    content: any
    isMine: boolean
}
function Bubble({ content, isMine }: ChatBubbleProps) {

    return (
        <motion.div
            className={`flex p-2 rounded-lg ${isMine ? 'bg-gray-100 self-end' : 'bg-gray-200 self-start'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {content}
        </motion.div>
    )
}

export default Bubble