import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// 전체/상대 좌표계와 회전하는 boxGeometry
const Box = () => {
  const refMesh = useRef();

  useFrame((state, delta) => {
    refMesh.current.rotation.z += delta;
  });

  return (
    <>
      <directionalLight position={[1, 1, 1]} />

      {/* 월드(World) 좌표계 */}
      <axesHelper scale={10} />

      {/* 컨트롤러 */}
      <OrbitControls />

      <mesh
        ref={refMesh}
        position-y={2} // position={[0, 2, 0]} 와 동일
        rotation-x={THREE.MathUtils.degToRad(45)} // rotation-x={45 * (Math.PI / 180)} 와 동일
        scale={[2, 1, 1]}
      >
        <boxGeometry />
        <meshStandardMaterial color='#e67e22' opacity={0.5} transparent={true} />

        {/* 상대 좌표계 */}
        <axesHelper />

        <mesh position-y={1} scale={[0.1, 0.1, 0.1]}>
          <sphereGeometry />
          <meshStandardMaterial color='red' />

          <axesHelper scale={10} />
        </mesh>
      </mesh>
    </>
  );
};

export default Box;
