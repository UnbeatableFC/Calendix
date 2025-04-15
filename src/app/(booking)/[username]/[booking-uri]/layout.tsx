import { EventTypeModel } from "@/models/EventType";
import { ProfileModel } from "@/models/Profile";
import { Clock, Info } from "lucide-react";
import { connect } from "mongoose";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
  params: {
    username: string;
    "booking-uri": string;
  };
};

export default async function BookingboxLayout(props: LayoutProps) {
  await connect(process.env.MONGODB_URI as string);
  const profileDoc = await ProfileModel.findOne({
    username: props.params?.username,
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
      className="h-screen flex items-center  bg-cover"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <div className=" w-full">
        <div className="  flex p-8 shadow-md rounded-lg max-w-4xl mx-auto overflow-hidden">
          <div className="bg-blue-100/60 p-8 gap-1.5 max-w-80 text-gray-800 flex flex-col">
            <h1 className="text-2xl font-bold mb-2 border-b border-black/10 pb-2">
              {etDoc.title}
            </h1>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <div>
                  <Clock />
                </div>
                <div>{etDoc.length} minutes</div>
              </div>
              <div className="flex gap-2 mt-2">
                <div>
                  <Info />
                </div>
                <div className="">{etDoc.description}</div>
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-lg grow">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}
