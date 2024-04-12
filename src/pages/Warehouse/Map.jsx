import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { Clone, Environment, OrbitControls, useAnimations, useGLTF } from '@react-three/drei';

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

      {new Array(5).fill().map((item, index) => (
        <Clone
          object={warehouse1.scene}
          rotation-y={THREE.MathUtils.degToRad(90)}
          position={[40, 0, 10 + index * 40]}
        />
      ))}

      <mesh position={[5, 0, 10]}>
        <primitive scale={1} object={warehouse2.scene} />
      </mesh>

      {new Array(2).fill().map((item, index) => (
        <Clone
          object={warehouse3.scene}
          scale={7}
          rotation-y={THREE.MathUtils.degToRad(180)}
          position={[80, 11.6, 40 + index * 120]}
        />
      ))}

      {new Array(4).fill().map((item, index) => (
        <Clone
          object={truck1.scene}
          scale={0.05}
          rotation-y={THREE.MathUtils.degToRad(90)}
          position={[10, 5.5, 180 - index * 40]}
        />
      ))}

      <mesh position={[50, 0, 100]} rotation-x={THREE.MathUtils.degToRad(-90)}>
        <planeGeometry args={[100, 200]} />
        <meshStandardMaterial color='#aeaeae' roughness={3} />
      </mesh>
    </>
  );
};

export default Map;
