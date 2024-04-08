import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';
import Box from '../../components/Camera/Box';

const Main = () => {
  return (
    <MainBox>
      <Canvas
        // orthographic // orthographic을 사용하기 위해 속성 추가
        // camera={{
        //   near: 0.1, // zNear: 카메라와 절구체의 최소 거리
        //   far: 20, // zFar: 카메라와 절구체의 최대 거리
        //   zoom: 100, // 배율
        //   position: [7, 7, 0], // 카메라 위치 좌표
        // }}

        camera={{
          fov: 130,
          near: 0.1, // zNear: 카메라와 절구체의 최소 거리
          far: 20, // zFar: 카메라와 절구체의 최대 거리
          position: [7, 7, 0], // 카메라 위치 좌표
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
