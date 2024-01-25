import { useState } from "react";

const useSelectedCourse = () => {
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedCourseTitle, setSelectedCourseTitle] = useState(null);

  return {
    selectedCourseId,
    selectedCourseTitle,
    setSelectedCourseId,
    setSelectedCourseTitle,
  };
};

export default useSelectedCourse;
