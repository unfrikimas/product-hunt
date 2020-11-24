import React, { useState } from 'react';
import { css } from '@emotion/react';
import Router from 'next/router';
import Layout from '../components/layouts/Layout';
import { Formulario, Campo, InputSubmit, Error } from '../components/ui/Formulario';

//importando firebase
import firebase from '../firebase';

//validaciones
import useValidacion from '../hooks/useValidacion';
import validarIniciarSesion from '../validacion/validarIniciarSesion';

const STATE_INICIAL = {
  email: '',
  password: ''
}

const Login = () => {

  const [ error, guardarError ] = useState(false);
  const { valores, errores, handleSubmit, handleChange, handleBlur } = useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion);

  //extraer datos del objeto valores
  const { email, password } = valores

  function iniciarSesion() {
    console.log('Iniciando sesion...');
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
          >Iniciar sesión</h1>
          <Formulario
            onSubmit={handleSubmit}
            noValidate
          >
            <Campo>
              <label htmlFor="email">Email</label>
              <input 
                type="email"
                id="email"
                placeholder="Tu email"
                name="email"
                value={email}
                onChange={handleChange}
                // onBlur={handleBlur}
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
                // onBlur={handleBlur}
              />
            </Campo>
            { errores.password && <Error>{ errores.password }</Error> }
            { error && <Error>{ error }</Error> }
            <InputSubmit 
              type="submit"
              value="Login"
            />
          </Formulario>
        </div>
      </Layout>
    </>
  )

}

export default Login