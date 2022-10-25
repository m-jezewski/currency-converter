import { Dispatch, KeyboardEvent, SetStateAction, useRef } from "react"

interface CustomSelectOptionProps {
    countryFlagSrc?: string
    code: string
    name: string
    setSelectedOption: Dispatch<SetStateAction<{
        currencyCode: string;
        currencyName: string;
    }>>
}

const CustomSelectOption = ({ countryFlagSrc, code, name, setSelectedOption }: CustomSelectOptionProps) => {

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
            <div className="w-10 h-7 bg-red-700 inline-block" /> {/* country flag will be here */}
            <span className='text-xl font-semibold'>{code}</span> {/* ISO code */}
            <span className='text-lg ml-auto'>{name}</span> {/* Full currency name */}
        </li>
    );
}

export default CustomSelectOption;