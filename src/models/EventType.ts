import { model, models, Schema } from "mongoose";

const FromToSchema = new Schema({
  from: String,
  to: String,
  
});

export type FromTo = {
  from: string;
  to: string;
  active: boolean
};

const BookingSchema = new Schema<Record<WeekdayName, FromTo>>({
  monday: FromToSchema,
  tuesday: FromToSchema,
  wednesday: FromToSchema,
  thursday: FromToSchema,
  friday: FromToSchema,
  saturday: FromToSchema,
  sunday: FromToSchema,
});

const EventTypeSchema = new Schema<EventType>(
  {
    email: String,
    title: String,
    description: String,
    length: Number,
    bookingTimes: BookingSchema,
  },
  {
    timestamps: true,
  }
);

export type WeekdayName =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type BookingTimes = {} | Record<WeekdayName, FromTo>;

export type EventType = {
  email: string;
  title: string;
  description: string;
  length: number;
  bookingTimes: BookingTimes;
};

export const EventTypeModel =
  models?.EventType || model<EventType>("EventType", EventTypeSchema);
