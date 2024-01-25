import { useRef, useState } from "react";
import useCourses from "./hooks/useCourses";

export const UI = () => {
  const inputref = useRef();
  const { coursesList, isLoading, isError, isSuccess, setCourseId } =
    useCourses();
  console.log(coursesList);
  const sendMessage = () => {
    const text = inputref.current.value;
    setCourseId(Number(text));
  };

  return (
    <>
      <div className="absolute z-30 bottom-12 left-8 flex gap-4">
        <input
          className="w-full placeholder:text-gray-800 placeholder-italic p-4 rounded-md bg-opacity-50 bg-white backdrop-blur-md"
          placeholder="Enter your course id (eg. 1,2,3)..."
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
