"use client";
import React, { useEffect, useState } from "react";
import Suggessions from "./Suggessions";
import ChatWindow from "./ChatWindow";
import { BsFillSendFill } from "react-icons/bs";
import axios from "axios";
import { useLoading } from "@/store/AppContext";

type ChatMessage = {
  type: string;
  message?: string;
};

const CyberGlossary = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [inputVal, setInputVal] = useState("");
  const { isLoading, showLoader, hideLoader } = useLoading();

  const selectSuggestion = async (text: string) => {
    const sessionId = localStorage.getItem("session_id");
    if (text && text !== "") {
      setChatHistory((prev) => {
        return [...prev, { type: "user", message: text }, { type: "loader" }];
      });
      let message = text;
      setInputVal("");

      const response = await axios.post("/api/cyber-glossary", {
        message: text,
        history: [...chatHistory, { type: "user", message: message }],
        session_id: sessionId,
      });

      let botMessage;
      if (response.data.success) {
        botMessage = {
          type: "bot",
          message: response.data.result.message,
        };
      } else {
        botMessage = {
          type: "bot",
          message: "Something went wrong",
        };
      }
      setChatHistory((prev) => {
        let newChats = [...prev];
        newChats = newChats.filter((c) => c.type !== "loader");
        return [...newChats, botMessage];
      });
    }
  };

  const onEnterInput = (e: any) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = async () => {
    showLoader();
    const sessionId = localStorage.getItem("session_id");
    if (inputVal && inputVal !== "") {
      setChatHistory((prev) => {
        return [
          ...prev,
          { type: "user", message: inputVal },
          { type: "loader" },
        ];
      });
      let message = inputVal;
      setInputVal("");

      const response = await axios.post("/api/cyber-glossary", {
        message: inputVal,
        history: [...chatHistory, { type: "user", message: message }],
        session_id: sessionId,
      });
      hideLoader();
      let botMessage;
      if (response.data.success) {
        botMessage = {
          type: "bot",
          message: response.data.result.message,
        };
      } else {
        botMessage = {
          type: "bot",
          message: "Something went wrong",
        };
      }
      setChatHistory((prev) => {
        let newChats = [...prev];
        newChats = newChats.filter((c) => c.type !== "loader");
        return [...newChats, botMessage];
      });
    }
  };

  const getChatData = async () => {
    const sessionId = localStorage.getItem("session_id");
    console.log(sessionId);
    showLoader();
    const response = await axios.get(
      `/api/cyber-glossary?session_id=${sessionId}&feature=cyber_glossary`
    );
    if (response.data.success) {
      let newChatHistory = response.data.result.history;
      console.log(newChatHistory);
      setChatHistory(newChatHistory);
    }
    hideLoader();
  };

  useEffect(() => {
    getChatData();
  }, []);

  return (
    <div className="pilot-continer">
      {chatHistory.length === 0 ? (
        <Suggessions selectSuggestion={selectSuggestion} />
      ) : (
        <ChatWindow chatType="cyberGlossary" allChat={chatHistory} />
      )}
      <div className="input-box">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyUp={onEnterInput}
        />
        <button onClick={sendMessage}>
          <BsFillSendFill />
        </button>
      </div>
    </div>
  );
};

export default CyberGlossary;
