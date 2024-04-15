import { useRef, useEffect } from 'react';
import { OrbitControls, useTexture } from '@react-three/drei';

const Matcap = () => {
  const mesh1 = useRef();
  const mesh2 = useRef();

  // useTexture를 사용하여 이미지를 로드하고, 로드된 텍스처 객체를 반환
  const matcap = useTexture('./images/matcap/gold.jpg');

  useEffect(() => {
    mesh2.current.material = mesh1.current.material;
  }, []);

  return (
    <>
      {/* 컨트롤러 */}
      <OrbitControls />

      <mesh ref={mesh1} position={[0.7, 0, 0]}>
        <torusKnotGeometry args={[0.5, 0.15, 256, 128]} />
        <meshMatcapMaterial matcap={matcap} flatShading={false} />
      </mesh>

      <mesh ref={mesh2} position={[-0.7, 0, 0]}>
        <torusGeometry args={[0.5, 0.2]} />
      </mesh>
    </>
  );
};

export default Matcap;
