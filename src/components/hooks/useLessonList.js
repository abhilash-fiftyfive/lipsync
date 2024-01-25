import { useState } from "react";

const useLessonList = () => {
  const [lessonList, setLessonList] = useState([]);

  return {
    lessonList,
    setLessonList,
  };
};

export default useLessonList;
