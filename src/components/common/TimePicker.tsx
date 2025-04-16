"use client";
import { WeekdayName } from "@/models/EventType";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { weekdaysShortNames, BookingTimes } from "@/libs/shared";
import { useEffect, useState } from "react";
import {
  addDays,
  addMinutes,
  addMonths,
  endOfDay,
  format,
  isAfter,
  isBefore,
  isEqual,
  isFuture,
  isLastDayOfMonth,
  isToday,
  startOfDay,
  subMonths,
} from "date-fns";
import clsx from "clsx";
import Link from "next/link";
import axios from "axios";
import { TimeSlot } from "nylas";
import { HashLoader } from "react-spinners";

const TimePicker = ({
  bookingTimes,
  length,
  username,
  meetingUri,
}: {
  bookingTimes: BookingTimes;
  length: number;
  username: string;
  meetingUri: string;
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
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [busySlots, setBusySlots] = useState<TimeSlot[]>([]);
  const [busySlotsLoaded, setBusySlotsLoaded] = useState(false);

  useEffect(() => {
    if (selectedDay) {
      setBusySlots([]);
      setBusySlotsLoaded(false);
      const params = new URLSearchParams();
      params.set("username", username);
      params.set("from", startOfDay(selectedDay).toISOString());
      params.set("to", endOfDay(selectedDay).toISOString());
      axios.get(`/api/busy?` + params.toString()).then((res) => {
        setBusySlots(res.data);
        setBusySlotsLoaded(true);
      });
    }
  }, [selectedDay]);

  function withinBusySlots(time: Date) {
    const bookingFrom = time;
    const bookingTo = addMinutes(new Date(time), length);

    for (const busySlot of busySlots) {
      const busyFrom = new Date(parseInt(busySlot.startTime) * 1000);
      const busyTo = new Date(parseInt(busySlot.endTime) * 1000);
      if (
        isAfter(bookingTo, busyFrom) &&
        isBefore(bookingTo, busyTo)
      ) {
        return true;
      }
      if (
        isAfter(bookingFrom, busyFrom) &&
        isBefore(bookingFrom, busyTo)
      ) {
        return true;
      }
      if (isEqual(bookingFrom, busyFrom)) {
        return true;
      }
      if (isEqual(bookingTo, busyTo)) {
        return true;
      }
    }
    return false;
  }

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

  const daysNumber = [firstDayOfActiveMonth];
  do {
    const lastAddedDay = daysNumber[daysNumber.length - 1];
    daysNumber.push(addDays(lastAddedDay, 1));
  } while (!isLastDayOfMonth(daysNumber[daysNumber.length - 1]));

  let selectedDayConfig = null;
  const bookingHours = [];
  if (selectedDay) {
    const weekdayNameIndex = format(
      selectedDay,
      "EEEE"
    ).toLowerCase() as WeekdayName;
    selectedDayConfig = bookingTimes?.[weekdayNameIndex];
    if (selectedDayConfig) {
      const [hoursFrom, minutesFrom] =
        selectedDayConfig.from.split(":");
      const selectedDayFrom = new Date(selectedDay);
      selectedDayFrom.setHours(parseInt(hoursFrom));
      selectedDayFrom.setMinutes(parseInt(minutesFrom));

      const [hoursTo, minutesTo] = selectedDayConfig.to.split(":");
      const selectedDayTo = new Date(selectedDay);
      selectedDayTo.setHours(parseInt(hoursTo));
      selectedDayTo.setMinutes(parseInt(minutesTo));
      let a = selectedDayFrom;
      do {
        if (!withinBusySlots(a)) {
          bookingHours.push(a);
        }
        a = addMinutes(a, 30);
      } while (isBefore(addMinutes(a, length), selectedDayTo));
    }
  }
  function handleDayClicked(day: Date) {
    setSelectedDay(day);
  }

  return (
    <div className="flex gap-4">
      <div className="p-8">
        <div className="flex items-center">
          <span className="grow text-center">
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
                  disabled={!canBeBooked}
                  onClick={() => handleDayClicked(day)}
                  className={clsx(
                    "w-8 h-8 inline-flex  rounded-full items-center justify-center ",
                    canBeBooked
                      ? "bg-blue-100 text-blue-700 cursor-pointer"
                      : "",
                    selectedDay && isEqual(day, selectedDay)
                      ? "bg-blue-500 text-white cursor-pointer"
                      : "",
                    isToday(day) ? "bg-gray-200 text-gray-500" : ""
                  )}
                >
                  {format(day, "d")}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      {selectedDay && (
        <div className=" mr-2 pt-8 pb-4 pl-2 pr-4 overflow-y-scroll">
          <p className="">{format(selectedDay, "EEEE, MMMM d")}</p>
          <div className="grid gap-1 mt-2 max-h-56">
            {!busySlotsLoaded && (
              <div className="flex justify-center py-4">
                <HashLoader size={40} color="#3882f6" />
              </div>
            )}
            {busySlotsLoaded &&
              bookingHours.map((bookingTime, index) => (
                <div key={index}>
                  <Link
                    href={`/${username}/${meetingUri}/${bookingTime.toISOString()}`}
                    className="w-full block border-2 border-blue-600 rounded-lg text-blue-600 font-semibold cursor-pointer text-sm text-center"
                  >
                    {format(bookingTime, "HH:mm a")}
                  </Link>
                </div>
              ))}
            <div className="mb-8">&nbsp;</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePicker;
