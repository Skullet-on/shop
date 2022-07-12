import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom';
import { Context } from '..';
import { authRoutes, publicRoutes } from '../routes';

export default function AppRouter() {
  const { user } = useContext(Context);

  return (
    <Routes>
      { 
        user.isAuth && authRoutes.map(({path, element}) =>
          <Route key={path} path={path} element={element} />
        )
      }
      { 
        publicRoutes.map(({path, element}) =>
          <Route key={path} path={path} element={element} />
        )
      }
    </Routes>
  );
}
