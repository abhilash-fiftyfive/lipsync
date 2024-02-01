import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import Whiteboard from "./components/Whiteboard";
import { useState, createContext, useContext } from "react";
import { UI } from "./components/UI";
import useChats from "./components/hooks/useChats";

export const syncAudioWithTextContext = createContext(null);

export const ChatContext = createContext(null);

export function chatContext() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const context = useContext(ChatContext);
  if (!context) throw new Error("Need chat context");
  return context;
}

function App() {
  const [syncAudioWithText, setSyncAudioWithText] = useState(false);
  const val = useChats();

  return (
    <ChatContext.Provider value={val}>
      <syncAudioWithTextContext.Provider
        value={{ syncAudioWithText, setSyncAudioWithText }}
      >
        <Whiteboard />
        <UI />
        <Canvas shadows camera={{ position: [0, 0, 8], fov: 42 }}>
          <color attach="background" args={["#ececec"]} />
          <Experience />
        </Canvas>
      </syncAudioWithTextContext.Provider>
    </ChatContext.Provider>
  );
}

export default App;
