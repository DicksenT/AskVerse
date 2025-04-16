import { NextRequest, NextResponse } from "next/server";
import { addResponseToMessage } from "../../../../../../backend/controllers/messageController";
import { requireAuth } from "../../../../../lib/requireAuth";
import { Types } from "mongoose";

//add Response to message
export async function PATCH(
  req: NextRequest,
  {params}: { params: Promise<{ chatId: string; messageId: string }>}
) {
  try {
    const auth = await requireAuth(req);
    if (auth instanceof NextResponse) return auth;

    const { chatId, messageId } = await params;
    const body = await req.json();

    const newResponse = await addResponseToMessage(
      new Types.ObjectId(auth.userId),
      new Types.ObjectId(chatId),
      new Types.ObjectId(messageId),
      body
    );

    return NextResponse.json(
      { message: "Successfully added response to message", data: newResponse },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
