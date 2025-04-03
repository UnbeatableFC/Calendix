"use client";
import TimeSelect from "@/components/common/TimeSelect";
import { BookingTimes, WeekdayName } from "@/models/EventType";
import clsx from "clsx";
import { useState } from "react";

const weekdaysNames: WeekdayName[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];
const EventForm = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [length, setLength] = useState<number>(30);
  const [bookingTimes, setBookingTimes] = useState<BookingTimes>({});

  function handleBookingTimeChange(
    day: WeekdayName,
    val: string | boolean,
    prop: "from" | "to" | "active"
  ) {
    setBookingTimes((oldBookingTimes) => {
      const newBookingTimes: BookingTimes = {
        ...oldBookingTimes,
      };
      if (!newBookingTimes[day]) {
        newBookingTimes[day] = { from: "00:00", to: "00:00" };
      }
      newBookingTimes[day][prop] = val;
      return newBookingTimes;
    });
  }
  return (
    <form action="" className=" p-2 bg-gray-200 rounded-lg">
      <div>Create New Event Type</div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>
            <span> Title</span>

            <input
              type="text"
              placeholder="Event Type Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            <span> Description</span>
            <textarea
              name="description"
              placeholder="Event Type Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </label>

          <label>
            <span> Event Length (in minutes) </span>
            <input
              type="number"
              placeholder="30"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </label>
        </div>

        <div>
          <span className="label">Availability</span>
          : <br />
          <div className="">
            {weekdaysNames.map((day) => {
              // const from = bookingTimes?.[day]?.from;
              // const to = bookingTimes?.[day]?.to;

              const active = bookingTimes?.[day]?.active;
              return (
                <div
                  className="grid grid-cols-2 gap-2 items-center"
                  key={day}
                >
                  <label className="flex gap-1 !mb-0">
                    <input
                      type="checkbox"
                      className=""
                      value={1}
                      checked={bookingTimes?.[day]?.active}
                      onChange={(e) =>
                        handleBookingTimeChange(
                          day,
                          e.target.checked,
                          "active"
                        )
                      }
                    />
                    {day.toUpperCase()}
                  </label>

                  <div
                    className={clsx(
                      "inline-flex gap-2 items-center ml-2",
                      active ? "" : "opacity-40"
                    )}
                  >
                    <TimeSelect
                      step={30}
                      value={bookingTimes?.[day]?.from || "00:00"}
                      onChange={(val) =>
                        handleBookingTimeChange(day, val, "from")
                      }
                    />
                    <span>-</span>
                    <TimeSelect
                      step={30}
                      value={bookingTimes?.[day]?.to || "00:00"}
                      onChange={(val) =>
                        handleBookingTimeChange(day, val, "to")
                      }
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button className="bg-blue-600 text-white py-2 px-8 rounded-full">
          Save
        </button>
      </div>
    </form>
  );
};

export default EventForm;
