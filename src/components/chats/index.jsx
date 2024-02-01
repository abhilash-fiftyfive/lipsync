import "regenerator-runtime/runtime";
import { useEffect, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useCourseConversation from "../hooks/useCourseConversation";
import { chatContext } from "../../App";
import _ from "lodash";

const ChatLayout = () => {
  const {
    messageList,
    setMessageList,
    isIdValid,
    authorId,
    setAuthorId,
    currentMessage,
    setCurrentMessage,
    sessionId,
    setCurrentContentUrl,
  } = chatContext();
  const { start_conversation_mutation } = useCourseConversation();
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const utterance = new SpeechSynthesisUtterance();
  const voices = window.speechSynthesis.getVoices();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  useEffect(() => {
    if (isIdValid) {
      start_conversation_mutation({
        message: `{Student ID: ${authorId}}`,
        called: "called",
      });
    }
  }, [isIdValid]);

  useEffect(() => {
    if (
      !currentMessage &&
      messageList[messageList.length - 1]?.script_flag === "1"
    ) {
      // start_conversation_mutation({ message: 'next_script_section' })
    }
  }, [currentMessage]);

  useEffect(() => {
    let ws;
    let interval;
    const url = `ws://127.0.0.1:8000/ws/${authorId}/${sessionId}`;

    const connectWebSocket = () => {
      ws = new WebSocket(url);
      console.log("inside ws");

      ws.onopen = () => {
        console.log("WebSocket connected");
        sendKeepAlive();
      };

      ws.onmessage = (e) => {
        const message = JSON.parse(e.data);
        if (message.answer) {
          setMessageList((prevMessages) => [
            ...prevMessages,
            {
              message: message.answer,
              createdBy: "BOT",
              createdAt: new Date().toISOString(),
            },
          ]);
        }
        console.log("message : ", message);
        setCurrentContentUrl(message?.image);
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      ws.onclose = (e) => {
        console.log("WebSocket disconnected:", e);
        setTimeout(connectWebSocket, 5000);
      };
    };

    const sendKeepAlive = () => {
      if (ws.readyState === WebSocket.OPEN) {
        console.log("204");
        ws.send("keep-alive");
      }
    };
    console.log("isIdValid....", isIdValid, authorId, sessionId);
    if (isIdValid) {
      connectWebSocket();
      interval = setInterval(sendKeepAlive, 10000);
    }

    return () => {
      clearInterval(interval);
      if (ws) {
        ws.close();
      }
    };
  }, [isIdValid, authorId, sessionId]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  console.log("list", messageList);

  const getLastBotMessage = (messageList) => {
    const lastBotMessage = messageList.reduce((acc, message) => {
      if (message.createdBy === "BOT") {
        return message;
      }
      return acc;
    }, null);

    return lastBotMessage;
  };
  const lastEle = getLastBotMessage(messageList);
  console.log("lastEle", lastEle.message);

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        justifyContent: "space-between",
        height: "100vh",
      }}
    >
      <div
        style={{
          height: "100vh",
          overflow: "auto",
        }}
      >
        {messageList.map((list, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexFlow: "row",
              justifyContent: list.createdBy === "BOT" ? "left" : "flex-end",
              alignItems: "center",
              position: "absolute",
              top: "275px",
              left: "90px",
            }}
            ref={messagesEndRef}
          >
            <div>{list.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatLayout;
