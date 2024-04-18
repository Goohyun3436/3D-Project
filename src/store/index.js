import { create } from 'zustand';

const useStore = create((set) => ({
  floorList: [
    {
      id: 1,
      name: '1F 로비',
      isSelected: false,
    },
    {
      id: 2,
      name: '2F 오피스',
      isSelected: false,
    },
    {
      id: 3,
      name: '3F 연구실',
      isSelected: true,
    },
    {
      id: 4,
      name: '4F 전기실',
      isSelected: false,
    },
    {
      id: 5,
      name: '5F 옥상',
      isSelected: false,
    },
  ],
  setFloorList: (id, data) => {
    set((state) => {
      let updatedList = state.floorList.map((floor) => (floor.id === id ? { ...floor, ...data } : floor));
      return { floorList: updatedList };
    });
  },
  selectFloor: (id) => {
    set((state) => {
      let updatedList = state.floorList.map((floor) => ({
        ...floor,
        isSelected: floor.id === id ? true : false,
      }));
      return { floorList: updatedList };
    });
  },

  cctvList: [
    {
      id: 0,
      name: '3F-사무실',
      resolution: '1920x1080',
      codec: 'H.264',
      algorithm: '작업자 이상 감지, 화재 감지',
      position: [-5.5, 4, 8],
      rotation: [0, -90, 0],
      angle: 70,
      isAlarm: false,
    },
    {
      id: 1,
      name: '3F-휴게실',
      resolution: '1280x720',
      codec: 'H.264',
      algorithm: '작업자 이상 감지, 화재 감지',
      position: [15.7, 4, -15.3],
      rotation: [0, -45, 0],
      angle: 40,
      isAlarm: false,
    },
    {
      id: 2,
      name: '3F-회의실',
      resolution: '1920x1080',
      codec: 'H.264',
      algorithm: '화재 감지',
      position: [35.5, 4, -37.9],
      rotation: [0, -40, 0],
      angle: 40,
      isAlarm: false,
    },
  ],
  setCctvAlarm: (id, data) => {
    set((state) => {
      let updatedList = state.cctvList.map((cctv) => (cctv.id === id ? { ...cctv, ...data } : cctv));
      return { cctvList: updatedList };
    });
  },
}));

export default useStore;
