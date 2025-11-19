
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
                    "flex h-12 w-full rounded-xl border-2 bg-white px-4 py-3 text-base transition-all duration-200 file:border-0 file:bg-transparent file:pt-[0.34rem] file:text-sm file:font-medium placeholder:text-gray-400 placeholder:capitalize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",
                    className,
                    error ? 'border-red-500 focus-visible:border-red-600 focus-visible:ring-red-200' : 'border-gray-300 hover:border-gray-400 focus-visible:border-primary focus-visible:ring-primary/20'
                )}
                ref={ref}
                {...props}
            />
            {error && <p className='text-red-600 ml-1 mt-1.5 text-xs text-left font-medium'>{error}</p>}
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };