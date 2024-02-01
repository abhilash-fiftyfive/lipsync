import { useMutation } from "react-query";
import { chatContext } from "../../App";

// export enum UserType {
//   USER = "USER",
//   BOT = "BOT",
// }

let conversationTimeout;

const useCourseConversation = () => {
  const { messageList, setMessageList, authorId, sessionId } = chatContext();
  // const navigate = useNavigate();
  const BASE_URL = "https://cait-sdgywdtvka-ew.a.run.app/";

  const conversationData = async (uuid) => {
    try {
      const savedMessage = localStorage.getItem("messageSaved");
      const res = await fetch(`${BASE_URL}/poll_response/${uuid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic SGFyc2g6OVM0ZFF3eTlHY2dIam9lYXVqSWpuVnhP",
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      clearTimeout(conversationTimeout);
      if (data.detail === "Response not found") {
        setTimeout(() => {
          conversationData(data.uuid);
        }, 2000);
        return;
      }
      if (data.answer !== "no_script_found" && data.answer !== "") {
        setMessageList((prev) => [
          ...prev,
          {
            message: data.answer,
            createdBy: "BOT",
            createdAt: new Date().toISOString(),
            script_flag: data.script_flag,
            embed_link: data.embed_link,
          },
        ]);
      }

      conversationTimeout = setTimeout(
        () => {
          if (
            !savedMessage &&
            data.functionality_ref === 4 &&
            data.api_endpoint != null
          ) {
            // start_conversation_mutation({ message: "next_script_section" });
            getLeapfrogCourseData(data.api_endpoint);
          }
          if (!savedMessage && data.script_flag === "1") {
            // start_conversation_mutation({ message: "next_script_section" });
          }
        },
        !savedMessage ? data.wait_time * 1000 : 10000000
      );
    } catch (error) {
      // console.error("Error fetching data:", error);
    }
  };

  // const { mutateAsync: getLeapfrogCourseData } = useMutation(
  //   async (url) => {
  //     const res = await fetch(url, {
  //       method: "GET",
  //       headers: {
  //         Authorization: "Basic SGFyc2g6OVM0ZFF3eTlHY2dIam9lYXVqSWpuVnhP",
  //       },
  //     });
  //     return res.json();
  //   },
  //   {
  //     onSuccess: (res) => {
  //       navigate(`/${res.id}`);
  //     },
  //   }
  // );

  const { mutateAsync: start_conversation_mutation } = useMutation(
    [],
    async ({ message, called }) => {
      console.log(called);
      const res = await fetch(
        `${BASE_URL}/start_conversation?student_ID=${authorId}&session_ID=${sessionId}&user_message_no=${
          messageList.length + 1
        }%27&question=${message}`,
        {
          method: "POST",
          headers: {
            Authorization: "Basic SGFyc2g6OVM0ZFF3eTlHY2dIam9lYXVqSWpuVnhP",
          },
        }
      );
      return res.json();
    },
    {
      onSuccess: (res) => {
        conversationData(res.uid);
      },
    }
  );
  return { start_conversation_mutation };
};

export default useCourseConversation;
