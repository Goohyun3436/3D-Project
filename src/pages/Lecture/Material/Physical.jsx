import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls, useTexture } from '@react-three/drei';

const Physical = () => {
  const mesh1 = useRef();
  const mesh2 = useRef();

  const { roughness, metalness } = useControls({
    roughness: { value: 0, min: 0, max: 1, step: 0.1 },
    metalness: { value: 0, min: 0, max: 1, step: 0.1 },
    clearcoat: { value: 0, min: 0, max: 1, step: 0.01 },
    clearcoatRoughness: { value: 0, min: 0, max: 1, step: 0.01 },
  });

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
        <meshPhysicalMaterial
          visible={true} // 렌더링 여부
          transparent={false} // opacity 사용 여부
          opacity={1} // 재질 불투명도 0 ~ 1
          depthTest={true} // 렌더링 시에 depth buffer 사용하여 검사할 것인지 여부
          depthWrite={true} // 렌더링 되고 있는 mesh의 z값을 depth buffer 에 기록할 것인지 여부
          side={THREE.FrontSide} // mesh의 어떤면을 렌더링할 것인지 (FrontSide / BackSide / DoubleSide)
          color={0xff0000} // 재질 색상
          emissive={0x00000}
          roughness={roughness} // 거칠기 0 ~ 1
          metalness={metalness} // 금속성 0 ~ 1 (거칠기와 금속성은 절절한 값 조절이 필요함)
          flatShading={false} // 재질의 면을 평평하게 할 것인지
          wireframe={false}
          clearcoat={clearcoat} // 코팅 0 ~ 1
          clearcoatRoughness={clearcoatRoughness} // 코팅 거칠기 0 ~ 1
        />
      </mesh>

      <mesh ref={mesh2} position={[-0.7, 0, 0]}>
        <torusGeometry args={[0.5, 0.2]} />
      </mesh>
    </>
  );
};

export default Physical;
