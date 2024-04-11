import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { Environment, OrbitControls, useAnimations, useGLTF } from '@react-three/drei';
import { useControls } from 'leva';

const Men = () => {
  // 3D 캐릭터 모델 객체
  const model = useGLTF('./models/model.glb');

  // 애니메이션 객체
  const animation = useAnimations(model.animations, model.scene);

  // useControls로 애니메이션 선택할 수 있도록 함.
  const { actionName } = useControls({
    actionName: {
      value: animation.names[1],
      options: animation.names,
    },
  });

  // actionName이 바뀔 때마다 애니메이션 리셋 후 실행
  useEffect(() => {
    const action = animation.actions[actionName];
    action.reset().fadeIn(0.5).play();

    return () => {
      action.fadeOut(0.5);
    };
  }, [actionName]);

  // 모델을 중앙에 맞추기 위한 모델 높이값 추출
  const [height, setHeight] = useState(0);
  useEffect(() => {
    let minY = Infinity,
      maxY = -Infinity;

    model.scene.traverse((item) => {
      if (item.isMesh) {
        const geomBbox = item.geometry.boundingBox;
        if (minY > geomBbox.min.y) minY = geomBbox.min.y;
        if (maxY < geomBbox.max.y) maxY = geomBbox.max.y;
      }
    });

    const h = maxY - minY; // 약 1.8
    setHeight(h);
  }, [model.scene]);

  return (
    <>
      <OrbitControls />

      <Environment preset='sunset' />

      <primitive
        scale={5} // 모델 사이즈
        position-y={-(height / 2) * 5} // 모델을 중앙에 맞추기 위한 y 값 설정
        object={model.scene} // 모델 객체
      />
    </>
  );
};

export default Men;
