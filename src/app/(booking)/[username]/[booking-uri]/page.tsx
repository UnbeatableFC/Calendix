import TimePicker from "@/components/common/TimePicker";
import { EventTypeModel } from "@/models/EventType";
import { ProfileModel } from "@/models/Profile";
import { connect } from "mongoose";
import React from "react";

type PageProps = {
  params: {
    username: string;
    "booking-uri": string;
  };
};

const BookingPage = async (props: PageProps) => {
  await connect(process.env.MONGODB_URI as string);
  const profileDoc = await ProfileModel.findOne({
    username: props.params?.username,
  });
  if (!profileDoc) {
    return 404;
  }
  const etDoc = await EventTypeModel.findOne({
    email: profileDoc.email,
    uri: props.params?.["booking-uri"],
  });
  if (!etDoc) {
    return 404;
  }
  return (
    <TimePicker
      username={props.params.username}
      meetingUri={etDoc.uri}
      length={etDoc.length}
      bookingTimes={JSON.parse(JSON.stringify(etDoc.bookingTimes))}
    />
  );
};

export default BookingPage;
