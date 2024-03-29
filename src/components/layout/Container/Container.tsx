import { cn } from "../../../utils/style-utils";
import React from "react";

const Container = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return <div className={cn("container mx-auto px-4 py-2", className)}>{children}</div>;
};

export default Container;