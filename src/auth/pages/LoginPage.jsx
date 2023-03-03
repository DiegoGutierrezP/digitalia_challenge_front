import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import {  useNavigate } from 'react-router-dom'
import { useForm } from '../../hooks'
import { login } from '../../api'
import AuthContext from '../../context/AuthContext'

const formLoginInitial = {
    email:'',
    password:'',
}

const formLoginValidations={
    email : [(value)=> /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/.test(value.trim()) , 'El email es incorrecto'],
    password : [(value)=>value.trim(), 'El password debe tener mas de 6 caracteres']
  }

export const LoginPage = () => {
    const { handleAuth } = useContext(AuthContext);
    const { 
        email,password,onInputChange,formState,
        isFormValid,emailValid,passwordValid
    } = useForm(formLoginInitial,formLoginValidations);
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [msgAlert, setMsgAlert] = useState({variant:'success',msg:''});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    

    const redirectRegister = (e)=>{
        e.preventDefault();
        navigate('/auth/register');
    }

    const callbackLogin = (status,data)=>{
        if(status === 'success'){
            handleAuth(data)
        }else if(status === 'error'){
            setMsgAlert({variant:'danger',msg:data})
        }
    }   

    const handleSubmitLogin = (e)=>{
        e.preventDefault();
        setFormSubmitted(true);
        if(!isFormValid) return;
        login(formState,setLoading,callbackLogin)
    }

  return (
    <div className='min-vh-100 d-flex align-items-center justify-content-center w-full'>
        <Card style={{width:"400px"}}>
            <Card.Header>
                <Card.Title>Login Digitalia</Card.Title>
            </Card.Header>
            <Card.Body>
                {msgAlert.msg && <Alert  variant={msgAlert.variant} onClose={() => setMsgAlert({variant:'success',msg:''})} dismissible>
                    {msgAlert.msg}
                </Alert>}
                <form onSubmit={handleSubmitLogin}>
                    <Form.Group className="mb-2" >
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name='email' value={email} onChange={onInputChange} placeholder="Enter email" />
                        <Form.Text className="text-danger">
                        {formSubmitted && emailValid}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-2" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name='password' value={password} onChange={onInputChange} placeholder="Enter email" />
                        <Form.Text className="text-danger">
                        {formSubmitted && passwordValid}
                        </Form.Text>
                    </Form.Group>

                    <span className='mt-1'>No tienes una cuenta? <a href="#" onClick={redirectRegister} className='cursor-pointer'>Registrate</a></span>

                    <Button className='mt-2 float-end w-100'  variant="primary" type="submit">
                        Login
                    </Button>
                </form>
            </Card.Body>
        </Card>
    </div>
  )
}
