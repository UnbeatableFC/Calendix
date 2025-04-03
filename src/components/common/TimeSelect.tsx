import React from "react";

const TimeSelect = ({
  step = 30,
  value,
  onChange,
}: {
  step: 30 | 60;
  value: string;
  onChange: (val: string) => void;
}) => {
  const times = [];
  for (let i = 0; i < 24; i++) {
    times.push((i < 10 ? "0" + i : i) + ":00");
    if (step === 30) {
      times.push((i < 10 ? "0" + i : i) + ":30");
    }
  }
  return (
    <div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        title="Select Time"
      >
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
