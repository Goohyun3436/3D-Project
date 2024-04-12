import { Canvas } from '@react-three/fiber';
import Map from './Map';
import styled from 'styled-components';

const Warehouse = () => {
  return (
    <WarehouseBox>
      <Canvas shadows camera={{ fov: 100, position: [0, 50, 10] }}>
        <Map />
      </Canvas>
    </WarehouseBox>
  );
};

const WarehouseBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100vh;

  background: white;
`;

export default Warehouse;
