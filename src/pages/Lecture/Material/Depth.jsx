import { useRef, useEffect } from 'react';
import { OrbitControls } from '@react-three/drei';

const Depth = () => {
  const mesh1 = useRef();
  const mesh2 = useRef();

  useEffect(() => {
    mesh2.current.material = mesh1.current.material;
  }, []);

  return (
    <>
      {/* 컨트롤러 */}
      <OrbitControls />

      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 1, 0]} />
      <directionalLight position={[1, 2, 8]} intensity={0.7} />

      <mesh ref={mesh1} position={[0.7, 0, 0]}>
        <torusKnotGeometry args={[0.5, 0.15, 256, 128]} />
        <meshDepthMaterial />
      </mesh>

      <mesh ref={mesh2} position={[-0.7, 0, 0]}>
        <torusGeometry args={[0.5, 0.2]} />
      </mesh>
    </>
  );
};

export default Depth;
