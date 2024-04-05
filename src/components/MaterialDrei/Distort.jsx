import { MeshDistortMaterial, OrbitControls } from '@react-three/drei';

const Distort = () => {
  return (
    <>
      <OrbitControls />

      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 1, 0]} />
      <directionalLight position={[1, 2, 8]} intensity={0.7} />

      <mesh>
        <torusGeometry />
        <MeshDistortMaterial
          distort={0.9} // 왜곡 정도
          speed={3} // 왜곡 속도
        />
      </mesh>
    </>
  );
};

export default Distort;
