import { WeekdayName } from "@/models/EventType";

export type BookingTimes = {
  [key in WeekdayName]: {
    active: boolean;
    times: string[];
  };
};

const weekdaysNames: WeekdayName[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export default weekdaysNames;

const weekdaysShortNames: string[] = [
  "mon",
  "tue",
  "wed",
  "thur",
  "fri",
  "sat",
  "sun",
];

export { weekdaysShortNames };
