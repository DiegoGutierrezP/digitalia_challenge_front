import React, { useEffect } from 'react'
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { FormRecibo } from '../components';

export const ShowRecibo = () => {
    const {state} = useLocation();
    const params = useParams();

    useEffect(() => {
        console.log(state)
      if(params?.idRecibo){
        console.log(params?.idRecibo)
      }
    }, [])
    

  return (
    <div>

        <div className="d-flex my-2 justify-content-between">
            <h5 className="">Recibo {params?.idRecibo}</h5>
            <NavLink to={'/recibos'}>Regresar</NavLink>
        </div>

        <div className='row '>
            {state?.data && <FormRecibo 
                formState={state.data}
                onlyView={true}
            />}
        </div>
    </div>
  )
}
