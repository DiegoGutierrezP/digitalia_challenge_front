import React, { useContext, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useForm } from "../../hooks";
import { postCrearRecibo } from "../../api";
import AuthContext from "../../context/AuthContext";
import { NavLink } from "react-router-dom";
import { FormRecibo } from "../components";

const initialForm = {
  titulo: "",
  descripcion: "",
  nombres: "",
  apellidos: "",
  direccion: "",
  moneda: "SOLES",
  monto: 0,
  tipoDoc: "DNI",
  numDoc: "",
};

const validateForm = (form) => {
  let errors = {};

  if (!form.titulo.trim()) {
    errors.titulo = "Ingrese un titulo para el recibo";
  }
  if (!form.descripcion.trim()) {
    errors.descripcion = "Ingrese una descripcion para el recibo";
  }
  if (!form.nombres.trim()) {
    errors.nombres = "Ingrese nombres para el recibo";
  }
  if (!form.apellidos.trim()) {
    errors.apellidos = "Ingrese apellidos para el recibo";
  }
  if (!form.direccion.trim()) {
    errors.direccion = "Ingrese una direccion";
  }
  if (!form.monto.toString().trim() || form.monto == 0) {
    errors.monto = "Ingrese un monto mayor a 0";
  }
  if (form.tipoDoc === "DNI") {
    if (form.numDoc.length !== 8)
      errors.numDoc = "El numero de documento debe tener 8 cifras";
  }
  if (form.tipoDoc === "RUC") {
    if (form.numDoc.length !== 11)
      errors.numDoc = "El numero de documento debe tener 11 cifras";
  }

  return errors;
};

export const CreateReciboPage = () => {
    const {user} = useContext(AuthContext);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const {
    titulo,
    descripcion,
    nombres,
    apellidos,
    direccion,
    moneda,
    monto,
    tipoDoc,
    numDoc,
    onInputChange,
    onResetForm,
    formState,
  } = useForm(initialForm);
  const [msgAlert, setMsgAlert] = useState({ variant: "success", msg: "" });

  const callbackAfterApi = (status,data)=>{
    if(status === 'success'){
        onResetForm();
        setMsgAlert({variant: "success", msg: data})
    }
    if(status === 'error'){
        setMsgAlert({variant: "danger", msg: data})
    }
  }

  const handelSubmitCrearRecibo = (e) => {
    e.preventDefault();
    let errors = validateForm(formState);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      //console.log(formState)
      postCrearRecibo({...formState,usuarioId:user.id}, setLoading,callbackAfterApi);
    }
  };

  return (
    <div>
        <div className="d-flex my-2 justify-content-between">
            <h5 className="">Crear Recibo</h5>
            <NavLink to={'/recibos'}>Regresar</NavLink>
        </div>
      
      <form onSubmit={handelSubmitCrearRecibo}>
        {msgAlert.msg && (
          <Alert
            variant={msgAlert.variant}
            onClose={() => setMsgAlert({ variant: "success", msg: "" })}
            dismissible
          >
            {msgAlert.msg}
          </Alert>
        )}
        <div className="row mt-4">
            <FormRecibo 
                formState={formState}
                formErrors={formErrors}
                onInputChange={onInputChange}
            />
          

          <div className="w-100 d-flex justify-content-end mt-3">
            <Button disabled={loading} type="submit">
              Crear Recibo
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
