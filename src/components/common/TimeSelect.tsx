import React from "react";

const TimeSelect = ({ step = 30 }: { step: 30 | 60 }) => {
  const times = [];
  for (let i = 0; i < 24; i++) {
    times.push((i < 10 ? "0" + i : i) + ":00");
    if(step===30) {
      times.push((i < 10 ? "0" + i : i) + ":30");
    }
  }
  return (
    <div>
      <select>
        {times.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimeSelect;
