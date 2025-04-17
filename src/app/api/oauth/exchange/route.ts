import { nylasConfig, nylas } from "@/libs/nylas";
import { session } from "@/libs/session";
import { ProfileModel } from "@/models/Profile";
import { connect } from "mongoose";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  console.log("Received callback from Nylas");
  if (!req.url) {
    return Response.json("Invalid request URL", { status: 400 });
  }
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return Response.json(
      "No authorization code returned from Nylas",
      {
        status: 400,
      }
    );
  }

  if (!nylasConfig.apiKey || !nylasConfig.clientId) {
    return Response.json("Missing Nylas configuration", {
      status: 500,
    });
  }

  const codeExchangePayLoad = {
    clientSecret: nylasConfig.apiKey,
    clientId: nylasConfig.clientId,
    redirectUri: nylasConfig.callbackUri,
    code,
  };

  const response = await nylas.auth.exchangeCodeForToken(
    codeExchangePayLoad
  );
  const { grantId, email } = response;

  await connect(process.env.MONGODB_URI as string);

  const profileDoc = await ProfileModel.findOne({ email });
  if (profileDoc) {
    profileDoc.grantId = grantId;
    await profileDoc.save();
  } else {
    await ProfileModel.create({ email, grantId });
  }

  await session().set("email", email);

  redirect("/");
}
