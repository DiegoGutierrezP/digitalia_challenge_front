import React, { useContext } from 'react'
import { Container, Navbar,NavDropdown,Nav, Button    } from 'react-bootstrap'
import AuthContext from '../../context/AuthContext'

export const NavbarRecibos = () => {

  const {logout} = useContext(AuthContext)

  return (
    <Navbar bg="light" expand="lg" className='shadow-sm'>
      <Container>
        <Navbar.Brand href="#home">Recibos Digitalia</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse className="justify-content-end">
          <Button onClick={logout} variant="secondary" size="sm">
            Salir
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
