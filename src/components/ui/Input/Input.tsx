
import React from 'react'
import { cn } from "../../../utils/style-utils";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
        error?:string;
    }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type,error, ...props }, ref) => {
        return (
            <div className='flex flex-col items-start w-full'>
            <input
                type={type}
                className={cn(
                    "flex  h-12 w-full rounded-md border border-input bg-background px-3 py-2 border-black/25   file:border-0 file:bg-transparent file:pt-[0.34rem]  file:text-sm file:font-medium placeholder:text-black/50 placeholder:capitalize  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    className,`${error&&'border-red-600 hover:border-red-600 '}`
                )}
                ref={ref}
                {...props}
            />
            <p className='text-red-600 ml-4 mt-1  text-xs text-left'>{error}</p>
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };