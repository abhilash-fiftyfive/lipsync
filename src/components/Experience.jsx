import {
  Environment,
  OrbitControls,
  useTexture,
  useVideoTexture,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Avatar } from "./Avatar";

export const Experience = () => {
  const texture = useTexture("textures/whiteBoard.png");
  // const backgroundVideo = useVideoTexture("textures/earth.mp4");
  const viewport = useThree((state) => state.viewport);

  return (
    <>
      <OrbitControls />
      <Avatar position={[1, -3, 5.5]} scale={2} />
      {/* <Sensei position={[-1, -3, 5.5]} scale={2} /> */}
      {/* <NewAvatar /> */}
      <Environment preset="forest" />
      <mesh>
        <planeGeometry args={[viewport.width, viewport.height]} />
        <meshBasicMaterial map={texture} />
      </mesh>
    </>
  );
};
