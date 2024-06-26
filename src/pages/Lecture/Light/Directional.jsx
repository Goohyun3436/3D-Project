import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useHelper } from '@react-three/drei';

const torusGeometry = new THREE.TorusGeometry(0.4, 0.1, 32, 32);
const torusMaterial = new THREE.MeshStandardMaterial({
  color: '#b86ed5',
  roughness: 0.5,
  metalness: 0.9,
});

const Directional = () => {
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const smallSpherePivot = state.scene.getObjectByName('smallSpherePivot');
    smallSpherePivot.rotation.y = THREE.MathUtils.degToRad(time * 50);
    // 작은 위치 추적하여 조명 타겟 포지션 설정
    smallSpherePivot.children[0].getWorldPosition(light.current.target.position);
  });

  const light = useRef();

  useHelper(light, THREE.DirectionalLightHelper); // directionalLight 헬퍼 추가

  const { scene } = useThree(); // 장면 객체

  useEffect(() => {
    scene.add(light.current.target); // 장면에 타겟 객체 추가
    return () => {
      scene.remove(light.current.target); // 언마운트시 장면에서 타겟 제거
    };
  }, []);

  return (
    <>
      <OrbitControls />

      {/* color: 조명 색상, intensity: 조명 세기, position: 조명 위치(x, y, z), target-position: 조명의 타겟 위치(x, y, z) */}
      <directionalLight ref={light} color={0xffffff} intensity={5} position={[0, 5, 0]} target-position={[0, 0, 1]} />

      <mesh rotation-x={THREE.MathUtils.degToRad(-90)}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color='#2c3e50' roughness={0.5} metalness={0.5} side={THREE.DoubleSide} />
      </mesh>

      <mesh rotation-x={THREE.MathUtils.degToRad(-90)}>
        <sphereGeometry args={[1.5, 64, 64, 0, Math.PI]} />
        <meshStandardMaterial color='#ffffff' roughness={0.1} metalness={0.2} />
      </mesh>

      {new Array(8).fill().map((item, index) => (
        <group key={index} rotation-y={THREE.MathUtils.degToRad(45 * index)}>
          <mesh geometry={torusGeometry} material={torusMaterial} position={[3, 0.5, 0]} />
        </group>
      ))}

      <group name='smallSpherePivot'>
        <mesh position={[3, 0.5, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color='#e74c3c' roughness={0.2} metalness={0.5} />
        </mesh>
      </group>
    </>
  );
};

export default Directional;
