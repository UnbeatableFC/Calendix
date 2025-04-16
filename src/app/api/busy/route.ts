import { nylas } from "@/libs/nylas";
import { ProfileModel } from "@/models/Profile";
import { connect } from "mongoose";
import { NextRequest } from "next/server";
import { TimeSlot } from "nylas";

export async function GET(req:NextRequest) {
    const url = new URL(req.url);
    // const bookingUri = url.searchParams.get("bookingUri");
    const username = url.searchParams.get("username");
    const from = new Date(url.searchParams.get("from") as string);
    const to = new Date(url.searchParams.get("to") as string);

    await connect(process.env.MONGODB_URI as string);
    const profileDoc = await ProfileModel.findOne({ username });

    if (!profileDoc) {
        return Response.json("Invalid Username and/or Booking Uri", { status: 400 });
    }

   const nylasBusyResult =  await nylas.calendars.getFreeBusy({
        identifier : profileDoc.grantId,
        requestBody: {
            emails : [profileDoc.email],
            startTime : Math.round(from.getTime()/1000),
            endTime : Math.round(to.getTime() / 1000)
        }
    })

    let busySlots : TimeSlot[] = []
    if(nylasBusyResult.data?.[0]) {
        //@ts-expect-error // the type should be TimeSlot[]
        const slots = nylasBusyResult.data?.[0]?.timeSlots as TimeSlot[];
        //@ts-expect-error // the type should be TimeSlot[]
        busySlots = slots.filter((slot) => slot.status === "busy");
    }

    return Response.json(busySlots);
}