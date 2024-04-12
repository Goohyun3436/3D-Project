import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

const Concrete = ({ position, rotation, planeArgs }) => {
  const mesh = useRef();

  const textures = useTexture({
    map: './images/texture/floor/concrete/Concrete_Muddy_001_BaseColor.jpg',
    roughnessMap: '/images/texture/floor/concrete/Concrete_Muddy_001_Roughness.jpg',
    normalMap: './images/texture/floor/concrete/Concrete_Muddy_001_Normal.jpg',
    displacementMap: '/images/texture/floor/concrete/Concrete_Muddy_001_Height.png',
    aoMap: './images/texture/floor/concrete/Concrete_Muddy_001_AmbientOcclusion.jpg',
  });

  useEffect(() => {
    textures.map.repeat.y =
      textures.displacementMap.repeat.y =
      textures.aoMap.repeat.y =
      textures.roughnessMap.repeat.y =
      textures.normalMap.repeat.y =
        4;

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

export default Concrete;
