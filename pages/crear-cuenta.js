import React from 'react';
import { css } from '@emotion/react';
import Layout from '../components/layouts/Layout';
import { Formulario, Campo, InputSubmit, Error } from '../components/ui/Formulario';

//validaciones
import useValidacion from '../hooks/useValidacion';
import validarCrearCuenta from '../validacion/validarCrearCuenta';

const STATE_INICIAL = {
  nombre: '',
  email: '',
  password: ''
}



const CrearCuenta = () => {

  const { valores, errores, handleSubmit, handleChange, handleBlur } = useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta);

  //extraer datos del objeto valores
  const { nombre, email, password } = valores

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
          <Formulario
            onSubmit={handleSubmit}
            noValidate
          >
            <Campo>
              <label htmlFor="nombre">Nombre</label>
              <input 
                type="text"
                id="nombre"
                placeholder="Tu nombre"
                name="nombre"
                value={nombre}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            { errores.nombre && <Error>{ errores.nombre }</Error> }
            <Campo>
              <label htmlFor="email">Email</label>
              <input 
                type="email"
                id="email"
                placeholder="Tu email"
                name="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            { errores.email && <Error>{ errores.email }</Error> }
            <Campo>
              <label htmlFor="password">Password</label>
              <input 
                type="password"
                id="password"
                placeholder="Tu password"
                name="password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            { errores.password && <Error>{ errores.password }</Error> }
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