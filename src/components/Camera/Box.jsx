import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useControls } from 'leva';

const torusGeometry = new THREE.TorusGeometry(0.4, 0.1, 32, 32);
const torusMaterial = new THREE.MeshStandardMaterial({
  color: '#b86ed5',
  roughness: 0.5,
  metalness: 0.9,
});

const Box = () => {
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const smallSpherePivot = state.scene.getObjectByName('smallSpherePivot');
    smallSpherePivot.rotation.y = THREE.MathUtils.degToRad(time * 50);

    const target = new THREE.Vector3();
    // 빨간색 구의 좌표 추출하여 target 백터 객체에 저장
    smallSpherePivot.children[0].getWorldPosition(target);
    // 카메라 position에 적용
    state.camera.position.copy(target);

    const ghostSpherePivot = state.scene.getObjectByName('ghostSpherePivot');
    // 빨간색 구의 y회전 각도보다 30도 더 회전시킴
    ghostSpherePivot.rotation.y = THREE.MathUtils.degToRad(time * 50 + 30);
    // ghostSpherePivot의 좌표를 추출하여 target 백터 객체에 저장
    ghostSpherePivot.children[0].getWorldPosition(target);
    // 카메라의 타겟 좌표에 적용
    state.camera.lookAt(target);
  });

  const { camera } = useThree();

  return (
    <>
      <OrbitControls />

      <ambientLight color='#ffffff' intensity={7} />

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

      {/* smallSpherePivot의 다음 위치를 추적하기 위한 그룹 */}
      <group name='ghostSpherePivot'>
        <object3D position={[3, 0.5, 0]} />
      </group>
    </>
  );
};

export default Box;
