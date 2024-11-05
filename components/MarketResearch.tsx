"use client";
import React, { useEffect, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import axios from "axios";

import ChatWindow from "./ChatWindow";
import Suggessions from "./Suggessions";

type ChatMessage = {
  type: string;
  message?: string;
};

const MarketResearch = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
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

  const selectSuggestion = (text: string) => {
    const mockData = {
      companyName: "J.P.Morgon",
      industry: "finance",
      urlList: [
        // "https://www.jpmorgan.com/global",
        // "https://www.jpmorgan.com/contact-us",
        "entercard.com",
      ],
    };
    setMarketInputs(mockData);
  };
  const resetInputs = () => {
    setMarketInputs({ companyName: "", industry: "", urlList: [] });
  };
  const addUrlToList = () => {
    const url = urlInput;
    if (url && url !== "") {
      setMarketInputs((prev) => {
        return { ...prev, urlList: [...prev.urlList, url] };
      });
      setUrlInput("");
    }
  };

  const sendMessage = async () => {
    const sessionId = localStorage.getItem("session_id");

    setChatHistory((prev) => {
      return [
        ...prev,
        {
          type: "user",
          message: `Company: ${marketInputs.companyName}, Industry: ${
            marketInputs.industry
          }, URLs: ${marketInputs.urlList.join(",")}`,
        },
        { type: "loader" },
      ];
    });
    let payload = {
      company_name: marketInputs.companyName,
      industry: marketInputs.industry,
      urls: marketInputs.urlList,
      session_id: sessionId,
    };
    resetInputs();

    const response = await axios.post("/api/market-research", payload);

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
  };

  const getChatData = async () => {
    const sessionId = localStorage.getItem("session_id");

    const response = await axios.get(
      `/api/market-research?session_id=${sessionId}&feature=market_insights`
    );
    if (response.data.success) {
      let newChatHistory = response.data.result.history;
      console.log(newChatHistory);
      setChatHistory(newChatHistory);
    }
  };

  useEffect(() => {
    getChatData();
  }, []);

  return (
    <div className="pilot-continer">
      {chatHistory.length === 0 ? (
        <div className="market-insights-intro-card">
          <p className="text-1">Add Your Company Details</p>
          <p className="text-2">
            Enter your company information below. For example:
          </p>
          <span>
            <strong>Company:</strong>&nbsp; Acme Corp
          </span>
          <span>
            <strong>Industry:</strong>&nbsp; Technology
          </span>
          <span>
            <strong>URL:</strong>&nbsp; www.acme.com (optional)
          </span>
        </div>
      ) : (
        <ChatWindow chatType="marketResearch" allChat={chatHistory} />
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
      {/* <div className="input-box">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
        <button>
          <BsFillSendFill />
        </button>
      </div> */}
    </div>
  );
};

export default MarketResearch;
