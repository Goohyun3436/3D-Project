import { useRef, useEffect } from 'react';
import { OrbitControls } from '@react-three/drei';
import { useControls } from 'leva';

// leva로 sphereGeometry args 상태값 변경
const SphereLeva = () => {
  const refMesh = useRef();
  const refWireMesh = useRef();

  const { radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength } = useControls({
    radius: { value: 1, min: 0.1, max: 5, step: 0.01 },
    widthSegments: { value: 32, min: 0, max: 256, step: 1 }, // 양의 정수만 가능
    heightSegments: { value: 32, min: 0, max: 256, step: 1 },
    phiStart: { value: 0, min: 0, max: 360, step: 0.1 }, // y 축 기준
    phiLength: { value: 360, min: 0, max: 360, step: 0.1 }, // y 축 기준
    thetaStart: { value: 0, min: 0, max: 180, step: 0.1 }, // y 축 기준
    thetaLength: { value: 180, min: 0, max: 180, step: 0.1 }, // y 축 기준
  });

  useEffect(() => {
    refWireMesh.current.geometry = refMesh.current.geometry;
  }, [radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength]);

  return (
    <>
      <OrbitControls />

      <ambientLight intensity={0.1} />
      <directionalLight position={[2, 1, 3]} intensity={0.5} />

      <mesh ref={refMesh}>
        <sphereGeometry
          args={[
            radius,
            widthSegments,
            heightSegments,
            phiStart * (Math.PI / 180),
            phiLength * (Math.PI / 180),
            thetaStart * (Math.PI / 180),
            thetaLength * (Math.PI / 180),
          ]}
        />
        <meshStandardMaterial color='#1abc9c' />
      </mesh>

      <mesh ref={refWireMesh}>
        <meshStandardMaterial emissive='yellow' wireframe={true} />
      </mesh>

      <axesHelper scale={10} />
    </>
  );
};

export default SphereLeva;
