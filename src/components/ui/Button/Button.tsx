import React, { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../../utils/style-utils";



const buttonVarients = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 hover:opacity-90 m-1 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2',
    {
        variants: {
            varient: {
                default: 'bg-gray-200 text-black hover:bg-gray-300 focus:ring-gray-400',
                primary:"bg-primary text-white text-base font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02] focus:ring-primary/40",
                'primary-square' :'bg-primary text-white rounded-md hover:shadow-lg focus:ring-primary/40',
                'secondary-square' :'bg-secondary text-neutral-700 rounded-md hover:bg-gray-300 focus:ring-gray-400',
                'primary-outline-square' :'border-2 border-primary/70 text-primary rounded-md hover:bg-primary/5 focus:ring-primary/40',
                danger:"bg-red-500 text-white hover:bg-red-600 hover:shadow-lg focus:ring-red-400",
                'danger-square' :'bg-red-500 text-white rounded-md hover:bg-red-600 hover:shadow-lg focus:ring-red-400',
                'danger-outline':'border border-red-500 text-red-500 hover:bg-red-50 focus:ring-red-400',
                'success-outline':'border border-green-500 text-green-500 hover:bg-green-50 focus:ring-green-400',
                success:"bg-green-500 text-white hover:bg-green-600 hover:shadow-lg focus:ring-green-400",
                "primary-full":"bg-primary text-white text-base font-semibold w-full my-4 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02] focus:ring-primary/40",
                'primary-outline':'border-2 border-primary/70 text-primary hover:bg-primary/5 focus:ring-primary/40',
                'secondary-outline':'border secondary-primary text-secondary hover:bg-secondary/5 focus:ring-gray-400',
            
            },
            size: {
                default: "h-16 px-8",
                sm: "py-1 px-4",
                md:"px-3 py-1 text-sm md:text-md md:px-7 md:py-2 ",
                lg: "py-3 px-5",
                icon: "h-10 w-10",
                actionIcon: "h-7 w-7 p-0 m-0",

            },
            
            defaultVariants: {
                variant: "default",
                size: "default",
            },
        }
    }
) 

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVarients> {
    asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, varient, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVarients({ varient, size, className }))}
                ref={ref}
                {...props}
            >
                
                
            </Comp>
        )
    });

export default Button
