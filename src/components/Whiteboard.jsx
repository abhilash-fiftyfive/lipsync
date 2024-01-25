import { useState, useEffect } from "react";
import { useContext } from "react";
import { syncAudioWithTextContext } from "../App";
import axios from "axios";
import MainPageLayout from "../MainPageLayout";

const Whiteboard = () => {
  const [message, setMessage] = useState("");
  const handleComment = async () => {
    try {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/comments"
      );
      console.log("RES", res);
      if (res?.status === 200) {
        setMessage(res?.data[0]?.body);
      }
      return res?.data;
    } catch (e) {
      return e;
    }
  };

  useEffect(() => {
    const handleData = async () => {
      const res = await axios.post(
        "https://api.elevenlabs.io/v1/text-to-speech/mJZNioxJ3acqPz027m8z?optimize_streaming_latency=1",
        {
          text: "Hello world. This text is being converted",
          voice_settings: {
            similarity_boost: 1,
            stability: 1,
            style: 1,
            use_speaker_boost: true,
          },
        },
        {
          headers: {
            "xi-api-key": "ea05d6762096ac5f1284c101b9e821f5",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("RES OS TTS API", res?.data);
      setMessage(res?.data);
    };

    handleData();
  }, []);

  useEffect(() => {
    handleComment();
  }, []);

  const { syncAudioWithText } = useContext(syncAudioWithTextContext);
  const [text, setText] = useState("");
  const typingSpeed = 70;

  useEffect(() => {
    setText("");
    let index = 0,
      intervalId;
    if (syncAudioWithText) {
      intervalId = setInterval(() => {
        setText((prevText) => prevText + message?.charAt(index));
        index++;
        if (index === message?.length) {
          clearInterval(intervalId);
        }
      }, typingSpeed);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [message, syncAudioWithText]);

  // const text = "I am chatGPT, a versatile AI language model. I excel in generating human like text, answering questions and adding diverse tasks with vast knowledge and adaptability";

  // const generateAndSaveAudio = async (text) => {
  //   try {
  //     const audioBuffer = await getAudioUrl({ text, lang: "en" });

  //     // Convert audio buffer to a Blob
  //     const audioBlob = new Blob([audioBuffer], { type: "audio/mp3" });

  //     // Create a link element
  //     const audioLink = document.createElement("a");

  //     // Set the href attribute to a Blob URL representing the audio file
  //     audioLink.href = URL.createObjectURL(audioBlob);

  //     // Set the download attribute to specify the filename
  //     audioLink.download = "output.mp3";

  //     // Append the link to the document
  //     document.body.appendChild(audioLink);

  //     // Trigger a click on the link to start the download
  //     audioLink.click();

  //     // Remove the link from the document
  //     document.body.removeChild(audioLink);
  //   } catch (error) {
  //     console.error("Error generating and saving audio:", error);
  //   }
  // };

  useEffect(() => {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();

    const playAudio = async () => {
      try {
        const decodedData = await audioContext.decodeAudioData(message);
        const source = audioContext.createBufferSource();
        source.buffer = decodedData;
        source.connect(audioContext.destination);
        source.start();
      } catch (error) {
        console.error("Error decoding and playing audio:", error);
      }
    };
    playAudio();
  }, [message]);

  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        zIndex: 1,
        width: "50%",
        height: "100vh",
        padding: "0 2rem",
        display: "flex",
        alignItems: "center",
        overflowY: "scroll",
        justifyContent: "center",
      }}
      className="hide-scrollbar"
    >
      {/* <a href={message} download="" type="file">
        Download
      </a> */}
      {/* <audio controls>
        <source src={message} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio> */}
      <p>{text}</p>
      <MainPageLayout />
    </div>
  );
};

export default Whiteboard;
