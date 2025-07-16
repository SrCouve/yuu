import React, { useEffect, useState } from "react";
import { IconButton } from "./iconButton";
import { TextButton } from "./textButton";
import { Message } from "@/features/messages/messages";
import { KoeiroParam } from "@/features/constants/koeiroParam";
import { Link } from "./link";
import { ElevenLabsParam } from "@/features/constants/elevenLabsParam";

type Props = {
  openAiKey: string;
  systemPrompt: string;
  chatLog: Message[];
  elevenLabsParam: ElevenLabsParam;
  koeiroParam: KoeiroParam;
  onClickClose: () => void;
  onChangeAiKey: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeElevenLabsVoice: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeSystemPrompt: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeChatLog: (index: number, text: string) => void;
  onChangeKoeiroParam: (param: KoeiroParam) => void; // Usamos onChangeKoeiroParam
  onClickOpenVrmFile: () => void;
  onClickResetChatLog: () => void;
  onClickResetSystemPrompt: () => void;
  backgroundImage: string;
  onChangeBackgroundImage: (image: string) => void;
  onRestreamTokensUpdate?: (tokens: { access_token: string; refresh_token: string } | null) => void;
  onTokensUpdate: (tokens: any) => void;
  onChatMessage: (message: string) => void;
};

export const Settings = ({
  openAiKey,
  systemPrompt,
  chatLog,
  elevenLabsParam,
  koeiroParam,
  onClickClose,
  onChangeAiKey,
  onChangeElevenLabsVoice,
  onChangeSystemPrompt,
  onChangeChatLog,
  onChangeKoeiroParam,
  onClickOpenVrmFile,
  onClickResetChatLog,
  onClickResetSystemPrompt,
  backgroundImage,
  onChangeBackgroundImage,
  onRestreamTokensUpdate = () => {},
  onTokensUpdate,
  onChatMessage,
}: Props) => {
  const [elevenLabsVoices, setElevenLabsVoices] = useState<any[]>([]);
  useEffect(() => {
    fetch("/api/elevenVoices")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.voices) {
          setElevenLabsVoices(data.voices);
        } else {
          setElevenLabsVoices([]);
        }
      })
      .catch((err) => {
        console.error("Erro ao obter vozes:", err);
        setElevenLabsVoices([]);
      });
  }, []);

  useEffect(() => {
    if (elevenLabsVoices.length > 0) {
      const targetVoice = elevenLabsVoices.find((v: any) => v.name === "Kawaii Aerisita");
      const voiceIdToSelect = targetVoice ? targetVoice.voice_id : elevenLabsVoices[0].voice_id;
      const fakeSelectEvent = {
        target: { value: voiceIdToSelect },
      } as React.ChangeEvent<HTMLSelectElement>;
      onChangeElevenLabsVoice(fakeSelectEvent);
    }
  }, [elevenLabsVoices, onChangeElevenLabsVoice]);

  useEffect(() => {
    onClickClose();
  }, [onClickClose]);

  return (
    <div className="absolute z-40 w-full h-full bg-white/80 backdrop-blur">
      <div className="absolute m-24">
        <IconButton iconName="24/Close" isProcessing={false} onClick={onClickClose} />
      </div>
      <div className="max-h-full overflow-auto">
        <div className="text-text1 max-w-3xl mx-auto px-24 py-64">
          <div className="my-24 typography-32 font-bold">Settings</div>

          <div>
            <label>OpenRouter Key:</label>
            <span>Configurada no servidor</span>
          </div>
          <div>
            <label>ElevenLabs Key:</label>
            <span>Configurada no servidor</span>
          </div>

          {chatLog.length > 0 && (
            <div className="my-40">
              <div className="my-8 grid-cols-2">
                <div className="my-16 typography-20 font-bold">Conversation History</div>
                <TextButton onClick={onClickResetChatLog}>Reset conversation history</TextButton>
              </div>
              <div className="my-8">
                {chatLog.map((value, index) => (
                  <div key={index} className="my-8 grid grid-flow-col grid-cols-[min-content_1fr] gap-x-fixed">
                    <div className="w-[64px] py-8">{value.role === "assistant" ? "Character" : "You"}</div>
                    <input
                      key={index}
                      className="bg-surface1 hover:bg-surface1-hover rounded-8 w-full px-16 py-8"
                      type="text"
                      value={value.content}
                      onChange={(event) => onChangeChatLog(index, event.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
