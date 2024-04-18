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
      url: './images/cctv/3F_1.jpg',
      resolution: '1920x1080',
      codec: 'H.264',
      algorithm: '작업자 이상 감지, 화재 감지',
      position: [2, 4, 0],
      rotation: [0, -90, 0],
      angle: 70,
      isAlarm: false,
      isLive: false,
    },
    {
      id: 1,
      name: '3F-휴게실',
      url: './images/cctv/3F_2.jpg',
      resolution: '1280x720',
      codec: 'H.264',
      algorithm: '작업자 이상 감지, 화재 감지',
      position: [17, 4, -22.6],
      rotation: [20, -45, 20],
      angle: 40,
      isAlarm: false,
      isLive: false,
    },
    {
      id: 2,
      name: '3F-회의실',
      url: './images/cctv/3F_3.jpg',
      resolution: '1920x1080',
      codec: 'H.264',
      algorithm: '화재 감지',
      position: [31.6, 4, -22.8],
      rotation: [0, -40, 0],
      angle: 40,
      isAlarm: false,
      isLive: false,
    },
  ],
  setCctvList: (id, data) => {
    set((state) => {
      let updatedList = state.cctvList.map((cctv) => (cctv.id === id ? { ...cctv, ...data } : cctv));
      return { cctvList: updatedList };
    });
  },
}));

export default useStore;
