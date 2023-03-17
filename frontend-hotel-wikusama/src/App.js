import React, { Fragment, useContext, useMemo } from 'react'
import { 
  createBrowserRouter, 
  RouterProvider } from 'react-router-dom'

import Daftar from './Pages/admin/Daftar';
import TipeKamar from './Pages/admin/TipeKamar';
import ListUser from './Pages/admin/ListUser';
import ListTipeKamar from './Pages/admin/ListTipeKamar';
import ListKamar from './Pages/admin/ListKamar';
import ListPemesanan from './Pages/resepsionis/ListPemesanan';
import ListDetailPemesanan from './Pages/resepsionis/ListDetailPemesanan';
import About from './Pages/kostumer/About';
import Home from './Pages/kostumer/Home';
import Pemesanan from './Pages/kostumer/Pemesanan';
import RootLayout from './Pages/Root';
import ErrorPage from './Pages/Error';
import Login from './Pages/Login';
import Riwayat from './Pages/Riwayat';
import AuthContext from './context/auth-context';
import DaftarKamar from './Pages/kostumer/DaftarKamar';
import EditStatus from './Pages/resepsionis/EditStatus';
import Bukti from './Pages/kostumer/Bukti';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: '/about', element: <About />},
      { path: '/daftar_kamar', element: <DaftarKamar />},
      { path: '/login', element: <Login />},
      { path: '/bukti', element: <Bukti />},
    ]
  }
])

const routerResepsionis = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <ListPemesanan /> },
      { path: '/resp/detail', element: <ListDetailPemesanan />},
      { path: '/resp/editStatus', element: <EditStatus />}
    ]
  }
])

const routerAdmin = createBrowserRouter([
  {
    path: '/',
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