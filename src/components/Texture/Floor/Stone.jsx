import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

const Stone = ({ position, rotation, planeArgs }) => {
  const mesh = useRef();

  const textures = useTexture({
    map: './images/texture/floor/stone/Stone_Floor_006_basecolor.jpg',
    roughnessMap: '/images/texture/floor/stone/Stone_Floor_006_roughness.jpg',
    normalMap: './images/texture/floor/stone/Stone_Floor_006_normal.jpg',
    displacementMap: '/images/texture/floor/stone/Stone_Floor_006_height.png',
    aoMap: './images/texture/floor/stone/Stone_Floor_006_ambientOcclusion.jpg',
  });

  useEffect(() => {
    textures.map.repeat.x =
      textures.displacementMap.repeat.x =
      textures.aoMap.repeat.x =
      textures.roughnessMap.repeat.x =
      textures.normalMap.repeat.x =
        2;

    textures.map.repeat.y =
      textures.displacementMap.repeat.y =
      textures.aoMap.repeat.y =
      textures.roughnessMap.repeat.y =
      textures.normalMap.repeat.y =
        8;

    textures.map.wrapS =
      textures.displacementMap.wrapS =
      textures.aoMap.wrapS =
      textures.roughnessMap.wrapS =
      textures.normalMap.wrapS =
        THREE.MirroredRepeatWrapping;

    textures.map.wrapT =
      textures.displacementMap.wrapT =
      textures.aoMap.wrapT =
      textures.roughnessMap.wrapT =
      textures.normalMap.wrapT =
        THREE.MirroredRepeatWrapping;

    textures.map.needsUpdate =
      textures.displacementMap.needsUpdate =
      textures.aoMap.needsUpdate =
      textures.roughnessMap.needsUpdate =
      textures.normalMap.needsUpdate =
        true;

    mesh.current.geometry.setAttribute('uv2', new THREE.BufferAttribute(mesh.current.geometry.attributes.uv.array, 2));
  }, []);

  return (
    <mesh ref={mesh} position={position} rotation={rotation}>
      <planeGeometry args={planeArgs} />
      <meshStandardMaterial
        side={THREE.DoubleSide}
        map={textures.map}
        roughnessMap={textures.roughnessMap}
        roughnessMap-colorSpace={THREE.NoColorSpace}
        normalMap={textures.normalMap}
        normalMap-colorSpace={THREE.NoColorSpace}
        normalScale={1}
        displacementMap={textures.displacementMap}
        displacementMap-colorSpace={THREE.NoColorSpace}
        displacementScale={0.08}
        displacementBias={-0.2}
        aoMap={textures.aoMap}
        transparent
      />
    </mesh>
  );
};

export default Stone;
