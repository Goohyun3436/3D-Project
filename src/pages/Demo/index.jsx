import { Canvas } from '@react-three/fiber';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Map from './Map';
import styled from 'styled-components';

const Demo = () => {
  return (
    <WarehouseBox>
      <Canvas
        shadows
        camera={{ fov: 23, position: [50, 90, 120] }}
        shadow-camera-top={300}
        shadow-camera-bottom={-300}
        shadow-camera-left={-300}
        shadow-camera-right={300}
      >
        <Map />
      </Canvas>
      <Sidebar />
      <Dashboard />
    </WarehouseBox>
  );
};

const WarehouseBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100vh;

  background: #333842;
`;

export default Demo;
