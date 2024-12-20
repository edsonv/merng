import { BrowserRouter, Route, Routes } from 'react-router';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { MainLayout } from './layouts/MainLayout';

export const Router = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};
