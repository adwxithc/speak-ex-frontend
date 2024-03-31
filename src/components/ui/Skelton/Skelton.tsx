import { cn } from "../../../utils/style-utils";

function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-[#18181B]", className)}
            {...props}
        />
    );
}

export { Skeleton };