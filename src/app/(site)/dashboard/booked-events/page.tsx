import { session } from "@/libs/session";
import { BookingModel } from "@/models/Booking";
import { EventTypeModel } from "@/models/EventType";
import { connect } from "mongoose";
import React from "react";
import { format } from "date-fns";
import { Calendar, NotepadText, User } from "lucide-react";

const BookedEventsPage = async () => {
  await connect(process.env.MONGODB_URI as string);
  const email = await session().get("email");
  const eventTypeDocs = await EventTypeModel.find({ email });
  const bookedEvents = await BookingModel.find(
    {
      eventTypeId: eventTypeDocs.map((doc) => doc._id),
    },
    {},
    { sort: "when" }
  );
  return (
    <div>
      <div>Booked Events listed here...</div>
      <div className="mt-8 ">
        {bookedEvents.map((booking, index) => {
          const eventTypeDoc = eventTypeDocs.find(
            (doc) => doc._id == booking.eventTypeId
          );
          return (
            <div key={index} className="p-4 border-b bg-gray-100">
              <h3 className="text-lg text-gray-700 font-semibold">
                {eventTypeDoc.title}
              </h3>
              <div className="flex items-center gap-2 my-1">
                <User size={16} />
                <span>{booking.guestName}</span>
                <span className="ml-2 text-gray-500">
                  {booking.guestEmail}
                </span>
              </div>
              <div className="flex items-center gap-2 my-1">
                <Calendar size={16} />
                <span>
                  {format(booking.when, "EEEE , MMMM d, HH:mm")}
                </span>
              </div>
              <div className="flex items-center gap-2 my-1">
                <NotepadText size={16} />
                <span>
                  {booking.guestNotes ? booking.guestNotes : "No notes"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookedEventsPage;
