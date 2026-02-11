import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const inputVariants = cva(
    "flex w-full rounded-xl border border-input bg-background font-medium transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-tertiary placeholder:font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary/30 disabled:cursor-not-allowed disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "border-input",
                filled: "bg-citilink-gray border-transparent focus:bg-white",
            },
            size: {
                default: "h-11 px-4 py-3 text-sm",
                sm: "h-9 px-3 py-2 text-xs",
                lg: "h-12 px-5 py-3 text-base",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

const Input = React.forwardRef(({ className, type, variant, size, icon: Icon, ...props }, ref) => {
    return (
        <div className="relative w-full group">
            {Icon && (
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-tertiary group-focus-within:text-primary transition-colors">
                    <Icon size={18} />
                </div>
            )}
            <input
                type={type}
                className={cn(
                    inputVariants({ variant, size, className }),
                    Icon && "pl-11"
                )}
                ref={ref}
                {...props}
            />
        </div>
    );
})
Input.displayName = "Input"

export { Input }
