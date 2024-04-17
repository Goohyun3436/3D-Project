import useStore from '../../store';
import styled from 'styled-components';

const Sidebar = () => {
  const { floorList, selectFloor } = useStore((state) => state);

  return (
    <SidebarBox>
      <section className='floor-nav'>
        <ul>
          CNSI
          {floorList.reverse().map((nav) => (
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
    </SidebarBox>
  );
};

const SidebarBox = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  align-items: start;
  padding: 30px 10px;
  width: 20%;
  height: 100vh;

  background: #15181c9c;
  color: white;

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
    }
  }
`;

export default Sidebar;
