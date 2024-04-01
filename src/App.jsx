import { Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import Main from './pages/Main';
import '../src/styles/fonts/Pretendard-GOV/pretendard.css';

function App() {
  return (
    <div>
      <GlobalStyle />
      3D Project
      <Routes>
        <Route path='/' element={<Navigate replace to='/main' />} />
        <Route path='/main' element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
