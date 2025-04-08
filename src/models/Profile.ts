import { model, models, Schema } from "mongoose";

interface Profile {
  email: string;
  username: string;
}

const ProfileSchema = new Schema<Profile>({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
});

export const ProfileModel =
  models?.Profile || model<Profile>("Profile", ProfileSchema);
