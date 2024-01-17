import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import Whiteboard from "./components/Whiteboard";
import { useState, createContext } from "react";
import { UI } from "./components/UI";

export const syncAudioWithTextContext = createContext(null);

function App() {
  const [syncAudioWithText, setSyncAudioWithText] = useState(false);

  return (
    <syncAudioWithTextContext.Provider
      value={{ syncAudioWithText, setSyncAudioWithText }}
    >
      <Whiteboard />
      {/* <UI /> */}
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 42 }}>
        <color attach="background" args={["#ececec"]} />
        <Experience />
      </Canvas>
    </syncAudioWithTextContext.Provider>
  );
}

export default App;
