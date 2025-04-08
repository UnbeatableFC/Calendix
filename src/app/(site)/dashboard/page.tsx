
import ProfileForm from "@/components/common/ProfileForm";
import { session } from "@/libs/session";
import { ProfileModel } from "@/models/Profile";
import { connect } from "mongoose";
// import axios from "axios";
// import { FormEvent, useState } from "react";

const DashboardPage = async () => {
  const email = await session().get("email");
  await connect(process.env.MONGODB_URI as string);
  const profileDoc = await ProfileModel.findOne({ email });
  return (
    <div>
      
      <ProfileForm existingUsername={profileDoc?.username || ""} />
    </div>
  );
};

export default DashboardPage;
