import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';
import Box from '../../components/Geometry/Box';

const Main = () => {
  return (
    <MainBox>
      <Canvas
        camera={{
          fov: 75, // 렌지 화각
          position: [7, 7, 0], // 카메라 좌표
        }}
      >
        <Box />
      </Canvas>
    </MainBox>
  );
};

const MainBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100vh;

  background: black;
`;

export default Main;
