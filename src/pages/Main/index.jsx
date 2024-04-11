import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';
import Box from '../../components/Shadow/Box';

const Main = () => {
  return (
    <MainBox>
      <Canvas shadows camera={{ near: 1, far: 100, position: [7, 7, 0] }}>
        {/* ContactShadows 는 독립적 그림자이기 때문에 shadows 제거해도 무관 */}
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
