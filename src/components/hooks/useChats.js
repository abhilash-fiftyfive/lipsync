import { useEffect, useState } from "react";
import useCourses from "./useCourses";

const useChats = () => {
  const [messageList, setMessageList] = useState([
    {
      message: "Hey User! Please tell me your ID?",
      createdBy: "BOT",
      createdAt: new Date().toISOString(),
    },
  ]);
  const [currentContentUrl, setCurrentContentUrl] = useState("");
  const [isIdValid, setIsIdValid] = useState(false);
  const [authorId, setAuthorId] = useState(undefined);
  const [currentMessage, setCurrentMessage] = useState("");
  const [sessionId] = useState(() => new Date().toJSON());
  const { coursesList, isLoading, isError, isSuccess } = useCourses({
    id: authorId,
  });

  console.log("courseList", coursesList);

  useEffect(() => {
    console.log("Abhi", isLoading, isError, coursesList?.length);
    if (!isLoading && !isError && coursesList?.length >= 0) {
      setIsIdValid(true);
      return;
    }
    if (isError || (!!coursesList && coursesList.data?.status !== 200)) {
      setMessageList((prev) => [
        ...prev,
        {
          message: "OOPS 😒, your Id is wrong, Please re-enter your Id",
          createdBy: "BOT",
          createdAt: new Date().toISOString(),
        },
      ]);
      return;
    }
  }, [coursesList, isLoading, isError, isSuccess]);

  return {
    messageList,
    setMessageList,
    isIdValid,
    setIsIdValid,
    authorId,
    setAuthorId,
    currentMessage,
    setCurrentMessage,
    coursesList,
    isLoading,
    isError,
    isSuccess,
    sessionId,
    currentContentUrl,
    setCurrentContentUrl,
  };
};

export default useChats;
