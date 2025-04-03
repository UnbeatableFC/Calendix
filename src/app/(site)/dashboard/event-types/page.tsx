"use server";
import DashboardNav from "@/components/common/DashboardNav";

import { session } from "@/libs/session";
import { EventTypeModel } from "@/models/EventType";
import { PlusIcon } from "lucide-react";
import { connect } from "mongoose";
import Link from "next/link";
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
      <Link
        className="btn-gray"
        href="/dashboard/event-types/new"
      >
        <PlusIcon size={16} />
        New Event Type
      </Link>
    </div>
  );
};

export default EventTypesPage;
