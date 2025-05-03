"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { createDPICS } from "@/app/actions/fetchSpecialTime";
import { useQueryClient } from "@tanstack/react-query";


type DPICSSkills = {
  praise: number | "";
  describe: number | "";
  reflection: number | "";
  command: number | "";
  question: number | "";
  negativeTalk: number | "";
};

export function AddDpicsDialog({
  caregiverId,
  onSave,
}: {
  caregiverId: string;
  onSave?: (date: Date) => void; // Pass back selected date
}) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const [skills, setSkills] = useState<DPICSSkills>({
    praise: "",
    describe: "",
    reflection: "",
    command: "",
    question: "",
    negativeTalk: "",
  });

  const [date, setDate] = useState<Date | undefined>();
  const [loading, setLoading] = useState(false);

  const handleChange = (key: keyof DPICSSkills, value: string) => {
    setSkills((prev) => ({
      ...prev,
      [key]: value === "" ? "" : Number(value),
    }));
  };

  const handleSave = async () => {
    if (!date) return alert("Please select a date.");
    setLoading(true);

    await createDPICS(caregiverId, date, {
      praise: Number(skills.praise) || 0,
      describe: Number(skills.describe) || 0,
      reflection: Number(skills.reflection) || 0,
      command: Number(skills.command) || 0,
      question: Number(skills.question) || 0,
      negativeTalk: Number(skills.negativeTalk) || 0,
    });

    await queryClient.invalidateQueries({
      queryKey: ["specialtimes", caregiverId],
    });
    
    setLoading(false);

    setSkills({
      praise: "",
      describe: "",
      reflection: "",
      command: "",
      question: "",
      negativeTalk: "",
    });
    setDate(undefined);
    setOpen(false);
    onSave?.(date);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" onClick={() => setOpen(true)}>
          <span className="block sm:hidden text-xl">+</span>
          <span className="hidden sm:inline">+ Add Special Time</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter DPICS Skill Counts</DialogTitle>
        </DialogHeader>

        <div className="grid gap-2 sm:gap-4 py-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Session Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", {
                    "text-muted-foreground": !date,
                  })}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "yyyy-MM-dd") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {Object.entries(skills).map(([key, value]) => (
            <div key={key} className="flex flex-col gap-1">
              <label className="text-sm capitalize">{key}</label>
              <Input
                type="number"
                value={value}
                onChange={(e) => handleChange(key as keyof DPICSSkills, e.target.value)}
              />
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
