import { useLoader } from '@react-three/fiber';
import { CubeCamera, MeshRefractionMaterial, OrbitControls } from '@react-three/drei';
import { RGBELoader } from 'three-stdlib';

const Refraction = () => {
  const texture = useLoader(RGBELoader, './images/hdr/shanghai_bund_1k.hdr');

  return (
    <>
      <OrbitControls />

      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 1, 0]} />
      <directionalLight position={[1, 2, 8]} intensity={0.7} />

      <CubeCamera resolution={1024} frames={1} envMap={texture}>
        {(texture) => (
          <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <dodecahedronGeometry />
            <MeshRefractionMaterial
              envMap={texture}
              toneMapped={false}
              bounces={2}
              aberrationsStrength={0.03}
              ior={2.75}
              fresnel={1}
              color='white'
              fastChroma={true}
            />
          </mesh>
        )}
      </CubeCamera>
    </>
  );
};

export default Refraction;
