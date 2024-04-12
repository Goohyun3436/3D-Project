import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';

const Phong = () => {
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
        <meshPhongMaterial
          visible={true} // 렌더링 여부
          transparent={false} // opacity 사용 여부
          opacity={1} // 재질 불투명도 0 ~ 1
          depthTest={true} // 렌더링 시에 depth buffer 사용하여 검사할 것인지 여부
          depthWrite={true} // 렌더링 되고 있는 mesh의 z값을 depth buffer 에 기록할 것인지 여부
          side={THREE.FrontSide} // mesh의 어떤면을 렌더링할 것인지 (FrontSide / BackSide / DoubleSide)
          color={0xff0000} // 재질 색상
          emissive={0x000000} // 재질에서 방출하는 색상
          specular={0xffff00} // 광원에 의해 반사되는 색상
          shininess={100} // 반사의 정도
          flatShading={true} // 재질의 면을 평평하게 할 것인지
          wireframe={false}
        />
      </mesh>

      <mesh ref={mesh2} position={[-0.7, 0, 0]}>
        <torusGeometry args={[0.5, 0.2]} />
      </mesh>
    </>
  );
};

export default Phong;
