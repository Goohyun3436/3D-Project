import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';
import Box from '../../components/Shadow/Box';
import Spot from '../../components/Shadow/Spot';

const Main = () => {
  return (
    <MainBox>
      <Canvas shadows='variance' camera={{ near: 1, far: 100, position: [7, 7, 0] }}>
        <Spot />
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
