import React, { useContext, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { RecibosRoutes } from '../recibos/routes/RecibosRoutes';
import AuthContext from '../context/AuthContext';



export const AppRouter = () => {
    const {isAuth} = useContext(AuthContext);

    


  return (
    <Routes>
        {
            isAuth 
            ? <Route path='/*' element={<RecibosRoutes/>} />
            :<Route path='/auth/*' element={<AuthRoutes />} />
        }

        <Route path='*' element={<Navigate to='/auth/login' />} />
    </Routes>
  )
}
