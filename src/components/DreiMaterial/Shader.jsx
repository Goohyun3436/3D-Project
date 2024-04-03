import * as THREE from 'three';
import { extend } from '@react-three/fiber';
import { OrbitControls, shaderMaterial } from '@react-three/drei';

const SimpleMaterial = new shaderMaterial(
  // [첫번째 인자] uColor라는 uniform을 정의하여 색상정보를 GPU에 전달
  {
    uColor: new THREE.Color(1, 0, 0),
  },

  // [두번째 인자] Vertex(꼭짓점) Shader: Geometry의 좌표값을 화면에 출력하기 위한 좌표로 변경하는 목적
  `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,

  // [세번째 인자] Fragment shader: mesh가 화면에 픽셀 단위로 표시될 때 각 픽셀에 생상 값을 결정하는 목적
  // 버텍스 쉐이더에서 계산된 정보를 사용하여 각 픽셀의 색상을 결정함.
  `
  uniform vec3 uColor;
  varying vec2 vUv;

  void main() {
    gl_FragColor = vec4(vUv.y * uColor, 1.0);
  }
`
);

// SimpleMaterial를 태그 형태로 사용하기 위해서 R3F의 extend 함수를 사용함.
extend({ SimpleMaterial });

const Shader = () => {
  return (
    <>
      <OrbitControls />

      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 1, 0]} />
      <directionalLight position={[1, 2, 8]} intensity={0.7} />

      <mesh>
        <boxGeometry />
        <simpleMaterial uColor={'red'} /> {/* jsx 에서는 소문자로 사용 */} {/* uColor를 전달할 수 있음 */}
      </mesh>
    </>
  );
};

export default Shader;
