import CustomSelectOption from "./customSelectOption";
import symbols from '../data/symbols.json'

const CustomSelectOptionList = ({ setSelectedOption }: any) => {
    return (
        <ul className='absolute top-full right-0 left-0 border-stone-400 border max-h-48 overflow-y-auto z-50'>
            {symbols.map(option =>
                <CustomSelectOption
                    key={option.key}
                    code={option.key}
                    name={option.value}
                    setSelectedOption={setSelectedOption}
                />)}
        </ul>
    );
}

export default CustomSelectOptionList;