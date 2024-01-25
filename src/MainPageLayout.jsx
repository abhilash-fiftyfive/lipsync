import React from "react";
import { Outlet } from "react-router-dom";
import ChatLayout from "./components/chats";
import { createContext, useContext } from "react";
import useChats from "./components/hooks/useChats";
import useSelectedCourse from "./components/hooks/useSelectedCourse";
import useLessonList from "./components/hooks/useLessonList";

export const ChatContext = createContext(null);

export function chatContext() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const context = useContext(ChatContext);
  if (!context) throw new Error("Need chat context");
  return context;
}

export const SelectedCourseContext = createContext(null);

export function courseContext() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const context = useContext(SelectedCourseContext);
  if (!context) throw new Error("Need course context");
  return context;
}

export const LessonListContext = createContext(null);

export function lessonListContext() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const context = useContext(LessonListContext);
  if (!context) throw new Error("Need course context");
  return context;
}

const MainPageLayout = () => {
  const val = useChats();
  const value = useSelectedCourse();
  const lessonList = useLessonList();

  return (
    <ChatContext.Provider value={val}>
      <SelectedCourseContext.Provider value={value}>
        <LessonListContext.Provider value={lessonList}>
          <div style={{ overflow: "hidden", height: "100vh" }}>
            <div
              style={{
                overflowY: "auto",
                height: "100%",
                backgroundColor: lightBlue[50],
              }}
            >
              <Outlet />
            </div>
            <div>
              <ChatLayout />
            </div>
          </div>
        </LessonListContext.Provider>
      </SelectedCourseContext.Provider>
    </ChatContext.Provider>
  );
};

export default MainPageLayout;
