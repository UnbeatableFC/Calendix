import EventForm from "@/components/common/EventForm";
import { EventTypeModel } from "@/models/EventType";
import { connect } from "mongoose";

type PageProps = {
  params: {
    id: string;
  };
};

const EditEventTypePage = async ({ params }: PageProps) => {
  await connect(process.env.MONGODB_URI as string);
  const eventTypeDoc = await EventTypeModel.findOne({
    _id: params.id,
  });
  if (!eventTypeDoc) {
    return "404";
  }
  return (
    <div>
      <EventForm doc={JSON.parse(JSON.stringify(eventTypeDoc))} />
    </div>
  );
};

export default EditEventTypePage;
