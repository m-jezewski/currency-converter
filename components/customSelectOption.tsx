import Image from "next/image"
import { Dispatch, KeyboardEvent, SetStateAction, useRef, useState } from "react"

interface CustomSelectOptionProps {
    code: string
    name: string
    setSelectedOption: Dispatch<SetStateAction<{
        currencyCode: string;
        currencyName: string;
    }>>
}

const CustomSelectOption = ({ code, name, setSelectedOption }: CustomSelectOptionProps) => {
    const [flagSrc, setFlagSrc] = useState(`/flags/${code}.webp`)
    const imageRef = useRef<any>(null!)

    const handleClick = () => {
        setSelectedOption({ currencyCode: code, currencyName: name })
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.code !== 'Space' && e.code !== 'Enter') return
        setSelectedOption({ currencyCode: code, currencyName: name })
        if (typeof window !== "undefined") {
            document.body.click()
        }
    }

    return (
        <li
            className='bg-white p-1 flex items-center gap-2 mt-0.5 hover:bg-slate-100 cursor-pointer transition-all duration-100'
            tabIndex={0}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
        >
            <Image
                src={flagSrc}
                onError={() => { setFlagSrc('/flags/BLANK.webp') }}
                alt=''
                width={60}
                height={30}
                placeholder='blur'
                blurDataURL={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mPUfQEAAUgBF51cOiYAAAAASUVORK5CYII='}
                quality={100}
                className='rounded-sm'
            />
            <span className='text-xl font-semibold'>{code}</span> {/* ISO code */}
            <span className='text-base ml-auto max-w-0.25xl text-right'>{name}</span> {/* Full currency name */}
        </li>
    );
}

export default CustomSelectOption;