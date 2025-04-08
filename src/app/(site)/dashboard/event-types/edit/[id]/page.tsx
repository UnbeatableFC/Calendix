import EventForm from "@/components/common/EventForm";
import { session } from "@/libs/session";
import { EventTypeModel } from "@/models/EventType";
import { ProfileModel } from "@/models/Profile";
import { connect } from "mongoose";

type PageProps = {
  params: {
    id: string;
  };
};

const EditEventTypePage = async ({ params }: PageProps) => {
  await connect(process.env.MONGODB_URI as string);
  const email = await session().get("email");
  const eventTypeDoc = await EventTypeModel.findOne({
    _id: params.id,
  });

  const profileDoc = await ProfileModel.findOne({ email });
  if (!eventTypeDoc) {
    return "404";
  }
  console.log(eventTypeDoc);
  return (
    <div>
      <EventForm
        username={profileDoc.username || ''}
        doc={JSON.parse(JSON.stringify(eventTypeDoc))}
      />
    </div>
  );
};

export default EditEventTypePage;
