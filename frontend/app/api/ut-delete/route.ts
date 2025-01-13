import { NextRequest, NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

type dataType = {
  key: string;
};

export async function POST(req: NextRequest) {
  const utapi = new UTApi({
    token: process.env.UPLOADTHING_TOKEN,
  });

  const data: dataType = await req.json();
  try {
    await utapi.deleteFiles(data.key);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to delete file from UploadThing" },
      { status: 500 }
    );
  }

  //   res.status(200).json({ deletedFileKey: body.key });
  return NextResponse.json({ deletedFileKey: data.key }, { status: 200 });
}
