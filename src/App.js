import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainPage from './pages/Main/index';
import UserPage from './pages/User/index';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/users' element={<MainPage/>} exact/>
          <Route path='/users/:id' element={<UserPage/>} exact/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
