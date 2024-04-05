import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';
import Box from '../../components/MaterialTexture/Box';

const Main = () => {
  return (
    <MainBox>
      <Canvas>
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
`;

export default Main;
