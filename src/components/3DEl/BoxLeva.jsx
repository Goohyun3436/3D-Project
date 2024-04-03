import { useRef, useEffect } from 'react';
import { OrbitControls } from '@react-three/drei';
import { useControls } from 'leva';

// leva로 boxGeometry args 상태값 변경
const BoxLeva = () => {
  const refMesh = useRef();
  const refWireMesh = useRef();

  const { xSize, ySize, zSize, xSegments, ySegments, zSegments } = useControls({
    xSize: { value: 1, min: 0.1, max: 5, step: 0.01 }, // value: 초기값, min: 컨트롤러 최소값, max: 컨트롤러 최대값, step: 컨트롤러 변화값
    ySize: { value: 1, min: 0.1, max: 5, step: 0.01 },
    zSize: { value: 1, min: 0.1, max: 5, step: 0.01 },
    xSegments: { value: 1, min: 1, max: 10, step: 1 }, // segments는 1보다 큰 정수값이어야 함.
    ySegments: { value: 1, min: 1, max: 10, step: 1 },
    zSegments: { value: 1, min: 1, max: 10, step: 1 },
  });

  // geometry를 재사용하여 메모리 절약
  useEffect(() => {
    refWireMesh.current.geometry = refMesh.current.geometry;
  }, [xSize, ySize, zSize, xSegments, ySegments, zSegments]);

  return (
    <>
      <OrbitControls />

      <ambientLight intensity={0.1} />
      <directionalLight position={[2, 1, 3]} intensity={0.5} />

      <mesh ref={refMesh}>
        <boxGeometry args={[xSize, ySize, zSize, xSegments, ySegments, zSegments]} />
        <meshStandardMaterial color='#1abc9c' />
      </mesh>

      <mesh ref={refWireMesh}>
        <meshStandardMaterial emissive='yellow' wireframe={true} />
      </mesh>
    </>
  );
};

export default BoxLeva;
