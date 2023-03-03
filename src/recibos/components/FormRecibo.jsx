import React from 'react'
import { Form } from 'react-bootstrap';

export const FormRecibo = ({  formState, onInputChange= ()=>{}, formErrors={},onlyView = false}) => {
    
    const {titulo,descripcion ,nombres,apellidos,direccion,moneda,monto,tipoDoc,numDoc} = formState;
  
    return (
    <>
    <div className="col-sm-6">
            <Form.Group className="mb-3">
              <Form.Label>Titulo</Form.Label>
              <Form.Control
                type="text"
                name="titulo"
                value={titulo}
                onChange={onInputChange}
                placeholder="Titulo del Recibo"
                disabled={onlyView}
              />
              <Form.Text className="text-danger">{formErrors.titulo}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                as="textarea"
                name="descripcion"
                value={descripcion}
                onChange={onInputChange}
                rows={3}
                disabled={onlyView}
              />
              <Form.Text className="text-danger">
                {formErrors.descripcion}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nombres</Form.Label>
              <Form.Control
                type="text"
                name="nombres"
                value={nombres}
                onChange={onInputChange}
                placeholder="Nombres"
                disabled={onlyView}
              />
              <Form.Text className="text-danger">
                {formErrors.nombres}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                type="text"
                name="apellidos"
                value={apellidos}
                onChange={onInputChange}
                placeholder="Apellidos"
                disabled={onlyView}
              />
              <Form.Text className="text-danger">
                {formErrors.apellidos}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Direccion</Form.Label>
              <Form.Control
                type="text"
                name="direccion"
                value={direccion}
                onChange={onInputChange}
                placeholder="Direccion de domicilio"
                disabled={onlyView}
              />
              <Form.Text className="text-danger">
                {formErrors.direccion}
              </Form.Text>
            </Form.Group>
          </div>
          <div className="col-sm-6">
            <Form.Group className="mb-3">
              <Form.Label>Moneda</Form.Label>
              <Form.Select
                name="moneda"
                value={moneda}
                onChange={onInputChange}
                aria-label="Default select example"
                disabled={onlyView}
              >
                <option value="SOLES">SOLES</option>
                <option value="DOLARES">DOLARES</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Monto</Form.Label>
              <Form.Control
                type="number"
                name="monto"
                value={monto}
                onChange={onInputChange}
                step={0.01}
                placeholder="Monto"
                disabled={onlyView}
              />
              <Form.Text className="text-danger">{formErrors.monto}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tipo Documento</Form.Label>
              <Form.Select
                name="tipoDoc"
                value={tipoDoc}
                onChange={onInputChange}
                disabled={onlyView}
              >
                <option value="DNI">DNI</option>
                <option value="RUC">RUC</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>N Documento</Form.Label>
              <Form.Control
                type="number"
                name="numDoc"
                value={numDoc}
                onChange={onInputChange}
                placeholder="Número de documento"
                disabled={onlyView}
              />
              <Form.Text className="text-danger">{formErrors.numDoc}</Form.Text>
            </Form.Group>
          </div>
    </>
  )
}
