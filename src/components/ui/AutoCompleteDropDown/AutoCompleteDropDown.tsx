
import { ChevronDown, Search, X } from "lucide-react"
import React, { useEffect, useState } from "react"
import { cn } from "../../../utils/style-utils";


interface IAutoCompleteDropDownProp extends React.HTMLAttributes<HTMLDivElement> {
    list: {
        label: string,
        value: string,
        selected: boolean
    }[],
    onItemSelect: (item: string) => void,
    selectedValue?: string
    editMode: boolean
    dropdownId: string
    openDropdownId: string | null
    setOpenDropdownId: (id: string | null) => void

}

const AutoCompleteDropDown = React.forwardRef<HTMLDivElement, IAutoCompleteDropDownProp>(({ list, className, onItemSelect, selectedValue, editMode, dropdownId, openDropdownId, setOpenDropdownId, ...props }, ref) => {


    const [inputValue, setInputValue] = useState('')
    const [selected, setSelected] = useState('')
    const open = openDropdownId === dropdownId


    useEffect(() => {
        setSelected(list.find(item => item.value == selectedValue)?.label || '')
    }, [list, selectedValue])

    const clearSelection = (e: React.MouseEvent) => {
        e.stopPropagation()
        setSelected('')
        onItemSelect('')
    }

    return (
        <>

            <div className={cn(`relative border-2 rounded-xl overflow-visible transition-all duration-300 ${editMode
                    ? 'bg-white border-indigo-300 shadow-sm hover:shadow-md cursor-pointer'
                    : 'bg-gray-100 border-gray-200 cursor-not-allowed'
                } ${open && editMode ? 'ring-2 ring-indigo-500/20 border-indigo-400' : ''}`, className)} ref={ref} {...props}>

                <div
                    onClick={() => {
                        if (editMode) {
                            setOpenDropdownId(open ? null : dropdownId)
                            setInputValue('')
                        }
                    }}
                    className={`flex items-center p-3 justify-between min-h-[48px] ${!selected && 'text-gray-400'} ${editMode ? 'hover:bg-indigo-50/50' : ''} transition-colors rounded-lg`}>
                    <div className="flex items-center gap-2 w-full">
                        <span className={`font-medium truncate ${selected ? 'text-gray-800' : 'text-gray-400 italic'}`}>
                            {selected ? (selected.length > 25 ? selected.substring(0, 20) + '...' : selected) : 'Select a language'}
                        </span>
                        {(selected && editMode) && (
                            <button
                                type="button"
                                className="ml-auto p-1 hover:bg-red-100 rounded-full transition-colors text-gray-500 hover:text-red-600"
                                onClick={clearSelection}
                                aria-label="Clear selection"
                            >
                                <X size={18} />
                            </button>
                        )}
                    </div>
                    <ChevronDown className={`text-gray-500 transition-transform duration-300 flex-shrink-0 ml-2 ${open && editMode && 'rotate-180 text-indigo-600'}`} size={20} />
                </div>


                {open && editMode && (
                    <ul className="z-[9999] mt-2 bg-white border-2 border-indigo-200 rounded-xl shadow-xl overflow-hidden max-h-64 overflow-y-auto pretty-scrollbar animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="flex items-center gap-2 px-3 py-2 sticky top-0 bg-gradient-to-r from-indigo-50 to-purple-50 border-b-2 border-indigo-100 z-10">
                            <Search className="text-indigo-600 flex-shrink-0" size={20} />
                            <input
                                type="text"
                                className="flex-1 p-2 outline-none bg-transparent placeholder:text-gray-400 text-gray-800 font-medium"
                                placeholder="Search language..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                autoFocus
                            />
                            {inputValue && (
                                <button
                                    type="button"
                                    className="p-1 hover:bg-indigo-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                                    onClick={() => setInputValue('')}
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>

                        <div className="py-1">
                            {
                                list.filter(item => !item?.selected && item.label.toLowerCase().includes(inputValue.toLowerCase()))
                                    .map((item) => (
                                        <li
                                            key={item.value}
                                            className={`px-4 py-3 text-sm font-medium cursor-pointer transition-all duration-150 flex items-center justify-between group
                                            ${item.label.toLowerCase() === selected.toLowerCase()
                                                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                                                    : 'hover:bg-indigo-50 text-gray-700 hover:text-indigo-900'
                                                }`}
                                            onClick={() => {
                                                if (item.label.toLowerCase() !== selected.toLowerCase()) {
                                                    setSelected(item.label)
                                                    onItemSelect(item.value)
                                                    setOpenDropdownId(null)
                                                    setInputValue('')
                                                }
                                            }}
                                        >
                                            <span>{item.label}</span>
                                            {item.label.toLowerCase() === selected.toLowerCase() && (
                                                <span className="text-white">✓</span>
                                            )}
                                        </li>
                                    ))
                            }
                            {list.filter(item => !item?.selected && item.label.toLowerCase().includes(inputValue.toLowerCase())).length === 0 && (
                                <li className="px-4 py-8 text-center text-gray-400 italic text-sm">
                                    No languages found
                                </li>
                            )}
                        </div>
                    </ul>
                )}


            </div>


        </>

    )
});

export default AutoCompleteDropDown
