import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls, useTexture } from '@react-three/drei';

const Toon = () => {
  const mesh1 = useRef();
  const mesh2 = useRef();

  const texture = useTexture('./images/tone/threeTone.jpg');
  // 텍스처의 픽셀화된 모습을 유지하도록 함.
  texture.minFilter = THREE.NearestFilter; // 텍스처가 축소될 때 => 가장 가까운 픽셀의 값을 사용하여 텍스처를 축소하는 필터링 방법
  texture.magFilter = THREE.NearestFilter; // 텍스처가 확대될 때 => 가장 가까운 픽셀의 값을 사용하여 텍스처를 확대하는 필터링 방법

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
        <meshToonMaterial gradientMap={texture} color='cyan' />
      </mesh>

      <mesh ref={mesh2} position={[-0.7, 0, 0]}>
        <torusGeometry args={[0.5, 0.2]} />
      </mesh>
    </>
  );
};

export default Toon;
