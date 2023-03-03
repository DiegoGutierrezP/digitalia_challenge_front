import React from 'react'
import { TableRecibos } from '../components'
import { Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export const RecibosPage = () => {
  return (
    <div className='mt-3'>

        <div className='mb-4 d-flex align-items-center justify-content-between'>
            <h5 className=''>Mis Recibos</h5>
            <NavLink className={'btn btn-warning'} to={'/recibos/create'} variant="warning">Crear Recibo</NavLink>
        </div>
        

        <TableRecibos/>

    </div>
  )
}
