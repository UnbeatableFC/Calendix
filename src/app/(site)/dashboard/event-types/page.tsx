"use server";
import { session } from "@/libs/session";
import { EventTypeModel } from "@/models/EventType";
import { ProfileModel } from "@/models/Profile";
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
  const profile = await ProfileModel.findOne({ email });
  return (
    <div>
      <div className="border border-b-0 rounded-xl my-4 overflow-hidden">
        {eventTypes.map((eventType, index) => (
          <div key={index} className="block border-b p-2">
            <Link
              href={"/dashboard/event-types/edit/" + eventType._id}
            >
              {eventType.title}
            </Link>
            <span className="text-gray-400 ml-4 text-sm">
              {process.env.NEXT_PUBLIC_URL}/{profile.username}/
              {eventType.uri}
            </span>
          </div>
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
