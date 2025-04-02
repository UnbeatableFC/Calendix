"use server";
import DashboardNav from "@/components/common/DashboardNav";
import EventForm from "@/components/common/EventForm";
import { session } from "@/libs/session";
import { EventTypeModel } from "@/models/EventType";
import { connect } from "mongoose";
import React from "react";

const EventTypesPage = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error(
      "MONGODB_URI is not defined in the environment variables."
    );
  }
  await connect(process.env.MONGODB_URI);
  const email = await session().get("email");
  const eventTypes = await EventTypeModel.find({ email });
  return (
    <div>
      <DashboardNav />
      {JSON.stringify(eventTypes)}
      <EventForm />
    </div>
  );
};

export default EventTypesPage;
