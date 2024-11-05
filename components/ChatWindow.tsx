"use client";
import React, { useEffect, useRef } from "react";
import { IoPerson } from "react-icons/io5";
import { RiRobot3Fill } from "react-icons/ri";
import Markdown from "markdown-to-jsx";
import { ThreeDots } from "react-loader-spinner";

const ChatWindow = ({
  chatType,
  allChat,
}: {
  chatType: string;
  allChat: any[];
}) => {
  const chatContainerRef = useRef<any>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current?.scrollHeight;
    }
  }, [allChat]);

  if (chatType === "marketResearch") {
    return (
      <div className="chat-window" ref={chatContainerRef}>
        {allChat.map((chat, index) => {
          if (chat.type === "bot") {
            return (
              <div className="bot-message" key={index}>
                <span>
                  <RiRobot3Fill />
                </span>
                <div>
                  <Markdown>{chat.message}</Markdown>
                </div>
              </div>
            );
          } else if (chat.type === "loader") {
            return (
              <div className="bot-message" key={index}>
                <span>
                  <RiRobot3Fill />
                </span>
                <ThreeDots
                  visible={true}
                  height="18"
                  width="80"
                  color="#343434"
                  radius="5"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            );
          } else {
            return (
              <div className="user-message" key={index}>
                <p>{chat.message}</p>
                <span>
                  <IoPerson />
                </span>
              </div>
            );
          }
        })}
      </div>
    );
  } else if (chatType === "productCatalog") {
    return (
      <div className="chat-window" ref={chatContainerRef}>
        {allChat.map((chat, index) => {
          console.log(chat.message);
          if (chat.type === "bot") {
            return (
              <div className="bot-message" key={index}>
                <span>
                  <RiRobot3Fill />
                </span>
                <p>{chat.message}</p>
                {/* <div>
                  <Markdown>{chat.message}</Markdown>
                </div> */}
              </div>
            );
          } else if (chat.type === "loader") {
            return (
              <div className="bot-message" key={index}>
                <span>
                  <RiRobot3Fill />
                </span>
                <ThreeDots
                  visible={true}
                  height="18"
                  width="80"
                  color="#343434"
                  radius="5"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            );
          } else {
            return (
              <div className="user-message" key={index}>
                <p>{chat.message}</p>
                <span>
                  <IoPerson />
                </span>
              </div>
            );
          }
        })}
      </div>
    );
  } else if (chatType === "pitchCreator") {
    return (
      <div className="chat-window">
        <div className="bot-message">
          <span>icon</span>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
            cupiditate optio culpa temporibus perferendis atque. Delectus
            dolorum
          </p>
        </div>
        <div className="user-message">
          <span>icon</span>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="chat-window" ref={chatContainerRef}>
        {allChat.map((chat, index) => {
          if (chat.type === "bot") {
            return (
              <div className="bot-message" key={index}>
                <span>
                  <RiRobot3Fill />
                </span>
                <div>{chat.message}</div>
              </div>
            );
          } else if (chat.type === "loader") {
            return (
              <div className="bot-message" key={index}>
                <span>
                  <RiRobot3Fill />
                </span>
                <ThreeDots
                  visible={true}
                  height="18"
                  width="80"
                  color="#343434"
                  radius="5"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            );
          } else {
            return (
              <div className="user-message" key={index}>
                <p>{chat.message}</p>
                <span>
                  <IoPerson />
                </span>
              </div>
            );
          }
        })}
      </div>
    );
  }
};

export default ChatWindow;
