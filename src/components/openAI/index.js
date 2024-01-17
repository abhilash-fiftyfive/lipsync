import axios from "axios";
import fs from "fs";

const apiKey = "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";
const text = "Hello, this is a test of the OpenAI text-to-speech API.";

async function textToSpeech(apiKey, text, model = "tts-1", voice = "nova") {
  const url = "https://api.openai.com/v1/audio/speech";
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };
  const data = {
    model: model,
    input: text,
    voice: voice,
  };

  try {
    const response = await axios.post(url, data, {
      headers: headers,
      responseType: "arraybuffer",
    });
    fs.writeFileSync("output_audio.mp3", response.data);
    console.log("Audio saved as output_audio.mp3");
  } catch (error) {
    console.error(`Error: ${error.response.status}`);
    console.error(error.response.data);
  }
}
textToSpeech(apiKey, text);
