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

const Directional = () => {
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const smallSpherePivot = state.scene.getObjectByName('smallSpherePivot');
    smallSpherePivot.rotation.y = THREE.MathUtils.degToRad(time * 50);
    smallSpherePivot.children[0].getWorldPosition(light.current.target.position);
  });

  const light = useRef();
  const shadowCamera = useRef();

  const { scene } = useThree();
  useEffect(() => {
    scene.add(light.current.target);
    // 그림자를 위한 카메라를 인자로하여 카메라 헬퍼 객체를 생성 후 shadowCamera.current에 할당
    shadowCamera.current = new THREE.CameraHelper(light.current.shadow.camera);
    // shadowcamera는 Orthographic Camera (정사 투영 카메라)에 해당하는 카메라, 오렌지색: 절두체
    scene.add(shadowCamera.current);

    return () => {
      scene.remove(light.current.target);
      scene.remove(shadowCamera.current);
    };
  }, [light.current]);

  return (
    <>
      <OrbitControls />

      <ambientLight intensity={0.3} />
      <directionalLight
        ref={light}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-mapSize={[512, 512]}
        castShadow
        color={0xffffff}
        intensity={0.9}
        position={[0, 5, 0]}
        target-position={[0, 0, 0]}
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

export default Directional;
