import React from "react";

type PageProps = {
  params: {
    username: string;
    "meeting-uri": string;
    "booking-time": string;
  };
};

const BookingFormPage = (props: PageProps) => {
  const username = props.params.username;
  const meetingUri = props.params["meeting-uri"];
  const bookingTime = decodeURIComponent(
    props.params["booking-time"]
  );
  return <div></div>;
};

export default BookingFormPage;
