"use client";
import React, { useEffect, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { IoIosLink, IoMdAdd } from "react-icons/io";
import axios from "axios";

import ChatWindow from "./ChatWindow";
import Suggessions from "./Suggessions";
import { LuBuilding2 } from "react-icons/lu";
import { PiSuitcaseBold } from "react-icons/pi";
import { FiLink } from "react-icons/fi";
import { useToast } from "@/hooks/use-toast";
import { FaPlus } from "react-icons/fa";
import { useLoading } from "@/store/AppContext";
import { IoClose } from "react-icons/io5";

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
  const [expandInputs, setExpandInputs] = useState(false);
  const { toast } = useToast();
  const { isLoading, showLoader, hideLoader } = useLoading();

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
    showLoader();
    const sessionId = localStorage.getItem("session_id");
    setExpandInputs(false);

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
  };

  const getChatData = async () => {
    showLoader();
    const sessionId = localStorage.getItem("session_id");

    const response = await axios.get(
      `/api/market-research?session_id=${sessionId}&feature=market_insights`
    );
    if (response.data.success) {
      if (typeof window !== "undefined") {
        toast({
          title: "Latest Market Insights",
          description: "Fetched Successfully",
        });
      }

      let latestMarketInsights = response.data.result.history;
      // console.log(latestMarketInsight);
      if (latestMarketInsights.length > 0) {
        setExpandInputs(false);
      }
      // test
      setChatHistory(latestMarketInsights);
      hideLoader();
    }
  };

  const toggleInputsExpand = () => {
    setExpandInputs(!expandInputs);
  };

  const removeUrlFromArr = (urlIndex: number) => {
    let newUrlList = [...marketInputs.urlList];
    newUrlList.splice(urlIndex, 1);

    setMarketInputs((prev) => ({ ...prev, urlList: newUrlList }));
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
            <LuBuilding2 className="icon" />
            <strong>Company:</strong>&nbsp; Acme Corp
          </span>
          <span>
            <PiSuitcaseBold className="icon" />
            <strong>Industry:</strong>&nbsp; Technology
          </span>
          <span>
            <FiLink className="icon" />
            <strong>URL:</strong>&nbsp; www.acme.com (optional)
          </span>
        </div>
      ) : (
        <ChatWindow chatType="marketResearch" allChat={chatHistory} />
      )}
      <div className={`input-group ${expandInputs ? "expand" : ""}`}>
        <button onClick={toggleInputsExpand} className="expand-inputs-btn">
          <FaPlus />
        </button>
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
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                addUrlToList();
              }
            }}
          />
          <button onClick={addUrlToList}>
            <IoMdAdd />
          </button>
        </div>
        <p className="urls-list">
          {marketInputs.urlList.map((url, u) => (
            <span key={url}>
              {url}{" "}
              <IoClose className="icon" onClick={() => removeUrlFromArr(u)} />
            </span>
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
