import { ArrowUp, Search } from 'lucide-react'
import React from 'react'

type Props = {
    onClickSearchButton?: () => void
    onChangeSearchText?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function SearchBar({ onChangeSearchText }: Props) {
    return (
        <div className='mx-auto mt-auto w-4/5 flex relative'>
            <Search className='w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 z-20' color='gray' />
            <input
                type={'text'}
                onChange={onChangeSearchText}
                placeholder="이상형을 묘사해주세요"
                className="w-full border-[3px] pr-2 py-2 pl-12 rounded-2xl drop-shadow-lg font-PretendardRegular resize-none border-indigo-500 outline-none"
            />
        </div>
    )
}

export default SearchBar