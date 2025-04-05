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
      <div className="border border-b-0 rounded-xl my-4 overflow-hidden">
        {eventTypes.map((eventType, index) => (
          <Link
            href={"/dashboard/event-types/edit/" + eventType._id}
            key={index}
            className="block border-b p-2"
          >
            {eventType.title}
          </Link>
        ))}
      </div>
      <Link className="btn-gray" href="/dashboard/event-types/new">
        <PlusIcon size={16} />
        New Event Type
      </Link>
    </div>
  );
};

export default EventTypesPage;
