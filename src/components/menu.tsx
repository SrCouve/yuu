"use client";

import { IconButton } from "./iconButton";
import { Message } from "@/features/messages/messages";
import { ElevenLabsParam } from "@/features/constants/elevenLabsParam";
import { KoeiroParam } from "@/features/constants/koeiroParam";
import { ChatLog } from "./chatLog";
import React, { useCallback, useContext, useRef, useState, useEffect } from "react";
import { Settings } from "./settings";
import { ViewerContext } from "@/features/vrmViewer/viewerContext";
import { AssistantText } from "./assistantText";

type Props = {
  openAiKey: string;
  systemPrompt: string;
  chatLog: Message[];
  elevenLabsParam: ElevenLabsParam;
  koeiroParam: KoeiroParam;
  assistantMessage: string;
  onChangeSystemPrompt: (systemPrompt: string) => void;
  onChangeAiKey: (key: string) => void;
  onChangeElevenLabsVoice: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeChatLog: (index: number, text: string) => void;
  onChangeKoeiroParam: (param: KoeiroParam) => void; // Note: sem "map"
  handleClickResetChatLog: () => void;
  handleClickResetSystemPrompt: () => void;
  backgroundImage: string;
  onChangeBackgroundImage: (value: string) => void;
  onChatMessage: (message: string) => void;
  onTokensUpdate: (tokens: any) => void;
  openSettingsOnLoad?: boolean;
};

export const Menu = ({
  openAiKey,
  systemPrompt,
  chatLog,
  elevenLabsParam,
  koeiroParam,
  assistantMessage,
  onChangeSystemPrompt,
  onChangeAiKey,
  onChangeElevenLabsVoice,
  onChangeChatLog,
  onChangeKoeiroParam,
  handleClickResetChatLog,
  handleClickResetSystemPrompt,
  backgroundImage,
  onChangeBackgroundImage,
  onChatMessage,
  onTokensUpdate,
  openSettingsOnLoad = false,
}: Props) => {
  const [showSettings, setShowSettings] = useState<boolean>(openSettingsOnLoad);
  const [showChatLog, setShowChatLog] = useState(false);
  const { viewer } = useContext(ViewerContext);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedBackground = localStorage.getItem("backgroundImage");
    if (savedBackground) {
      onChangeBackgroundImage(savedBackground);
    }
  }, [onChangeBackgroundImage]);

  useEffect(() => {
    if (openSettingsOnLoad) {
      setShowSettings(true);
    }
  }, [openSettingsOnLoad]);

  const handleChangeSystemPrompt = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChangeSystemPrompt(event.target.value);
    },
    [onChangeSystemPrompt]
  );

  const handleAiKeyChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChangeAiKey(event.target.value);
    },
    [onChangeAiKey]
  );

  const handleElevenLabsVoiceChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      onChangeElevenLabsVoice(event);
    },
    [onChangeElevenLabsVoice]
  );

  // Atualize aqui para receber um único objeto KoeiroParam
  const handleChangeKoeiroParam = useCallback(
    (param: KoeiroParam) => {
      onChangeKoeiroParam(param);
    },
    [onChangeKoeiroParam]
  );

  const handleClickOpenVrmFile = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleChangeVrmFile = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) return;
      const file = event.target.files[0];
      if (!file) return;
      const fileType = file.name.split(".").pop();
      if (fileType === "vrm") {
        const blob = new Blob([file], { type: "application/octet-stream" });
        const url = window.URL.createObjectURL(blob);
        viewer.loadVrm(url);
      }
      event.target.value = "";
    },
    [viewer]
  );

  const handleBackgroundImageChange = (image: string) => {
    onChangeBackgroundImage(image);
  };

  return (
    <>
      <div style={{ display: "none" }}>
        <IconButton
          iconName="24/Menu"
          label="Settings"
          isProcessing={false}
          onClick={() => setShowSettings(true)}
        />
        <IconButton
          iconName="24/CommentFill"
          label="Conversation Log"
          isProcessing={false}
          onClick={() => setShowChatLog(!showChatLog)}
        />
      </div>

      <div style={{ display: "none" }}>
        {showChatLog && <ChatLog messages={chatLog} />}
        {showSettings && (
          <Settings
            openAiKey={openAiKey}
            systemPrompt={systemPrompt}
            chatLog={chatLog}
            elevenLabsParam={elevenLabsParam}
            koeiroParam={koeiroParam}
            onClickClose={() => setShowSettings(false)}
            onChangeAiKey={handleAiKeyChange}
            onChangeSystemPrompt={handleChangeSystemPrompt}
            onChangeChatLog={onChangeChatLog}
            onChangeElevenLabsVoice={handleElevenLabsVoiceChange}
            onChangeKoeiroParam={handleChangeKoeiroParam} // corrigido
            onClickOpenVrmFile={handleClickOpenVrmFile}
            onClickResetChatLog={handleClickResetChatLog}
            onClickResetSystemPrompt={handleClickResetSystemPrompt}
            backgroundImage={backgroundImage}
            onChangeBackgroundImage={handleBackgroundImageChange}
            onTokensUpdate={onTokensUpdate}
            onChatMessage={onChatMessage}
          />
        )}
      </div>

      {assistantMessage && <AssistantText message={assistantMessage} />}

      <input
        type="file"
        className="hidden"
        accept=".vrm"
        ref={fileInputRef}
        onChange={handleChangeVrmFile}
      />
    </>
  );
};
