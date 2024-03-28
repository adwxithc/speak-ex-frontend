import { cn } from "../../../utils/style-utils";
import React from "react";

const Container = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return <div className={cn("container", className)}>{children}</div>;
};

export default Container;