"use client";
import axios from "axios";
import { format } from "date-fns";
import { FormEvent, useState } from "react";

type PageProps = {
  params: {
    username: string;
    "booking-uri": string;
    "booking-time": string;
  };
};

const BookingFormPage = (props: PageProps) => {
  const username = props.params.username;
  const bookingUri = props.params["booking-uri"];
  const bookingTime = new Date(
    decodeURIComponent(props.params["booking-time"])
  );

  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestNotes, setGuestNotes] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  async function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    const data = {
      guestName,
      guestEmail,
      guestNotes,
      username,
      bookingUri,
      bookingTime,
    };
    await axios.post("/api/bookings", data);
    setConfirmed(true);
  }
  return (
    <div className="text-left p-8">
      <h2 className="text-2xl text-gray-500 font-bold mb-2 border-b border-black/10 pb-2">
        {format(bookingTime, "EEEE , MMMM d, HH:mm")}
      </h2>
      {confirmed && (
        <div>
          Thanks for your booking! We will send you a confirmation
          email.
        </div>
      )}

      {!confirmed && (
        <div>
          <form onSubmit={handleFormSubmit} action="">
            <label htmlFor="">
              <span>Your Name</span>
              <input
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                type="text"
                placeholder="John Doe"
              />
            </label>
            <label htmlFor="">
              <span>Your Email</span>
              <input
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                type="email"
                placeholder="test@email.com"
              />
            </label>
            <label htmlFor="">
              <span>Any Additional Info?</span>
              <textarea
                value={guestNotes}
                onChange={(e) => setGuestNotes(e.target.value)}
                placeholder="Any relevant Informantion (optional)"
              ></textarea>
            </label>
            <div className="text-right">
              <button type="submit" className="btn-blue">
                Confirm
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default BookingFormPage;
