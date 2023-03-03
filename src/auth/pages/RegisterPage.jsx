import React, { useState } from 'react'
import { Alert, Button, Card, Form, Spinner } from 'react-bootstrap'
import { useForm } from '../../hooks'
import { register } from '../../api'
import { useNavigate } from 'react-router-dom'

const formRegisterInitial = {
    nombres:'',
    apellidos:'',
    email:'',
    password:'',
}

const formRegisterValidations={
    nombres:[(value) => value.trim(),'El nombre es obligatorio'],
    apellidos:[(value) => value.trim(),'El apellido es obligatorio'],
    email : [(value)=> /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/.test(value.trim()) , 'El email es incorrecto'],
    password : [(value)=>value.length > 6, 'El password debe tener mas de 6 caracteres']
  }
  

export const RegisterPage = () => {

    const { 
        nombres,apellidos,email,password,onInputChange,formState,onResetForm,
        isFormValid,nombresValid,apellidosValid,emailValid,passwordValid
    } = useForm(formRegisterInitial,formRegisterValidations);
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [loading, setLoading] = useState(false);
    const [msgAlert, setMsgAlert] = useState({variant:'success',msg:''});

   
    const callbackRegister = (status,data)=>{
        if(status === 'success'){
            onResetForm();
            setFormSubmitted(false);
            setMsgAlert({variant:'success',msg:data.message})
        }else if(status === 'error'){
            setMsgAlert({variant:'danger',msg:data})
        }
    } 

    const handleSubmitRegister = (e)=>{
        e.preventDefault()
        setFormSubmitted(true);
        if(!isFormValid) return;

        register(formState,setLoading,callbackRegister);
        
    }

  return (
    <div className='min-vh-100 d-flex align-items-center justify-content-center w-full'>
        <Card style={{width:"400px"}}>
            <Card.Header>
                <Card.Title>Registro Digitalia</Card.Title>
            </Card.Header>
            <Card.Body>
                {msgAlert.msg && <Alert  variant={msgAlert.variant} onClose={() => setMsgAlert({variant:'success',msg:''})} dismissible>
                    {msgAlert.msg}
                </Alert>}
                <form onSubmit={handleSubmitRegister}>
                    <Form.Group className="mb-2" >
                        <Form.Label>Nombres *</Form.Label>
                        <Form.Control type="text"  name='nombres' value={nombres} onChange={onInputChange}  placeholder="Nombres" />
                        <Form.Text className="text-danger">
                        {formSubmitted && nombresValid}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-2" >
                        <Form.Label>Apellidos *</Form.Label>
                        <Form.Control type="text" name='apellidos' value={apellidos} onChange={onInputChange} placeholder="Apellidos" />
                        <Form.Text className="text-danger">
                        {formSubmitted && apellidosValid}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-2" >
                        <Form.Label>Email *</Form.Label>
                        <Form.Control type="email" name='email' value={email} onChange={onInputChange} placeholder="Email" />
                        <Form.Text className="text-danger">
                        {formSubmitted && emailValid}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-2" >
                        <Form.Label>Password *</Form.Label>
                        <Form.Control type="password" name='password' value={password} onChange={onInputChange} placeholder="Password" />
                        <Form.Text className="text-danger">
                        {formSubmitted && passwordValid}
                        </Form.Text>
                    </Form.Group>

                    <Button disabled={loading} className='mt-3 float-end w-100'  variant="primary" type="submit">
                        Registrar &nbsp;
                        {loading && <Spinner animation="border" size="sm" />}
                    </Button>
                </form>
            </Card.Body>
        </Card>
    </div>
  )
}
