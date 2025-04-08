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
    username: props.params.username,
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
    <div
      className="min-h-dvh bg-gray-200"
      style={{ backgroundImage:  'url('/background.jpg')' }}
    >
      <div className="bg-white"></div>
    </div>
  );
};

export default BookingPage;
