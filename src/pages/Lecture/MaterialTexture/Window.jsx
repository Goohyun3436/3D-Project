import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls, useTexture } from '@react-three/drei';

const Window = () => {
  const mesh = useRef();

  // texture.map 으로 접근할 수 있으며, map은 원하는 이름으로 바꿔도 됨.
  const textures = useTexture({
    map: './images/texture/window/Glass_Window_004_basecolor.jpg',
    roughnessMap: './images/texture/window/Glass_Window_004_roughness.jpg',
    metalnessMap: './images/texture/window/Glass_Window_004_metallic.jpg', // 원본 이미지의 어두운부분: 메탈 성질 약, 밝은부분: 메탈성질 강
    normalMap: './images/texture/window/Glass_Window_004_normal.jpg',
    displacementMap: './images/texture/window/Glass_Window_004_height.png', // 원본 이미지의 어두운부분: 지오메트리 변경도 약, 밝은부분: 지오메트리 변경도 강 / 변경의 방향은 normal 벡터의 방향과 동일
    aoMap: './images/texture/window/Glass_Window_004_ambientOcclusion.jpg',
    alphaMap: './images/texture/window/Glass_Window_004_opacity_.jpg', // 원본 이미지의 어두운부분: 투명도 강, 밝은부분: 투명도 약
  });

  useEffect(() => {
    // 텍스쳐 수평방향 반복
    textures.map.repeat.x =
      textures.displacementMap.repeat.x =
      textures.aoMap.repeat.x =
      textures.roughnessMap.repeat.x =
      textures.metalnessMap.repeat.x =
      textures.normalMap.repeat.x =
      textures.alphaMap.repeat.x =
        4;

    // wrapS(수평) / wrapT(수직): 반복이 시작되는 시점에서 텍스처 이미지를 어떻게 처리할 것인지
    textures.map.wrapS =
      textures.displacementMap.wrapS =
      textures.aoMap.wrapS =
      textures.roughnessMap.wrapS =
      textures.metalnessMap.wrapS =
      textures.normalMap.wrapS =
      textures.alphaMap.wrapS =
        THREE.MirroredRepeatWrapping;

    // 3D 객체 업데이트
    textures.map.needsUpdate =
      textures.displacementMap.needsUpdate =
      textures.aoMap.needsUpdate =
      textures.roughnessMap.needsUpdate =
      textures.metalnessMap.needsUpdate =
      textures.normalMap.needsUpdate =
      textures.alphaMap.needsUpdate =
        true;

    mesh.current.geometry.setAttribute('uv2', new THREE.BufferAttribute(mesh.current.geometry.attributes.uv.array, 2));
  }, []);

  return (
    <>
      <OrbitControls />

      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 1, -8]} intensity={0.4} />
      <directionalLight position={[1, 2, 8]} intensity={0.4} />

      <mesh ref={mesh}>
        <cylinderGeometry args={[2, 2, 3, 1024, 1024, true]} />
        <meshStandardMaterial
          side={THREE.DoubleSide} // 양면 렌더링
          // 색상 매핑
          map={textures.map}
          // 거칠기 매핑
          roughnessMap={textures.roughnessMap} // 거칠기 텍스처 매핑
          roughnessMap-colorSpace={THREE.NoColorSpace} // 텍스처의 색상 공간 지정 (NoColorSpace: 텍스처의 색상 공간 변환을 비활성화 하여 원본 색상 값을 사용하도록 지시)
          // 금속도 매핑
          metalnessMap={textures.metalnessMap}
          metalness={0.5} // 0 ~ 1
          metalnessMap-colorSpace={THREE.NoColorSpace}
          // 입체감 매핑
          normalMap={textures.normalMap}
          normalMap-colorSpace={THREE.NoColorSpace}
          normalScale={1} // -1 ~ 1 (기본값: 1, 필요에 따라 벗어날 수 있음)
          // 입체감 매핑
          displacementMap={textures.displacementMap}
          displacementMap-colorSpace={THREE.NoColorSpace}
          displacementScale={0.08}
          displacementBias={-0.2}
          // 음영 매핑
          aoMap={textures.aoMap}
          // 투명도 매핑
          alphaMap={textures.alphaMap}
          transparent
          // alphaToCoverage
        />
      </mesh>
    </>
  );
};

export default Window;
