import { useRef, useState } from "react";
import useCourses from "./hooks/useCourses";
import useCourseConversation from "./hooks/useCourseConversation";
import { chatContext } from "../App";

export const UI = () => {
  const inputref = useRef();
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

  const sendMessage = () => {
    const text = inputref.current.value;
    console.log(text);
    // setCourseId(Number(text));
    if (!isIdValid) setAuthorId(text);
    else if (isIdValid)
      start_conversation_mutation({
        message: text,
        called: "called",
      });
  };
  console.log("authorId", isIdValid, authorId, currentMessage);

  return (
    <>
      <div className="absolute z-30 bottom-12 left-8 flex gap-4">
        <input
          className="w-full placeholder:text-gray-800 placeholder-italic p-4 rounded-md bg-opacity-50 bg-white backdrop-blur-md"
          placeholder="Enter your author id (eg. 1,2,3)..."
          ref={inputref}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
        >
          Send
        </button>
      </div>
    </>
  );
};
