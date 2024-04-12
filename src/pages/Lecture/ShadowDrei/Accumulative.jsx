import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { AccumulativeShadows, OrbitControls, RandomizedLight } from '@react-three/drei';

const torusGeometry = new THREE.TorusGeometry(0.4, 0.1, 32, 32);
const torusMaterial = new THREE.MeshStandardMaterial({
  color: '#d5c96e',
  roughness: 0.5,
  metalness: 0.9,
});

const Accumulative = () => {
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const smallSpherePivot = state.scene.getObjectByName('smallSpherePivot');
    smallSpherePivot.rotation.y = THREE.MathUtils.degToRad(time * 50);
  });

  return (
    <>
      <OrbitControls />

      <ambientLight intensity={1} />
      <directionalLight color='#ffffff' intensity={1} position={[0, 5, 0]} />

      <mesh castShadow position-y={1.7}>
        <torusKnotGeometry args={[1, 0.2, 128, 32]} />
        <meshStandardMaterial color='#ffffff' roughness={0.1} metalness={0.2} />
      </mesh>

      {new Array(8).fill().map((item, index) => (
        <group key={index} rotation-y={THREE.MathUtils.degToRad(45 * index)}>
          <mesh castShadow geometry={torusGeometry} material={torusMaterial} position={[3, 0.5, 0]} />
        </group>
      ))}

      <group name='smallSpherePivot'>
        <mesh castShadow position={[3, 0.5, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color='#e74c3c' roughness={0.2} metalness={0.5} />
        </mesh>
      </group>

      <AccumulativeShadows
        position={[0, 0.01, 0]} // 그림자가 표현될 평면 메시의 위치 좌표
        scale={10} // 그림자가 표현될 평면 메시의 크기
        color='#000000' // 그림자 색상
        opacity={0.7} // 그림자 투명도
        alphaTest={1} // 그림자에 대한 픽셀의 알파값이 설정값보다 작을 때만 표현
        frames={30} // 처음 렌더링될 때의 프레임 수 (초기에 그림자가 페이드인 되는 속도) , Infinity: 동적 그림자로 설정
        // temporal
        // blend={30}
      >
        <RandomizedLight
          radius={0.5} // 그림자 경계도
          ambient={0.21} // Ambient Occlusion 에 대한 속성값, 값이 작아질 수록 그림자와 반사가 약해짐.
          intensity={1.5} // 광원 강도
          position={[5, 3, 0]} /// 광원 위치 좌표
        />

        <RandomizedLight
          amount={4} // 광원의 개수 (기본값: 8)
          radius={0.5} // 그림자 경계도
          ambient={0.21} // Ambient Occlusion 에 대한 속성값, 값이 작아질 수록 그림자와 반사가 약해짐.
          intensity={1.5} // 광원 강도
          position={[-5, 3, 0]} /// 광원 위치 좌표
        />
      </AccumulativeShadows>
    </>
  );
};

export default Accumulative;
