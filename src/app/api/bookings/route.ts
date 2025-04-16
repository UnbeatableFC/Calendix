import { nylas } from "@/libs/nylas";
import { BookingModel } from "@/models/Booking";
import { EventType, EventTypeModel } from "@/models/EventType";
import { Profile, ProfileModel } from "@/models/Profile";
import { addMinutes } from "date-fns";
import { connect } from "mongoose";
import { NextRequest } from "next/server";
import { WhenType } from "nylas";

type JsonData = {
  guestName: string;
  guestEmail: string;
  guestNotes: string;
  bookingTime: string;
  username: string;
  bookingUri: string;
};
export async function POST(req: NextRequest) {
  const data: JsonData = await req.json();
  const { guestName, guestEmail, guestNotes, bookingTime } = data;
  await connect(process.env.MONGODB_URI as string);
  const profileDoc: Profile | null = await ProfileModel.findOne({
    username: data.username,
  });
  if (!profileDoc) {
    return Response.json("Invalid Username", { status: 400 });
  }
  const eventDoc: EventType | null = await EventTypeModel.findOne({
    email: profileDoc.email,
    uri: data.bookingUri,
  });
  if (!eventDoc) {
    return Response.json("Invalid Url", { status: 404 });
  }
  await BookingModel.create({
    guestName,
    guestEmail,
    guestNotes,
    when: bookingTime,
    eventTypeId: eventDoc._id,
  });

  //create in calender
  const grantId = profileDoc.grantId;
  const startDate = new Date(bookingTime);
  await nylas.events.create({
    identifier: grantId,
    requestBody: {
      title: eventDoc.title,
      description: eventDoc.description,
      when: {
        startTime: Math.round(startDate.getTime() / 1000),
        endTime: Math.round(
          addMinutes(startDate, eventDoc.length).getTime() / 1000
        ),
        object: WhenType.Datespan,
      },

      conferencing: {
        autocreate: {},
        provider: "Google Meet",
      },
      participants: [
        {
          name: guestName,
          email: guestEmail,
          status: "yes",
        },
      ],
    },
    queryParams: {
      calendarId: eventDoc.email,
    },
  });

  return Response.json(true, { status: 201 });
}
