import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Clone, Environment, OrbitControls, useAnimations, useGLTF, useTexture } from '@react-three/drei';
import Stone from '../../components/Texture/Floor/Stone';
import CCTV from './CCTV';

const Map = () => {
  const warehouse1 = useGLTF('./models/map/warehouse/warehouse1.glb');
  const warehouse2 = useGLTF('./models/map/warehouse/warehouse2.glb');
  const warehouse3 = useGLTF('./models/map/warehouse/warehouse3.glb');

  const truck1 = useGLTF('./models/car/truck1.glb');

  return (
    <>
      <OrbitControls />
      <axesHelper scale={100} />
      <Environment preset='sunset' />

      {new Array(4).fill().map((item, index) => (
        <Clone
          key={index}
          object={warehouse1.scene}
          scale={1.3}
          rotation-y={THREE.MathUtils.degToRad(90)}
          position={[40, 0, 12 + index * 52]}
        />
      ))}

      <mesh position={[5, 0, 12]}>
        <primitive scale={1} object={warehouse2.scene} />
      </mesh>

      {new Array(2).fill().map((item, index) => (
        <Clone
          key={index}
          object={warehouse3.scene}
          scale={7}
          rotation-y={THREE.MathUtils.degToRad(180)}
          position={[80, 11.47, 40 + index * 120]}
        />
      ))}

      <Clone object={truck1.scene} scale={0.05} rotation-y={THREE.MathUtils.degToRad(180)} position={[30, 5.5, 190]} />
      <Clone object={truck1.scene} scale={0.05} rotation-y={THREE.MathUtils.degToRad(180)} position={[30, 5.5, 140]} />
      <Clone object={truck1.scene} scale={0.05} rotation-y={THREE.MathUtils.degToRad(90)} position={[10, 5.5, 110]} />
      <Clone object={truck1.scene} scale={0.05} rotation-y={THREE.MathUtils.degToRad(180)} position={[30, 5.5, 40]} />
      <Clone object={truck1.scene} scale={0.05} rotation-y={THREE.MathUtils.degToRad(180)} position={[30, 5.5, 30]} />

      <CCTV position={[9.25, 2.5, 12]} rotation={[0, 0, 0]} />
      <CCTV position={[45.3, 5.5, 40]} rotation={[0, THREE.MathUtils.degToRad(-105), 0]} />
      <CCTV position={[45.3, 5.5, 91.5]} rotation={[0, THREE.MathUtils.degToRad(-105), 0]} />
      <CCTV position={[45.3, 5.5, 143]} rotation={[0, THREE.MathUtils.degToRad(-105), 0]} />
      <CCTV position={[45.3, 5.5, 195]} rotation={[0, THREE.MathUtils.degToRad(-105), 0]} />

      <Stone position={[50, 0, 100]} rotation={[THREE.MathUtils.degToRad(-90), 0, 0]} planeArgs={[100, 200]} />
    </>
  );
};

export default Map;
