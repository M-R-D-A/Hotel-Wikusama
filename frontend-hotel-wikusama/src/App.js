import React, { Fragment, useContext, useMemo } from 'react'
import { 
  createBrowserRouter, 
  RouterProvider } from 'react-router-dom'

import About from './Pages/About';
import Home from './Pages/Home';
import Pemesanan from './Pages/Pemesanan';
import RootLayout from './Pages/Root';
import ErrorPage from './Pages/Error';
import Daftar from './Pages/Daftar';
import TipeKamar from './Pages/TipeKamar';
import ListUser from './Pages/ListUser';
import ListTipeKamar from './Pages/ListTipeKamar';
import Login from './Pages/Login';
import Riwayat from './Pages/Riwayat';
import AuthContext from './context/auth-context';
import ListPemesanan from './Pages/ListPemesanan';
import ListDetailPemesanan from './Pages/ListDetailPemesanan';
import ListKamar from './Pages/ListKamar';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: '/about', element: <About />},
      { path: '/pemesanan', element: <Pemesanan />},
      { path: '/daftar', element: <Daftar />},
      { path: '/tipe_kamar', element: <TipeKamar />},
      { path: '/list_user', element: <ListUser />},
      { path: '/list/tipe_kamar', element: <ListTipeKamar />},
      { path: '/login', element: <Login />},
      { path: '/riwayat', element: <Riwayat />}
    ]
  }
])

const routerResepsionis = createBrowserRouter([
  {
    path: '/resp',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <ListPemesanan /> },
      { path: '/resp/detail', element: <ListDetailPemesanan />}
    ]
  }
])

const routerAdmin = createBrowserRouter([
  {
    path: '/admin',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <ListUser /> },
      { path: '/admin/tipekamar', element: <ListTipeKamar />},
      { path: '/admin/kamar', element: <ListKamar />}
    ]
  }
])

function RouterWrapper(props) {
  const { router } = props;
  const routerProvider = useMemo(() => <RouterProvider router={router} />, [router]);
  return routerProvider;
}

function App() {
  const ctx = useContext(AuthContext);
  return (
    <Fragment>
      {!ctx.isLoggedIn && <RouterWrapper router={router} />}
      {ctx.isLoggedIn && ctx.role === 'resepsionis' &&(
      <RouterProvider router={routerResepsionis} />
      )}
      {ctx.isLoggedIn && ctx.role === 'admin' &&(
      <RouterProvider router={routerAdmin} />
      )}
    </Fragment>
  );
}

export default App