import React from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'

type Props = {
    options: { label: string, value: string }[]
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    value: string
    handleNext: () => void
    disabled: boolean
}

function SelectionBubble({ disabled, handleChange, handleNext, options, value }: Props) {
    return (
        <motion.div
            className='flex p-2 rounded-lg bg-gray-100 self-end'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className='flex gap-2'>
                <select
                    className='w-full text-center rounded-lg bg-transparent outline-none'
                    onChange={handleChange}
                    value={value}
                >
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <button onClick={handleNext} disabled={disabled}>
                    <Send className='rounded-full text-sm p-1 text-white bg-black cursor-pointer' />
                </button>
            </div>
        </motion.div>
    )
}

export default SelectionBubble