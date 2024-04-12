import { MeshReflectorMaterial, OrbitControls } from '@react-three/drei';

const Reflector = () => {
  return (
    <>
      <OrbitControls />

      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 1, 0]} />
      <directionalLight position={[1, 2, 8]} intensity={0.7} />

      <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={30}
          roughness={1}
          depthScale={0.7}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color='#777777'
          metalness={0.5}
        />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <boxGeometry />
        <meshStandardMaterial color='cyan' />
      </mesh>
    </>
  );
};

export default Reflector;
