import useStore from '../../store';
import styled from 'styled-components';

const Sidebar = () => {
  const { floorList, selectFloor, cctvList, setCctvList } = useStore((state) => state);

  return (
    <SidebarBox>
      <section className='floor-nav'>
        <ul>
          CNSI
          {[...floorList].reverse().map((nav) => (
            <li
              key={nav.id}
              id={nav.id}
              className={nav.isSelected ? 'active' : ''}
              onClick={(e) => selectFloor(nav.id)}
            >
              {nav.name}
            </li>
          ))}
        </ul>
      </section>

      <section className='cam-onoff'>
        <ul>
          CCTV 리스트
          {cctvList.map((cctv) => (
            <li key={cctv.id}>
              {cctv.name}
              {cctv.isAlarm ? (
                <button onClick={() => setCctvList(cctv.id, { isAlarm: false, isLive: false })}>알람 OFF</button>
              ) : (
                <button onClick={() => setCctvList(cctv.id, { isAlarm: true, isLive: true })}>알람 ON</button>
              )}
            </li>
          ))}
        </ul>
      </section>
    </SidebarBox>
  );
};

const SidebarBox = styled.div`
  z-index: 999;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 30px 10px;
  width: 20%;
  height: 100vh;

  background: #15181c9c;
  color: white;

  section + section {
    margin-top: 50px;
  }

  ul {
    padding: 7px 10px;
    font-size: 20px;
    li {
      padding: 5px 10px;
      margin-left: 20px;
      font-size: 18px;
      &.active {
        background: red;
      }

      button {
        color: white;
        padding: 5px;
        border: 1px solid gray;
        border-radius: 5px;
        margin-left: 10px;
        text-align: center;
      }
    }
  }
`;

export default Sidebar;
