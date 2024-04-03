import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';
import Cube from '../../components/3DEl/Cube';

const Main = () => {
  return (
    <MainBox>
      <Canvas>
        <Cube />
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
