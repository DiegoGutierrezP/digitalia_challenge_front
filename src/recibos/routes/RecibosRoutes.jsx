import React from 'react'
import { CreateReciboPage, RecibosPage, ShowRecibo } from '../pages'
import { Navigate, Route, Routes } from 'react-router-dom'
import { NavbarRecibos } from '../layouts/NavbarRecibos'
import { Container } from 'react-bootstrap'

export const RecibosRoutes = () => {
  return (
    <div className=' w-100'>
        <NavbarRecibos/>
        <Container className='py-4'>
            <Routes>
                <Route path='/recibos' element={<RecibosPage/>} />
                <Route path='/recibos/create' element={<CreateReciboPage/>} />
                <Route path='/recibos/:idRecibo' element={<ShowRecibo/>} />

                <Route path='*' element={<Navigate to='/recibos' />} />
            </Routes>
        </Container>
    </div>
  )
}
