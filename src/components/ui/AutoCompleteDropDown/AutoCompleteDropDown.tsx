
import { ChevronDown, Search, X } from "lucide-react"
import React, { useEffect, useState } from "react"
import { cn } from "../../../utils/style-utils";


interface IAutoCompleteDropDownProp extends React.HTMLAttributes<HTMLDivElement> {
    list: {
        label: string,
        value: string,
        selected:boolean
    }[],
    onItemSelect:(item:string)=>void,
    selectedValue?:string
    editMode:boolean

}

const AutoCompleteDropDown = React.forwardRef<HTMLDivElement, IAutoCompleteDropDownProp>(({ list, className,onItemSelect,selectedValue,editMode, ...props }, ref) => {


    const [inputValue, setInputValue] = useState('')
    const [selected, setSelected] = useState('')
    const [open, setOpen] = useState(false)


    useEffect(()=>{
        setSelected(list.find(item=>item.value==selectedValue)?.label||'')
    },[list, selectedValue])

    return (
        <>

            <div className={cn(`border rounded-md overflow-hidden  ${editMode ? 'bg-white' : 'bg-secondary'}`, className)} ref={ref} {...props}>

                <div
                    onClick={() => { editMode && setOpen(prev => !prev); setInputValue('') }}
                    className={`  flex items-center p-3 justify-between  ${!selected && 'text-gray-500'} `}>
                    <div className="flex justify-between w-full">
                        {selected ? (selected.length > 25 ? selected.substring(0, 20) + '...' : selected) : 'selecte language'}
                        {(selected && editMode) && <X className="ml-auto text-gray-600" size={20} onClick={() =>{ setSelected('');onItemSelect('')}} />}
                    </div>
                    <ChevronDown className={`text-gray-600 ${open && editMode && 'rotate-180'}`} />
                </div>


                <ul className={`bg-white   overflow-y-auto overflow-x-hidden pretty-scrollbar transition-all rounded drop-shadow-md  ${open &&editMode ? 'max-h-60 ' : 'max-h-0 '}`}>
                    <div className="flex items-center px-2 sticky top-0 bg-white">
                        <Search className="text-gray-500 " size={20} />
                        <input
                            type="text"
                            className="m-1 p-1 outline-none"
                            placeholder="Enter language"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                    </div>

                    {
                        list.map(item =>(item?.selected ?null:<li className={`p-3 text-sm hover:bg-primary hover:text-white 
                        ${item.label.toLowerCase() === selected.toLowerCase() && 'bg-primary text-white'
                            }
                        ${item.label.toLowerCase().startsWith(inputValue) ? 'block' : 'hidden'}
                        `}
                            onClick={() => {
                                if (item.label.toLowerCase() !== selected.toLowerCase()) {
                                    setSelected(item.label)
                                    
                                    onItemSelect(item.value)
                                }
                            }}
                        >{item.label}</li>))
                    }


                </ul>


            </div>


        </>

    )
});

export default AutoCompleteDropDown
