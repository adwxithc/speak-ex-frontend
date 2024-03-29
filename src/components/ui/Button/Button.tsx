import React, { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../../utils/style-utils";


const buttonVarients = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium  hover:opacity-90 m-1',
    {
        variants: {
            varient: {
                default: 'bg-gray-200 text-black',
                primary:
                    "bg-primary text-white"
            },
            size: {
                default: "h-16 px-8",
                sm: "h-9 rounded-full px-4",
                lg: "h-14 px-8",
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
