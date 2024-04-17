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
      name: '3F 전산실',
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
      let updatedFloorList = state.floorList.map((floor) => (floor.id === id ? { ...floor, ...data } : floor));
      return { floorList: updatedFloorList };
    });
  },
  selectFloor: (id) => {
    set((state) => {
      let updatedFloorList = state.floorList.map((floor) => ({
        ...floor,
        isSelected: floor.id === id ? true : false,
      }));
      return { floorList: updatedFloorList };
    });
  },
}));

export default useStore;
