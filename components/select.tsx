import Image from "next/image";
import { KeyboardEvent, MouseEvent, useState } from "react";
import CustomSelectOption from "./customSelectOption";

interface SelectProps {

}

const tempOptions = [
    {
        currencyCode: 'EUR',
        currencyName: 'Euro',
    },
    {
        currencyCode: 'PLN',
        currencyName: 'Polish Zloty',
    },
    {
        currencyCode: 'GBP',
        currencyName: 'Pound Sterling'
    },
    {
        currencyCode: 'IDK',
        currencyName: 'Lorem Ipsum'
    },
    {
        currencyCode: 'XDD',
        currencyName: 'Euro',
    },
    {
        currencyCode: 'ASD',
        currencyName: 'Polish Zloty',
    },
    {
        currencyCode: 'ERW',
        currencyName: 'Pound Sterling'
    },
    {
        currencyCode: 'KDS',
        currencyName: 'Lorem Ipsum'
    },

]

const Select = () => {
    let debounceTimeout: NodeJS.Timeout;
    let searchTerm = ''
    const [isActive, setIsActive] = useState(false)
    const [selectedOption, setSelectedOption] = useState({
        currencyCode: 'EUR',
        currencyName: 'Euro',
    })

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
                    listItems[0].focus()
                }
                else {
                    listItems[focusedIndex + 1].focus()
                }
                break;
            case 'ArrowUp':
                if (listItems[focusedIndex - 1] === undefined) {
                    listItems[listItems.length - 1].focus()
                }
                else {
                    listItems[focusedIndex - 1].focus()
                }
                break; // ArrowUp - ArrowDown scrolling through list
            default:
                clearTimeout(debounceTimeout)
                searchTerm += e.key
                debounceTimeout = setTimeout(() => {
                    searchTerm = ''
                }, 350)
                const searchOption = listItems.find(li => li.children[1].innerHTML.startsWith(searchTerm.toUpperCase()))
                if (searchOption) searchOption.focus()
                break; // Searches for user input match and focuses things
        }
    }

    return (
        <div className='relative' onKeyDown={handleKeyDown}>
            <button
                className='flex gap-2 items-center p-2 bg-white border border-stone-400 w-full hover:border-stone-600 hover:bg-slate-100 transition-all duration-300'
                onClick={handleClick}
            >
                <div className="w-10 h-7 bg-blue-700" /> {/* country flag will be here*/}
                <span className='text-3xl font-semibold'>{selectedOption.currencyCode}</span>  {/* currency Code */}
                <span className='ml-auto text-xl after:content-[""] after:inline-block after:border-transparent after:border-t-stone-900 after:border-4 after:ml-2'>{selectedOption.currencyName}</span> {/* currency name */}
            </button>
            {isActive && <ul className='absolute top-full right-0 left-0 border-stone-400 border max-h-48 overflow-y-auto'>
                {tempOptions.map(option =>
                    <CustomSelectOption
                        key={option.currencyCode}
                        code={option.currencyCode}
                        name={option.currencyName}
                        setSelectedOption={setSelectedOption}
                    />)}
            </ul>} {/* {Select options} */}
        </div>
    );
}

export default Select;