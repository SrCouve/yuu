import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "ELEVENLABS_API_KEY não está definida no servidor" });
    }

    const { text, voiceId } = req.body;
    if (!text || !voiceId) {
      return res.status(400).json({ error: "Faltam campos obrigatórios no body (text, voiceId)" });
    }

    // Faz a chamada à ElevenLabs, buscando o áudio binário
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
    const response = await axios.post(url, 
      { text }, 
      {
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        responseType: "arraybuffer",
      }
    );

    const audioBuffer = response.data; // arraybuffer
    // Converte para base64
    const base64Audio = Buffer.from(audioBuffer).toString("base64");

    // Retorna { audio: base64 }
    return res.status(200).json({ audio: base64Audio });
  } catch (error: any) {
    console.error("Erro em /api/elevenTts:", error);
    return res.status(500).json({ error: error?.message || "Erro interno ao gerar áudio" });
  }
}