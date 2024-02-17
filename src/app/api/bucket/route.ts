import { SignedPostPolicyV4Output } from "@google-cloud/storage";
import { Storage } from "@google-cloud/storage";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { query } = body;
//   const storage = new Storage({
//     projectId: process.env.PROJECT_ID,
//     credentials: {
//       client_email: process.env.CLIENT_EMAIL,
//       private_key: process.env.PRIVATE_KEY,
//     },
//   });
//   const bucket = storage.bucket(process.env.BUCKET_NAME as string);
//   const file = bucket.file(query.file as string);
//   const options = {
//     expires: Date.now() + 5 * 60 * 1000, //  5 minutes,
//     fields: { "x-goog-meta-source": "nextjs-project" },
//   };
//   const [response] = await file.generateSignedPostPolicyV4(options);
//   return NextResponse.json(response);

    return NextResponse.json({});
}
