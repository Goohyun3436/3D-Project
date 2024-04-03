import * as THREE from 'three';
import { Box, OrbitControls } from '@react-three/drei';

// Geometry를 생성하는 3가지 방법
const Cubes = () => {
  // 방법.3-1
  const MyBox = (props) => {
    const geom = new THREE.BoxGeometry();
    return <mesh {...props} geometry={geom}></mesh>;
  };

  return (
    <>
      <OrbitControls />

      <ambientLight intensity={0.1} />
      <directionalLight position={[2, 1, 3]} intensity={0.5} />

      {/* 방법.1 */}
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color='#1abc9c' />
      </mesh>

      {/* 방법.2 */}
      <Box position={[1.2, 0, 0]}>
        <meshStandardMaterial color='#8e44ad' />
      </Box>

      {/* 방법.3-2 */}
      <MyBox position={[2.4, 0, 0]}>
        <meshStandardMaterial color='#e74c3c' />
      </MyBox>
    </>
  );
};

export default Cubes;
