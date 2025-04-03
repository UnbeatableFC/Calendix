import { connect } from "mongoose";
import { NextApiRequest } from "next";

export async function POST(req: NextApiRequest) {
  if (!process.env.MONGODB_URI) {
    throw new Error(
      "MONGODB_URI is not defined in the environment variables."
    );
  }
  await connect(process.env.MONGODB_URI);
  const data = req.body;
  console.log(data);
  return Response.json("ok");
}
