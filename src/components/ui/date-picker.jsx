"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker({ date, setDate, placeholder = "Pick a date", className, disabled }) {
    const parsedDate = date ? new Date(date) : undefined;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    disabled={disabled}
                    className={cn(
                        "w-full justify-start text-left font-medium h-12 rounded-xl border-slate-200 bg-white hover:bg-slate-50 transition-all shadow-none",
                        !parsedDate && "text-tertiary",
                        parsedDate && "text-main",
                        className
                    )}
                >
                    <CalendarIcon className={cn("mr-2.5 h-4 w-4", !parsedDate ? "text-tertiary" : "text-primary/60")} />
                    {parsedDate ? format(parsedDate, "dd/MM/yyyy") : <span className="text-tertiary">{placeholder}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 border-slate-100 shadow-sm" align="start">
                <Calendar
                    mode="single"
                    selected={parsedDate}
                    defaultMonth={parsedDate}
                    onSelect={setDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
