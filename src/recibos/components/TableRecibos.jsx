import React, { useContext, useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import AuthContext from '../../context/AuthContext'
import { generatePDFRecibo, getAllRecibos } from '../../api';
import { NavLink } from 'react-router-dom';

export const TableRecibos = () => {
    const {user} = useContext(AuthContext);
    const [recibos, setRecibos] = useState([])
    const [loading, setLoading] = useState(false);
    const [loadingPdf, setLoadingPdf] = useState(false)

    useEffect(() => {
      //console.log(user)
      getAllRecibos(user.id,setRecibos,setLoading);
    }, [])

    const onGeneratePDF = (idRecibo)=>{
        generatePDFRecibo(idRecibo,setLoadingPdf)
    }
    

  return (
    <Table responsive bordered  className='bg-white'>
      <thead>
        <tr>
          <th>#</th>
          <th>Titulo</th>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Tipo Documento</th>
          <th>Numero Documento</th>
          <th>Monto</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
            {
                loading ? 
                <tr>
                    <td className='text-center' colSpan={8}>Cargando recibos...</td>
                </tr>
                :(
                  recibos.length === 0 ?
                  <tr><td className='text-center' colSpan={8}>No tiene recibos registrados</td></tr>
                  : recibos.map((re,idx) => (
                    <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{re.titulo}</td>
                        <td>{re.nombres}</td>
                        <td>{re.apellidos}</td>
                        <td>{re.tipoDoc}</td>
                        <td>{re.numDoc}</td>
                        <td>{ (re.moneda === 'SOLES' ? 'S/ ' : '$ ') + re.monto }</td>
                        <td>
                            <NavLink 
                                 to={`/recibos/${re.id}`}
                              state={{ data: re }}
                              className={'btn btn-sm btn-info'} >
                                Ver
                            </NavLink>
                            &nbsp;
                            <Button disabled={loadingPdf} onClick={()=>onGeneratePDF(re.id)} variant='danger' size='sm'>
                                PDF
                            </Button>
                        </td>
                    </tr>
                ))
                )
            }
      </tbody>
    </Table>
  )
}
