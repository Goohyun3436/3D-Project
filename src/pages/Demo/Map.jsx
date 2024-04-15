import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Clone, Environment, OrbitControls, Text, useAnimations, useGLTF, useTexture } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';

function Floor({ name, position, isSelected }) {
  if (isSelected) position[0] += 6;

  return (
    <group name={`floor${name}`} position={[position[0], position[1], position[2]]}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[5, 0.1, 10, 1, 1, 1]} />
        <meshStandardMaterial color={isSelected ? '#e67e22' : '#a7a7a7'} opacity={0.5} transparent={true} />
      </mesh>

      <Text position={[0, 0, 5.5]} scale={0.35} color='white'>
        {name}
      </Text>
    </group>
  );
}

const Map = () => {
  const floors = [
    {
      id: 1,
      name: '1F 로비',
      position: [0, -4, 0],
      isSelected: false,
    },
    {
      id: 2,
      name: '2F 오피스',
      position: [0, -2, 0],
      isSelected: false,
    },
    {
      id: 3,
      name: '3F 전산실',
      position: [0, 0, 0],
      isSelected: true,
    },
    {
      id: 4,
      name: '4F 전기실',
      position: [0, 2, 0],
      isSelected: false,
    },
    {
      id: 5,
      name: '5F 옥상',
      position: [0, 4, 0],
      isSelected: false,
    },
  ];

  return (
    <>
      {/* <OrbitControls /> */}
      <axesHelper scale={100} />
      <Environment preset='sunset' />

      {floors.map((floor) => (
        <Floor key={floor.id} name={floor.name} position={floor.position} isSelected={floor.isSelected} />
      ))}
    </>
  );
};

export default Map;
