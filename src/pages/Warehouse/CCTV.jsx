import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Clone, useGLTF, useHelper } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

const CCTV = ({ position, rotation }) => {
  const model = useGLTF('./models/cctv/cctv_camera.glb');

  function calLightPosition(position, rotation, distance = 5) {
    // 원점 A의 좌표
    const ax = position[0];
    const ay = position[1];
    const az = position[2];

    // 원점 A가 바라보는 방향
    const theta = rotation[0]; // x 축 회전 각도
    const phi = rotation[1]; // y 축 회전 각도

    // 타겟 좌표 B의 x, y, z 좌표 계산
    const bx = ax + distance * Math.sin(phi) * Math.cos(theta);
    const by = ay + distance * Math.sin(phi) * Math.sin(theta);
    const bz = az + distance * Math.cos(phi);

    return [bx, by, bz];
  }

  const light = useRef();

  useHelper(light, THREE.SpotLightHelper);

  return (
    <>
      <mesh position={position} rotation={rotation}>
        <Clone scale={0.02} object={model.scene} />
      </mesh>

      <spotLight
        ref={light}
        color={0x3cff7d}
        intensity={100}
        position={position}
        target-position={calLightPosition(position, rotation)}
        distance={0}
        penumbra={0.1}
      />

      {/* <directionalLight
        ref={light}
        color={0x3cff7d}
        intensity={1}
        position={position}
        target-position={calLightPosition(position, rotation)}
      /> */}
    </>
  );
};

export default CCTV;
