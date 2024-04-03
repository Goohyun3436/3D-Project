import { useRef, useEffect } from 'react';
import { OrbitControls, useTexture } from '@react-three/drei';

const Normal = () => {
  const mesh1 = useRef();
  const mesh2 = useRef();

  useEffect(() => {
    mesh2.current.material = mesh1.current.material;
  }, []);

  return (
    <>
      {/* 컨트롤러 */}
      <OrbitControls />

      <mesh ref={mesh1} position={[0.7, 0, 0]}>
        <torusKnotGeometry args={[0.5, 0.15, 256, 128]} />
        <meshNormalMaterial />
      </mesh>

      <mesh ref={mesh2} position={[-0.7, 0, 0]}>
        <torusGeometry args={[0.5, 0.2]} />
      </mesh>
    </>
  );
};

export default Normal;
