import { MeshDiscardMaterial, OrbitControls } from '@react-three/drei';

const Discard = () => {
  return (
    <>
      <OrbitControls />

      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 1, 0]} />
      <directionalLight position={[1, 2, 8]} intensity={0.7} />

      <mesh>
        <torusGeometry />
        <MeshDiscardMaterial />
      </mesh>
    </>
  );
};

export default Discard;
