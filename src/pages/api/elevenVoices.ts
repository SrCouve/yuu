import { NextApiRequest, NextApiResponse } from "next";
import { ElevenLabsClient } from "elevenlabs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "ELEVENLABS_API_KEY não está definida no servidor" });
    }

    const client = new ElevenLabsClient({ apiKey });
    const voices = await client.voices.getAll();

    // Retorna o objeto com a lista de vozes
    return res.status(200).json(voices);
  } catch (error: any) {
    console.error("Erro em /api/elevenVoices:", error);
    return res.status(500).json({ error: error?.message || "Erro interno ao listar vozes" });
  }
}