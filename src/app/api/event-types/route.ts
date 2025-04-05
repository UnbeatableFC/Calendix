import { session } from "@/libs/session";
import { EventTypeModel } from "@/models/EventType";
import { connect } from "mongoose";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  if (!process.env.MONGODB_URI) {
    throw new Error(
      "MONGODB_URI is not defined in the environment variables."
    );
  }
  await connect(process.env.MONGODB_URI as string);
  const data = await req.json();
  const email = await session().get("email");
  if (email) {
    const eventTypeDoc = await EventTypeModel.create({
      email,
      ...data,
    });
    revalidatePath("/dashboard/event-types");
    return Response.json(eventTypeDoc);
  }

  return Response.json(false);
}
export async function PUT(req: NextRequest) {
  if (!process.env.MONGODB_URI) {
    throw new Error(
      "MONGODB_URI is not defined in the environment variables."
    );
  }
  await connect(process.env.MONGODB_URI as string);
  const data = await req.json();
  const email = await session().get("email");
  const id = data.id;
  if (email && id) {
    const eventTypeDoc = await EventTypeModel.updateOne(
      { email, _id: id },

      data
    );
    return Response.json(eventTypeDoc);
  }

  return Response.json(false);
}
