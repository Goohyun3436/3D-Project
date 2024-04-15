import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const torusGeometry = new THREE.TorusGeometry(0.4, 0.1, 32, 32);
const torusMaterial = new THREE.MeshStandardMaterial({
  color: '#d5c96e',
  roughness: 0.5,
  metalness: 0.9,
});

const Spot = () => {
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const smallSpherePivot = state.scene.getObjectByName('smallSpherePivot');
    smallSpherePivot.rotation.y = THREE.MathUtils.degToRad(time * 50);
    smallSpherePivot.children[0].getWorldPosition(light.current.target.position);
  });

  const light = useRef();

  const { scene } = useThree();
  useEffect(() => {
    scene.add(light.current.target);

    return () => {
      scene.remove(light.current.target);
    };
  }, [light.current]);

  return (
    <>
      <OrbitControls />

      <ambientLight intensity={0.3} />
      <spotLight
        ref={light}
        shadow-mapSize={[1024, 1024]}
        shadow-radius={32} // 그림자 경계도
        shadow-blurSample={32} // 그림자 흐림도
        shadow-bias={-0.0001} // 그림자 매핑 시 간격
        castShadow
        color='#ffffff'
        intensity={20}
        position={[0, 5, 0]}
        angle={THREE.MathUtils.degToRad(60)}
      />

      <mesh receiveShadow rotation-x={THREE.MathUtils.degToRad(-90)}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color='#7c9fc3' roughness={0.5} metalness={0.5} side={THREE.DoubleSide} />
      </mesh>

      <mesh castShadow receiveShadow position-y={1.7}>
        <torusKnotGeometry args={[1, 0.2, 128, 32]} />
        <meshStandardMaterial color='#ffffff' roughness={0.1} metalness={0.2} />
      </mesh>

      {new Array(8).fill().map((item, index) => (
        <group key={index} rotation-y={THREE.MathUtils.degToRad(45 * index)}>
          <mesh castShadow receiveShadow geometry={torusGeometry} material={torusMaterial} position={[3, 0.5, 0]} />
        </group>
      ))}

      <group name='smallSpherePivot'>
        <mesh castShadow receiveShadow position={[3, 0.5, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color='#e74c3c' roughness={0.2} metalness={0.5} />
        </mesh>
      </group>
    </>
  );
};

export default Spot;
