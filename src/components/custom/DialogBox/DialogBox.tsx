import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import React,{ Dispatch, SetStateAction } from 'react'
import { cn } from '../../../utils/style-utils';

interface IDialogBoxProps {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    title?:string;
    children:React.ReactNode,
    onClose:()=>void
    className?:string
}
function DialogBox({ isOpen,children,onClose,title,className }: IDialogBoxProps) {

    return (
        <>
            <Transition appear show={isOpen}>
                
                <Dialog as="div" className="relative z-20 focus:outline-none" onClose={onClose}>
                <TransitionChild
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-50 " aria-hidden="true" />
                    </TransitionChild>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
                        <div className="flex min-h-full items-center justify-center p-4 ">
                            
                            <TransitionChild
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 transform-[scale(95%)]"
                                enterTo="opacity-100 transform-[scale(100%)]"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 transform-[scale(100%)]"
                                leaveTo="opacity-0 transform-[scale(95%)]"
                            >
                                <DialogPanel className={cn("w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl shadow ",className)}>
                                    <DialogTitle as="h3" className="text-base/7 font-medium text-black">
                                       {title}
                                    </DialogTitle>
                                 
                                        {children}
                                
                                   
                                </DialogPanel>
                            </TransitionChild>
                            
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default DialogBox
