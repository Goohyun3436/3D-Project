import { useRef, useEffect, useState, memo } from 'react';
import useStore from '../../store';
import * as THREE from 'three';
import { Clone, Environment, OrbitControls, useGLTF, useHelper } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

function CCTV({ position, rotation, angle }) {
  const model = useGLTF('./models/cctv/cctv_camera.glb');

  function calLightPosition(position, rotation, distance = 1) {
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

  const { scene } = useThree();

  const spotLightHelper = useHelper(light, THREE.SpotLightHelper);

  useEffect(() => {
    scene.remove(spotLightHelper.current);
  }, []);

  return (
    <>
      <mesh castShadow receiveShadow position={position} rotation={rotation}>
        <Clone scale={0.02} object={model.scene} />
      </mesh>

      <spotLight
        ref={light}
        shadow-mapSize={[1024, 1024]}
        shadow-radius={8} // 그림자 경계도
        shadow-blurSample={8} // 그림자 흐림도
        shadow-bias={-0.0005} // 그림자 매핑 시 간격
        castShadow
        color={0x3cff7d}
        intensity={500}
        position={position}
        target-position={calLightPosition(position, rotation)}
        angle={angle}
        distance={50}
        penumbra={0.1}
      />
    </>
  );
}

const Map = () => {
  const floor1 = useGLTF('./models/map/cnsi-office/floor-1.glb');

  useEffect(() => {
    floor1.scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
  }, [floor1.scene]);

  return (
    <>
      <OrbitControls />
      <axesHelper scale={100} />
      <ambientLight color='#ffffff' intensity={5} />
      <directionalLight
        position={[6, 10, 5]}
        intensity={0.5}
        angle={0.45}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={500}
        shadow-bias={-0.002}
        shadow-camera-top={300}
        shadow-camera-bottom={-300}
        shadow-camera-left={-300}
        shadow-camera-right={300}
      />

      <primitive castShadow receiveShadow scale={1} object={floor1.scene} />

      <CCTV
        position={[38, 4, -35]}
        rotation={[0, THREE.MathUtils.degToRad(-40), 0]}
        angle={THREE.MathUtils.degToRad(40)}
      />
      <CCTV
        position={[-2.5, 4, 10]}
        rotation={[0, THREE.MathUtils.degToRad(-90), 0]}
        angle={THREE.MathUtils.degToRad(70)}
      />

      <CCTV
        position={[18.5, 4, -12]}
        rotation={[0, THREE.MathUtils.degToRad(-45), 0]}
        angle={THREE.MathUtils.degToRad(40)}
      />
    </>
  );
};

export default Map;
