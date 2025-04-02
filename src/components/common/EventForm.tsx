import React from "react";
import TimeSelect from "@/components/common/TimeSelect";

const WeekdaysNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const EventForm = () => {
  return (
    <form
      action=""
      className=" p-2 bg-gray-200 rounded-lg"
    >
      <div>Create New Event Type</div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>
            <span> Title</span>

            <input type="text" placeholder="Event Type Name" />
          </label>
          <label>
            <span> Description</span>
            <textarea
              name="description"
              placeholder="Event Type Description"
              id=""
            ></textarea>
          </label>

          <label>
            <span> Event Lenght (in minutes) </span>
            <input type="number" placeholder="30" />
          </label>
        </div>

        <div>
          <span className="label">Availability</span>
          : <br />
          <div className="grid grid-cols-2 gap-2 items-center">
            {WeekdaysNames.map((day) => (
              <>
                {day}
                <div className="inline-flex gap-2 items-center ml-2">
                  <TimeSelect step={30} />
                  <span>-</span>
                  <TimeSelect step={30} />
                </div>
              </>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
            <button>Save</button>
      </div>
    </form>
  );
};

export default EventForm;
