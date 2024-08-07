import React, { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../../utils/style-utils";



const buttonVarients = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium  hover:opacity-90 m-1 disabled:cursor-not-allowed shadow-inner shadow-white/10 focus:outline-none',
    {
        variants: {
            varient: {
                default: 'bg-gray-200 text-black',
                primary:"bg-primary text-white",
                'primary-square' :'bg-primary text-white rounded-md ',
                'primary-outline-square' :'border-2 border-primary/70 text-primary rounded-md ',
                danger:"bg-red-500 text-white",
                'danger-square' :'bg-red-500 text-white rounded-md ',

                'danger-outline':" border border-red-500 text-red-500",
                'success-outline':" border border-green-500 text-green-500",
                success:"bg-green-500 text-white",
                "primary-full":"bg-primary text-white w-full my-4",
                'primary-outline':'border-2 border-primary/70 text-primary',
                'secondary-outline':'border secondary-primary text-secondary',
            
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
