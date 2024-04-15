import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { ContactShadows, OrbitControls } from '@react-three/drei';

const torusGeometry = new THREE.TorusGeometry(0.4, 0.1, 32, 32);
const torusMaterial = new THREE.MeshStandardMaterial({
  color: '#d5c96e',
  roughness: 0.5,
  metalness: 0.9,
});

const Contact = () => {
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const smallSpherePivot = state.scene.getObjectByName('smallSpherePivot');
    smallSpherePivot.rotation.y = THREE.MathUtils.degToRad(time * 50);
  });

  return (
    <>
      <OrbitControls />

      <ambientLight intensity={1} />
      <directionalLight castShadow color='#ffffff' intensity={1} position={[0, 5, 0]} />

      <ContactShadows
        position={[0, 0, 0]} // 그림자가 표현될 평면 메시의 위치 좌표
        scale={10} // 그림자가 표현될 평면 메시의 크기
        resolution={512} // 그림자 이미지 크기
        color='#000000' // 그림자 색상
        opacity={0.4} // 그림자 투명도
        blur={0.5} // 그림자 흐림도
        // frames={1} // 1: 정적 그림자
      />

      <mesh position-y={1.7}>
        <torusKnotGeometry args={[1, 0.2, 128, 32]} />
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

export default Contact;
