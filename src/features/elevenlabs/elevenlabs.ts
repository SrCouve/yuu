// features/elevenlabs/elevenlabs.ts

import { ElevenLabsParam } from "../constants/elevenLabsParam";
import { TalkStyle } from "../messages/messages";

/**
 * Gera áudio chamando /api/elevenTts no backend (sem expor a key).
 */
export async function synthesizeVoice(
  message: string,
  speaker_x: number,
  speaker_y: number,
  style: TalkStyle,
  elevenLabsKey: string, // agora ignorado
  elevenLabsParam: ElevenLabsParam
) {
  // ID da voz:
  const VOICE_ID = elevenLabsParam.voiceId;

  console.log("elevenlabs voice_id:", VOICE_ID);

  // Chamamos /api/elevenTts. Ele fará a requisição real à ElevenLabs no servidor.
  const response = await fetch("/api/elevenTts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: message,
      voiceId: VOICE_ID,
      // se quiser, poderia mandar speaker_x, speaker_y, style, etc. (mas a API oficial só precisa do text)
    }),
  });

  if (!response.ok) {
    throw new Error("Erro ao chamar /api/elevenTts");
  }

  // { audio: base64String }
  const data = await response.json();
  if (!data.audio) {
    throw new Error("Resposta inválida de /api/elevenTts (sem 'audio')");
  }

  // Converte base64 -> Blob -> ObjectURL
  const base64Audio = data.audio;
  const binary = atob(base64Audio);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  const blob = new Blob([bytes], { type: "audio/mpeg" });
  const url = URL.createObjectURL(blob);

  return {
    audio: url,
  };
}

/**
 * Lista vozes sem expor a chave – chama /api/elevenVoices (GET).
 */
export async function getVoices(elevenLabsKey: string) {
  // Ignoramos o "elevenLabsKey" agora, porque não precisamos dele no front.
  const response = await fetch("/api/elevenVoices");
  if (!response.ok) {
    throw new Error("Erro ao chamar /api/elevenVoices");
  }
  const data = await response.json();
  // data deve ser o objeto com "voices", etc.
  return data;
}