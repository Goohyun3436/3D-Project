import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';
import Box from '../../components/Postprocessing/Box';

const Main = () => {
  return (
    <MainBox>
      <Canvas shadows camera={{ position: [7, 7, 0] }}>
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

  background: white;
`;

export default Main;
