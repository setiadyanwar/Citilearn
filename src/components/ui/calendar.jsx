import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"

function Calendar({
    className,
    classNames,
    showOutsideDays = true,
    captionLayout = "dropdown",
    startMonth = new Date(1945, 0),
    endMonth = new Date(2100, 11),
    ...props
}) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            captionLayout={captionLayout}
            startMonth={startMonth}
            endMonth={endMonth}
            className={cn("p-3 select-none", className)}
            classNames={{
                root: "w-full",

                months: "flex flex-col sm:flex-row gap-4",
                month: "flex flex-col gap-4 w-full relative", // Relative for absolute positioning of nav

                /* Caption: Center the dropdowns */
                month_caption: "flex justify-center items-center h-10 relative z-10 mx-8", // mx-8 to give space for buttons visually
                dropdowns: "flex items-center justify-center gap-1",
                caption_label: "hidden",

                /* Customizing Nav Container to pinch buttons closer to center */
                // We use a specific calc or padding to push buttons inward towards the center title
                // If title is approx 150px wide, we want buttons to be around that area.
                // Best bet: use justify-center and gap

                /* Buttons: Pointer events auto to be clickable */
                button_previous: cn(
                    "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 pointer-events-auto",
                    "border border-slate-200 rounded-md hover:bg-slate-100 flex items-center justify-center transition-all",
                    "relative"
                ),

                button_next: cn(
                    "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 pointer-events-auto",
                    "border border-slate-200 rounded-md hover:bg-slate-100 flex items-center justify-center transition-all",
                    "relative"
                ),

                /* Override to use Center + Gap strategy for Nav with TOP ajustment */
                nav: "absolute top-3 inset-x-0 h-10 flex items-center justify-center gap-[190px] z-20 pointer-events-none",
                // GAP 190px: Adjust this to fit [Button] [ ...~140px Content... ] [Button]

                /* Dropdown Styling */
                dropdown: cn(
                    "appearance-none bg-transparent cursor-pointer p-1 rounded-md",
                    "hover:bg-slate-100 transition-colors",
                    "focus-visible:outline-none",
                    "font-bold text-slate-700 text-sm"
                ),
                dropdown_month: "mr-1",
                dropdown_year: "",

                /* Table Layout */
                month_grid: "w-full border-collapse space-y-1",
                weekdays: "flex mb-2",
                weekday: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] flex justify-center items-center h-9",

                week: "flex w-full mt-2",

                day: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-slate-100/50 [&:has([aria-selected])]:bg-slate-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",

                day_button: cn(
                    "h-9 w-9 p-0 font-normal rounded-md flex items-center justify-center transition-all cursor-pointer",
                    "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                ),

                selected:
                    "[&>button]:bg-primary [&>button]:!text-white [&>button]:rounded-md [&>button]:hover:bg-primary/90 [&>button]:hover:!text-white",

                today: "bg-slate-100 text-primary font-bold",
                outside:
                    "text-muted-foreground opacity-40 aria-selected:bg-slate-100/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
                disabled: "text-muted-foreground opacity-30 cursor-not-allowed text-xs",
                range_middle: "aria-selected:bg-slate-100 aria-selected:text-slate-900",
                hidden: "invisible",

                ...classNames,
            }}
            components={{
                Chevron: ({ orientation }) =>
                    orientation === "left"
                        ? <ChevronLeft className="h-4 w-4 text-slate-600" />
                        : <ChevronRight className="h-4 w-4 text-slate-600" />,
            }}
            {...props}
        />
    )
}
Calendar.displayName = "Calendar"

export { Calendar }
