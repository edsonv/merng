import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { MainLayout } from './layouts/MainLayout';
import { AuthProvider } from './context/AuthContext';
import { useAuthContext } from './hooks/useAuthContext';

export const Router = () => {
  const { user } = useAuthContext();

  return (
    <AuthProvider>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route index path='/' element={<Home />} />
            <Route
              path='login'
              element={user ? <Navigate to='/' replace /> : <Login />}
            />
            <Route
              path='register'
              element={user ? <Navigate to='/' replace /> : <Register />}
            />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </AuthProvider>
  );
};
