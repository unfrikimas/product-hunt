import React from 'react';
import { css } from '@emotion/react';
import Layout from '../components/layouts/Layout';
import { Formulario, Campo, InputSubmit } from '../components/ui/Formulario';

//validaciones
import useValidacion from '../hooks/useValidacion';
import validarCrearCuenta from '../validacion/validarCrearCuenta';

const STATE_INICIAL = {
  nombre: '',
  email: '',
  password: ''
}

const CrearCuenta = () => {

  const { valores, errores, submitForm, handleSubmit, handleChange } = useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta);

  function crearCuenta() {
    console.log('Creando cuenta...')
  }

  return (
    <>
      <Layout>
        <div>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >Crear cuenta</h1>
          <Formulario>
            <Campo>
              <label htmlFor="nombre">Nombre</label>
              <input 
                type="text"
                id="nombre"
                placeholder="Tu nombre"
                name="nombre"
              />
            </Campo>
            <Campo>
              <label htmlFor="email">Email</label>
              <input 
                type="email"
                id="email"
                placeholder="Tu email"
                name="email"
              />
            </Campo>
            <Campo>
              <label htmlFor="password">Password</label>
              <input 
                type="password"
                id="password"
                placeholder="Tu password"
                name="password"
              />
            </Campo>
            <InputSubmit 
              type="submit"
              value="Crear cuenta"
            />
          </Formulario>
        </div>
      </Layout>
    </>
  )
}

export default CrearCuenta