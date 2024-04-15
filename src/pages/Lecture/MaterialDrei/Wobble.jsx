import { MeshWobbleMaterial, OrbitControls } from '@react-three/drei';

const Wobble = () => {
  return (
    <>
      <OrbitControls />

      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 1, 0]} />
      <directionalLight position={[1, 2, 8]} intensity={0.7} />

      <mesh>
        <torusGeometry />
        <MeshWobbleMaterial
          factor={1} // 흔들림 정도
          speed={10} // 흔들림 속도
        />
      </mesh>
    </>
  );
};

export default Wobble;
