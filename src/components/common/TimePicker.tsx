"use client";
import { WeekdayName } from "@/models/EventType";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { weekdaysShortNames, BookingTimes } from "@/libs/shared";
import { useState } from "react";
import {
  addDays,
  addMonths,
  format,
  isFuture,
  isLastDayOfMonth,
  isToday,
  subMonths,
} from "date-fns";
import clsx from "clsx";

const TimePicker = ({
  bookingTimes,
}: {
  bookingTimes: BookingTimes;
}) => {
  const currentDate = new Date();

  function prevMonth() {
    setActiveCalendarDate((prev) => {
      const newActiveCalenderDate = subMonths(prev, 1);
      setActiveMonthIndex(newActiveCalenderDate.getMonth());
      setActiveYear(newActiveCalenderDate.getFullYear());
      return newActiveCalenderDate;
    });
  }
  function nextMonth() {
    setActiveCalendarDate((prev) => {
      const newActiveCalenderDate = addMonths(prev, 1);
      setActiveMonthIndex(newActiveCalenderDate.getMonth());
      setActiveYear(newActiveCalenderDate.getFullYear());
      return newActiveCalenderDate;
    });
  }

  const [activeCalendarDate, setActiveCalendarDate] =
    useState(currentDate);
  const [activeMonthIndex, setActiveMonthIndex] = useState(
    currentDate.getMonth()
  );
  const [activeYear, setActiveYear] = useState(
    activeCalendarDate.getFullYear()
  );
  const firstDayOfActiveMonth = new Date(
    activeYear,
    activeMonthIndex,
    1
  );
  const firstDayOfCurrentMonthWeekdayIndex =
    firstDayOfActiveMonth.getDay();
  const emptyDaysCount =
    firstDayOfCurrentMonthWeekdayIndex === 0
      ? 6
      : firstDayOfCurrentMonthWeekdayIndex - 1;

  const emptyDaysArr = new Array(emptyDaysCount).fill(
    "",
    0,
    emptyDaysCount
  );

  const daysNumber = [firstDayOfActiveMonth.getDate()];
  do {
    const lastAddedDay = daysNumber[daysNumber.length - 1];
    daysNumber.push(addDays(lastAddedDay, 1).getDate());
  } while (!isLastDayOfMonth(daysNumber[daysNumber.length - 1]));

  return (
    <div className="flex gap-4">
      <div className="">
        <div className="flex items-center">
          <span className="grow">
            {format(firstDayOfActiveMonth, "MMMM")} {activeYear}{" "}
          </span>
          <button onClick={prevMonth} title="Previous Month">
            <ChevronLeft />
          </button>
          <button onClick={nextMonth} title="Next Month">
            <ChevronRight />
          </button>
        </div>
        <div className="inline-grid grid-cols-7 gap-2 mt-2">
          {weekdaysShortNames.map((weekdayShortName, index) => (
            <div
              key={index}
              className="text-center uppercase text-sm text-gray-500 font-bold "
            >
              {weekdayShortName}
            </div>
          ))}

          {emptyDaysArr.map((e, index) => (
            <div key={index}></div>
          ))}

          {daysNumber.map((day, index) => {
            const weekdayNameIndex = format(
              day,
              "EEEE"
            ).toLowerCase() as WeekdayName;
            const weekdayConfig = bookingTimes?.[weekdayNameIndex];
            const isActiveInBookingTimes = weekdayConfig?.active;

            const canBeBooked =
              isFuture(day) && isActiveInBookingTimes;

            return (
              <div
                key={index}
                className="text-center text-sm text-gray-400 font-bold "
              >
                <button
                  className={clsx(
                    " w-8 h-8 rounded-full inline-flexflex items-center justify-center" +
                      canBeBooked
                      ? "bg-blue-200 text-blue-700"
                      : "",
                    isToday(day) && " bg-gray-200 text-gray-600"
                  )}
                >
                  {format(day, "d")}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="border border-black">Times</div>
    </div>
  );
};

export default TimePicker;
