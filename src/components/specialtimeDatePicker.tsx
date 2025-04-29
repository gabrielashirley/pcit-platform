"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useQuery } from "@tanstack/react-query";
import { fetchSpecialTimes } from "@/app/actions/fetchSpecialTime";

export function SpecialTimePicker({ 
  caregiverId, 
  onDateSelect 
}: { 
  caregiverId: string;
  onDateSelect?: (date: Date | undefined) => void;
}) {
  const [date, setDate] = React.useState<Date>();
  const [open, setOpen] = React.useState(false);

  const { data: specialTimes, isLoading } = useQuery({
    queryKey: ["specialtimes", caregiverId],
    queryFn: () => fetchSpecialTimes(caregiverId),
  });

  if (isLoading) return <div>Loading...</div>;

  const allowedDates = new Set(
    specialTimes?.map((st) => format(new Date(st.createdAt), "yyyy-MM-dd"))
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(pickedDate) => {
            if (!pickedDate) return;
            const formatted = format(pickedDate, "yyyy-MM-dd");
            if (allowedDates.has(formatted)) {
              setDate(pickedDate);
              setOpen(false);
              onDateSelect?.(pickedDate);
            }
          }}
          disabled={(pickedDate) => {
            const formatted = format(pickedDate, "yyyy-MM-dd");
            return !allowedDates.has(formatted);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
