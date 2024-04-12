import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, HueSaturation, BrightnessContrast, DotScreen, Bloom } from '@react-three/postprocessing';
import { useControls } from 'leva';

const torusGeometry = new THREE.TorusGeometry(0.4, 0.1, 32, 32);
const torusMaterial = new THREE.MeshStandardMaterial({
  color: '#d5c96e',
  roughness: 0.5,
  metalness: 0.9,
});

const Box = () => {
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const smallSpherePivot = state.scene.getObjectByName('smallSpherePivot');
    smallSpherePivot.rotation.y = THREE.MathUtils.degToRad(time * 50);
  });

  // HueSaturation(색상, 채도)
  // const { enabled, hue, saturation } = useControls({
  //   enabled: { value: true },
  //   hue: { value: 0, min: 0, max: Math.PI, step: 0.1 },
  //   saturation: { value: 0, min: 0, max: Math.PI, step: 0.1 },
  // });

  // // BrightnessContrast(밝기, 대비)
  // const { brightness, contrast } = useControls({
  //   brightness: { value: 0, min: -1, max: 1, step: 0.1 },
  //   contrast: { value: 0, min: -1, max: 1, step: 0.1 },
  // });

  // BrightnessContrast(밝기, 대비)
  // const { angle, scale } = useControls('dotScreen', {
  //   angle: { value: 1.57, min: 0, max: Math.PI * 2, step: 0.1 },
  //   scale: { value: 1.57, min: 0, max: 10, step: 0.1 },
  // });

  const { intensity, mipmapBlur, luminanceThreshold, luminanceSmoothing } = useControls('Bloom', {
    intensity: { value: 1, min: 0, max: 10, step: 0.01 },
    mipmapBlur: { value: false },
    luminanceThreshold: { value: 0.9, min: 0, max: 1, step: 0.01 },
    luminanceSmoothing: { value: 0.025, min: 0, max: 2, step: 0.01 },
  });

  return (
    <>
      <OrbitControls />

      <EffectComposer
        disableNormalPass // 정규 렌더링 패스(normal rendering pass) 활성화 여부
        // enabled={enabled} // postProcessing 사용 여부
      >
        {/* <HueSaturation
          hue={hue} //색조
          saturation={saturation} // 채도
        />

        <BrightnessContrast
          brightness={brightness} // 밝기
          contrast={contrast} // 대비
        /> */}

        {/* <DotScreen
          angle={angle} // 도트 패턴의 방향
          scale={scale} // 도트 크기
        /> */}

        <Bloom
          intensity={intensity}
          mipmapBlur={mipmapBlur}
          luminanceThreshold={luminanceThreshold}
          luminanceSmoothing={luminanceSmoothing}
        />
      </EffectComposer>

      <ambientLight intensity={0.3} />
      <directionalLight castShadow color={0xffffff} intensity={0.9} position={[0, 5, 0]} />

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
          <meshStandardMaterial
            color='#e74c3c'
            roughness={0.2}
            metalness={0.5}
            // Bloom 효과
            emissive='#ff4c3c'
            toneMapped={false}
            emissiveIntensity={50}
          />

          <pointLight color='#ff4c3c' intensity={20} />
        </mesh>
      </group>
    </>
  );
};

export default Box;
