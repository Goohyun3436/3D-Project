import styled from 'styled-components';

const Dashboard = () => {
  return (
    <DashboardBox>
      <section>
        <p>데이터 전력 사용 현황</p>
      </section>

      <section>
        <p>층별 현황</p>
      </section>
    </DashboardBox>
  );
};

const DashboardBox = styled.div`
  z-index: 999;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 30px 10px;
  width: 20%;
  height: 100vh;

  background: #15181c9c;
  color: white;

  section {
    margin: 20px 0 50px 0;
  }
`;

export default Dashboard;
