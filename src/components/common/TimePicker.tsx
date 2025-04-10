import { BookingTimes } from "@/models/EventType";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

const TimePicker = ({
  bookingTimes,
}: {
  bookingTimes: BookingTimes;
}) => {
  return (
    <div className="flex gap-4">
      <div className="grow">
        <div className="flex items-center">
        <span className="grow">April 2025</span>
        <button><ChevronLeft /></button>
        <button><ChevronRight /></button>
        </div>
      </div>
      <div className="border border-black">Times</div>
    </div>
  );
};

export default TimePicker;
