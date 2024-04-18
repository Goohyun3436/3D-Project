import { useRef, useEffect, useState, memo } from 'react';
import useStore from '../../store';
import * as THREE from 'three';
import { Clone, Environment, Html, OrbitControls, Text, useGLTF, useHelper } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import styled from 'styled-components';

const TextStyle = styled.div`
  color: #fff;
  width: 400px;
  padding: 4px 8px 6px 8px;
  border-radius: 2px;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 24px;
    font-weight: 700;
    text-shadow: 0 2px #000;
  }
  .sub {
    font-size: 14px;
    font-weight: 500;
    font-style: italic;
    opacity: 0.6;
  }
`;

function CCTV({ cctvInfo }) {
  const { name, resolution, codec, algorithm, position, rotation, angle, isAlarm } = cctvInfo;

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
      <mesh
        castShadow
        receiveShadow
        position={position}
        rotation={[
          THREE.MathUtils.degToRad(rotation[0]),
          THREE.MathUtils.degToRad(rotation[1]),
          THREE.MathUtils.degToRad(rotation[2]),
        ]}
      >
        <Clone scale={0.02} object={model.scene} />
        <Html>
          <TextStyle>
            <div className='title'>{name}</div>
            <div className='sub'>
              {codec}, {resolution}
              <br />
              {algorithm}
            </div>
          </TextStyle>
        </Html>
      </mesh>

      <spotLight
        ref={light}
        shadow-mapSize={[1024, 1024]}
        shadow-radius={8} // 그림자 경계도
        shadow-blurSample={8} // 그림자 흐림도
        shadow-bias={-0.0005} // 그림자 매핑 시 간격
        castShadow
        color={isAlarm ? 0xff0000 : 0x3cff7d}
        intensity={500}
        position={position}
        target-position={calLightPosition(position, [
          THREE.MathUtils.degToRad(rotation[0]),
          THREE.MathUtils.degToRad(rotation[1]),
          THREE.MathUtils.degToRad(rotation[2]),
        ])}
        angle={THREE.MathUtils.degToRad(angle)}
        distance={50}
        penumbra={0.1}
      />
    </>
  );
}

function Light() {
  return (
    <>
      <ambientLight color='#ffffff' intensity={4} />
      <directionalLight
        position={[6, 10, 5]}
        intensity={1}
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
    </>
  );
}

function GlbModel({ url }) {
  const model = useGLTF(url);

  useEffect(() => {
    model.scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
  }, [model.scene]);

  return <primitive castShadow receiveShadow scale={1} object={model.scene} />;
}

const Map = () => {
  const { cctvList } = useStore((state) => state);

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
      {/* <axesHelper scale={100} /> */}

      <Light />

      <GlbModel url='./models/map/cnsi-office/floor-1.glb' />

      {cctvList.map((cctv) => (
        <CCTV key={cctv.id} cctvInfo={cctv} />
      ))}
    </>
  );
};

export default Map;
