import { useState } from "react";
import { useQuery } from "react-query";

const useCourses = () => {
  const [id, setId] = useState();
  const {
    data: coursesList,
    isLoading,
    isError,
    isSuccess,
  } = useQuery(
    ["courses-list", id],
    async () => {
      const response = await fetch(
        `https://leapfroggingacademy.com/wp-json/ldlms/v2/users/${id}/courses`,
        {
          method: "GET",
          headers: {
            Authorization: "Basic SGFyc2g6OVM0ZFF3eTlHY2dIam9lYXVqSWpuVnhP",
          },
        }
      );
      return response.json();
    },
    {
      refetchOnWindowFocus: false,
      enabled: !!id,
      onSuccess: () => {
        // console.log('response : ', res)
      },
    }
  );
  const setCourseId = (newId) => {
    setId(newId);
  };

  return {
    coursesList,
    isLoading,
    isError,
    isSuccess,
    setCourseId,
  };
};

export default useCourses;
