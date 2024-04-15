import { Canvas } from '@react-three/fiber';
import Map from './Map';
import ModelWithHTML from './ModelWithHTML';
import styled from 'styled-components';

const Demo = () => {
  return (
    <WarehouseBox>
      <Canvas shadows camera={{ fov: 15, position: [30, 30, 50] }}>
        <Map />
      </Canvas>

      <ModelWithHTML />
    </WarehouseBox>
  );
};

const WarehouseBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100vh;

  background: black;
`;

export default Demo;
