import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const torusGeometry = new THREE.TorusGeometry(0.4, 0.1, 32, 32);
const torusMaterial = new THREE.MeshStandardMaterial({
  color: '#b86ed5',
  roughness: 0.5,
  metalness: 0.9,
});

const Ambient = () => {
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const smallSpherePivot = state.scene.getObjectByName('smallSpherePivot');
    // 작은 공 회전
    smallSpherePivot.rotation.y = THREE.MathUtils.degToRad(time * 50);
  });

  return (
    <>
      <OrbitControls />

      {/* color: 조명 색상, intensity: 조명 세기 */}
      <ambientLight color='#ff0000' intensity={7} />

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

      {/* group 이름을 지정해두면 이후에 그룹 이름을 통해 해당 그룹을 참조할 수 있음 */}
      <group name='smallSpherePivot'>
        <mesh position={[3, 0.5, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color='#e74c3c' roughness={0.2} metalness={0.5} />
        </mesh>
      </group>
    </>
  );
};

export default Ambient;
