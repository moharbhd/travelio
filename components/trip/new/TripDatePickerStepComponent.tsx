"use client";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useState } from "react";
import { Label } from "@components/ui/label";
import { useTrip } from "@context/TripContext";

export function TripDatePickerStepComponent() {
  const initialStartDate = new Date();
  const initialEndDate = new Date();
  initialEndDate.setDate(initialEndDate.getDate() + 5);

  const { tripInput, updateTripInput } = useTrip();

  const [startDate, setStartDate] = useState<Date | undefined>(
    tripInput.startDate
  );
  const [endDate, setEndDate] = useState<Date | undefined>(tripInput.endDate);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isEndOpen, setIsEndOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center">
      <Label className="block text-md px-1 font-medium text-gray-700 mb-4">
        What is the date range
      </Label>
      <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:items-center">
        {/* Start Date Picker */}
        <Popover open={isStartOpen} onOpenChange={setIsStartOpen}>
          <PopoverTrigger
            asChild
            className="cursor-pointer border rounded-xl px-4 py-2"
          >
            <Label className="justify-start text-left font-medium text-xl">
              {startDate ? (
                format(startDate, "d MMM, yyyy")
              ) : (
                <span>Pick a date</span>
              )}
            </Label>
          </PopoverTrigger>
          <PopoverContent className="w-auto" align="center">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={(selectedDate) => {
                setStartDate(selectedDate);
                setIsStartOpen(false);
                updateTripInput({
                  startDate: selectedDate,
                });
              }}
            />
          </PopoverContent>
        </Popover>

        <span className="text-md font-normal text-muted-foreground px-2">
          until
        </span>

        {/* End Date Picker */}
        <Popover open={isEndOpen} onOpenChange={setIsEndOpen}>
          <PopoverTrigger
            asChild
            className="cursor-pointer border rounded-xl px-4 py-2"
          >
            <Label className="justify-start text-left font-medium text-xl">
              {endDate ? (
                format(endDate, "d MMM, yyyy")
              ) : (
                <span>Pick a date</span>
              )}
            </Label>
          </PopoverTrigger>
          <PopoverContent className="w-auto" align="center">
            <Calendar
              mode="single"
              selected={endDate}
              hidden={{
                before: startDate ?? initialStartDate,
              }}
              onSelect={(selectedDate) => {
                setEndDate(selectedDate);
                setIsEndOpen(false);
                updateTripInput({
                  endDate: selectedDate,
                });
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
