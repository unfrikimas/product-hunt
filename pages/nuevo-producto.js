import React, { useState, useContext } from "react";
import { css } from "@emotion/react";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import Router, { useRouter } from "next/router";
import FileUploader from 'react-firebase-file-uploader';
import Layout from "../components/layouts/Layout";
import { Formulario, Campo, InputSubmit, Error, } from "../components/ui/Formulario";

//importando firebase context
import { FirebaseContext } from "../firebase/";

//validaciones
import useValidacion from "../hooks/useValidacion";
import validarCrearProducto from "../validacion/validarCrearProducto";

const STATE_INICIAL = {
  nombre: "",
  empresa: "",
  url: "",
  descripcion: ""
};

const NuevoProducto = () => {

  //state de la imagen
  const [ imagen, guardarImagen ] = useState(null);
  const [ cargando, guardarCargando ] = useState(false);
  const [ urlimagen, guardarUrlImagen ] = useState('');

  //state de los errores
  const [error, guardarError] = useState(false);

  const {
    valores,
    errores,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidacion(STATE_INICIAL, validarCrearProducto, crearProducto);

  //extraer datos del objeto valores
  const { nombre, empresa, url, descripcion } = valores;

  //hook de routing para redireccionar
  const router = useRouter();

  //context con las operaciones CRUD de firebase
  const { usuario, firebase } = useContext(FirebaseContext);

  function crearProducto() {

    //si el usuario no esta autenticado llevar al login
    if(!usuario) {
      return router.push('/login');
    }

    //objeto de nuevo producto
    const producto = {
      nombre,
      empresa,  
      url, 
      urlimagen,
      descripcion,
      votos: 0,
      comentarios: [],
      creado: Date.now()
    }
    
    //insertar productos en la base de datos
    firebase.db.collection('productos').add(producto);

    //redireccionar luego de agregar un producto
    return router.push('/');

  }

  // //funcion para guardar en memoria la imagen subida, usado para Firebase
  // const handleChangeImage = e => {
  //     guardarImagen(e.target.files[0]);
  // };

  const SubirACloudinary = async e => {
    const files = e.target.files[0];
    const formData = new FormData();
    formData.append('upload_preset', 'product-hunt');
    formData.append('file', files);
    guardarCargando(true);

    try {
      const res = await axios.post(`https://api.cloudinary.com/v1_1/petportrait/upload`, formData)
      guardarUrlImagen(res.data.secure_url)
      guardarCargando(false)
    } catch (error) {
      console.log(error);
    }
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
          >
            Crear nuevo producto
          </h1>
          <Formulario 
            onSubmit={handleSubmit} 
            noValidate
          >
            <fieldset>
              <legend>Información general</legend>
              <Campo>
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  placeholder="Tu nombre"
                  name="nombre"
                  value={nombre}
                  onChange={handleChange}
                  // onBlur={handleBlur}
                />
              </Campo>
              {errores.nombre && <Error>{errores.nombre}</Error>}
              <Campo>
                <label htmlFor="empresa">Empresa</label>
                <input
                  type="text"
                  id="empresa"
                  placeholder="Tu empresa"
                  name="empresa"
                  value={empresa}
                  onChange={handleChange}
                  // onBlur={handleBlur}
                />
              </Campo>
              {errores.empresa && <Error>{errores.empresa}</Error>}

              <Campo>
                <label htmlFor="imagen">Imagen</label>
                <input
                  type="file" 
                  name="img"
                  onChange={SubirACloudinary}
                />
              </Campo>
              { cargando 
                ? <h3>Cargando...</h3> 
                : <Campo><img className="clase" width="100" src={ urlimagen } /></Campo> 
              }
              <Campo>
                <label htmlFor="url">URL</label>
                <input
                  type="url"
                  id="url"
                  name="url"
                  placeholder="URL de tu producto"
                  value={url}
                  onChange={handleChange}
                  // onBlur={handleBlur}
                />
              </Campo>
              {errores.url && <Error>{errores.url}</Error>}
            </fieldset>

            <fieldset>
              <legend>Sobre tu producto</legend>
              <Campo>
                <label htmlFor="descripcion">Descripción</label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={descripcion}
                  onChange={handleChange}
                  // onBlur={handleBlur}
                />
              </Campo>
              {errores.descripcion && <Error>{errores.descripcion}</Error>}
            </fieldset>

            {/* error desde firebase */}
            {error && <Error><p>Hubo un error subiendo el producto</p></Error>}
            <InputSubmit type="submit" value="Crear producto" />
          </Formulario>
        </div>
      </Layout>
    </>
  );

};

export default NuevoProducto;
