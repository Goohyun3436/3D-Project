import { Canvas } from '@react-three/fiber';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Map from './Map';
import styled from 'styled-components';

const Demo = () => {
  return (
    <DemoBox>
      <Canvas shadows camera={{ fov: 12.5, position: [-67, 130, 175] }}>
        <Map />
      </Canvas>
      <Sidebar />
      {/* <Dashboard /> */}
    </DemoBox>
  );
};

const DemoBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100vh;

  background: #333842;
`;

export default Demo;
