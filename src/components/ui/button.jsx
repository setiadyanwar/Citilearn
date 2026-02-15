import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]",
    {
        variants: {
            variant: {
                default: "bg-primary text-white hover:bg-primary-dark",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                secondary:
                    "border border-primary bg-white text-primary hover:bg-slate-100",
                link: "text-primary underline underline-offset-2 hover:bg-slate-50 rounded-lg px-2",
                white: "bg-white text-primary border border-slate-100 hover:bg-slate-50",
            },
            size: {
                default: "h-11 px-5 py-2",
                sm: "h-9 rounded-xl px-3",
                lg: "h-12 rounded-xl px-8",
                xl: "h-14 px-8 py-4 text-base",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
        (<Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props} />)
    );
})
Button.displayName = "Button"

export { Button, buttonVariants }
