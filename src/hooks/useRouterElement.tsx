import { useRoutes } from 'react-router-dom';
import LayoutMain from '@/layouts/LayoutMain';
import Home from '@/page/Home';
import Register from '@/page/auth/Register';
import Login from '@/page/auth/Login';
import UsersPage from '@/page/users/UsersPage';
import UsersDetails from '@/page/users/UsersDetails';

export default function useRoutesElements() {
  const routeElements = useRoutes([
    { path: '/', element: <LayoutMain children={<Home />} /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/users', element: <LayoutMain children={<UsersPage />} /> },
    { path: '/users/:id', element: <LayoutMain children={<UsersDetails />} /> },
    { path: '*', element: <h1>404</h1> },
  ]);
  return routeElements;
}
