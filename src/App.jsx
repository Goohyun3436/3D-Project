import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import Lecture from './pages/Lecture';
import Warehouse from './pages/Warehouse';
import Demo from './pages/Demo';
import '../src/styles/fonts/Pretendard-GOV/pretendard.css';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<Navigate replace to='/main' />} />
        <Route path='/lecture' element={<Lecture />} />
        <Route path='/warehouse' element={<Warehouse />} />
        <Route path='/demo' element={<Demo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
