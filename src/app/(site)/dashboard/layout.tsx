import DashboardNav from "@/components/common/DashboardNav";
import { session } from "@/libs/session";
import { ProfileModel } from "@/models/Profile";
import { connect } from "mongoose";
import React from "react";

const DashBoardLayout = async ({
  children,
  
}: {
  children: React.ReactNode;
}) => {
  const email = await session().get("email");

  if (!email) {
    return (
      <div>
        <h1>Not logged in</h1>
      </div>
    );
  }
  await connect(process.env.MONGODB_URI as string)
  const profileDoc = await ProfileModel.findOne({ email });
  return (
    <div>
      <DashboardNav username = {profileDoc?.username || ''}/>
      {children}
    </div>
  );
};

export default DashBoardLayout;
