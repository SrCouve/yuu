import fetch from "node-fetch";
import { synthesizeVoice } from "@/features/elevenlabs/elevenlabs";

import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  audio: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // function currently not used
  throw new Error("Not implemented");

  /*
  const message = req.body.message;
  const speaker_x = req.body.speakerX;
  const speaker_y = req.body.speakerY;
  const style = req.body.style;

  const voice = await synthesizeVoice(message, speaker_x, speaker_y, style);

  res.status(200).json(voice);
  */
}
