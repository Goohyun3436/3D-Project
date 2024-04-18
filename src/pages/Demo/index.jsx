import { Canvas, useThree } from '@react-three/fiber';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Map from './Map';
import styled from 'styled-components';

const Demo = () => {
  return (
    <DemoBox>
      <Canvas shadows camera={{ fov: 15, position: [-67, 117, 188] }}>
        <Map />
      </Canvas>
      <Sidebar />
      <Dashboard />
    </DemoBox>
  );
};

const DemoBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100vh;

  background: #333842;
`;

export default Demo;
