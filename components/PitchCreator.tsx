"use client";
import React, { useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import ChatWindow from "./ChatWindow";
import Suggessions from "./Suggessions";
import { IoMdAdd } from "react-icons/io";

type UserMessage = {
  type: string;
  message?: string;
};

const PitchCreator = () => {
  const [chatHistory, setChatHistory] = useState<UserMessage[]>([]);
  const [marketInputs, setMarketInputs] = useState<{
    companyName: string;
    industry: string;
    urlList: any[];
  }>({
    companyName: "",
    industry: "",
    urlList: [],
  });
  const [urlInput, setUrlInput] = useState("");

  const addUrlToList = () => {
    const url = urlInput;
    if (url && url !== "") {
      setMarketInputs((prev) => {
        return { ...prev, urlList: [...prev.urlList, url] };
      });
      setUrlInput("");
    }
  };

  const sendMessage = () => {
    console.log(marketInputs);
  };

  const selectSuggestion = (text: string) => {
    // console.log(text);
    // setInputVal(text);
    // setChatHistory((prev) => {
    //   return [...prev, { type: "user", message: text }];
    // });
  };
  return (
    <div className="pilot-continer">
      {chatHistory.length === 0 ? (
        <Suggessions selectSuggestion={selectSuggestion} />
      ) : (
        <ChatWindow chatType="pitchCreator" allChat={chatHistory} />
      )}
      <div className="input-group">
        <div className="inputs-1">
          <input
            type="text"
            placeholder="Company Name"
            value={marketInputs.companyName}
            onChange={(e) =>
              setMarketInputs((prev) => {
                return { ...prev, companyName: e.target.value };
              })
            }
          />
          <input
            type="text"
            placeholder="Industry"
            value={marketInputs.industry}
            onChange={(e) =>
              setMarketInputs((prev) => {
                return { ...prev, industry: e.target.value };
              })
            }
          />
        </div>
        <div className="url-input">
          <input
            type="text"
            placeholder="Enter URLs to add"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
          />
          <button onClick={addUrlToList}>
            <IoMdAdd />
          </button>
        </div>
        <p className="urls-list">
          {marketInputs.urlList.map((url) => (
            <span key={url}>{url}</span>
          ))}
        </p>
        <button className="send-btn" onClick={sendMessage}>
          <BsFillSendFill />
          Send
        </button>
      </div>
    </div>
  );
};

export default PitchCreator;
