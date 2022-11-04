import { KeyboardEvent, MouseEvent, useState } from "react";
import CustomSelectOptionList from "./customSelectOptionList";
import Image from "next/image";

interface SelectProps {
}


const Select = () => {
    const [isActive, setIsActive] = useState(false)
    const [selectedOption, setSelectedOption] = useState({
        currencyCode: 'EUR',
        currencyName: 'Euro',
    })
    let debounceTimeout: NodeJS.Timeout;
    let searchTerm = ''

    if (typeof window !== "undefined") {
        document.addEventListener('click', () => {
            setIsActive(false)
        })
    }

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsActive(!isActive)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        if (typeof window === "undefined") return
        const listItems = Array.from(document.getElementsByTagName("li"))
        if (listItems.length == 0) return
        const focusedIndex = listItems.indexOf(listItems.find(item => item === document.activeElement)!)

        switch (e.key) {
            case 'ArrowDown':
                if (listItems[focusedIndex + 1] === undefined) {
                    e.preventDefault()
                    listItems[0].focus()
                }
                else {
                    listItems[focusedIndex + 1].focus()
                }
                break;
            case 'ArrowUp':
                if (listItems[focusedIndex - 1] === undefined) {
                    e.preventDefault()
                    listItems[listItems.length - 1].focus()
                }
                else {
                    listItems[focusedIndex - 1].focus()
                }
                break; // ArrowUp - ArrowDown scrolling through list, preventDefaults to avoid browser list scrolling away from focused element on very top/bottom
            default:
                clearTimeout(debounceTimeout)
                searchTerm += e.key
                debounceTimeout = setTimeout(() => {
                    searchTerm = ''
                }, 350)
                const searchOption = listItems.find(li => li.children[1].innerHTML.startsWith(searchTerm.toUpperCase()))
                if (searchOption) searchOption.focus()
                break; // Searches for user input match and focuses element with matching code
        }
    }

    return (
        <div className='relative' onKeyDown={handleKeyDown}>
            <button
                className='flex gap-2 items-center p-2 bg-white border border-stone-400 w-full hover:border-stone-600 hover:bg-slate-100 transition-all duration-300 rounded-sm'
                onClick={handleClick}
            >
                <Image
                    src={`/flags/${selectedOption.currencyCode}.webp` || `/flags/BLANK.webp`}
                    onError={() => { }}
                    alt=''
                    width={60}
                    height={35}
                    className='rounded-sm'
                />
                <span className='text-3xl font-semibold'>{selectedOption.currencyCode}</span>  {/* currency Code */}
                <span className='text-lg ml-auto max-w-0.25xl text-left after:content-[""] after:inline-block after:border-transparent after:border-t-stone-900 after:border-4 after:ml-2'>{selectedOption.currencyName}</span> {/* currency name */}
            </button>
            {isActive && <CustomSelectOptionList setSelectedOption={setSelectedOption} />}
        </div>
    );
}

export default Select;