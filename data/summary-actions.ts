"use server";

import { SummaryPayload } from "@/lib/interfaces";
import { getMe } from "@/services/get-me";
import { getJWT } from "@/services/get-toiken";
import { mutateData } from "@/services/mutate-data";
import { redirect } from "next/navigation";

export async function createSummaryAction(payload: SummaryPayload) {
  const jwt = await getJWT();
  if (!jwt) throw new Error("Доступ запрещён!");

  const user = await getMe();

  payload.data = { ...payload.data, authorId: user.data.id.toString() };

  await mutateData("POST", "/api/summaries", payload);
}
