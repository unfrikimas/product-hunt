import React from 'react';
import Layout from '../components/layouts/Layout';
import DetallesProducto from '../components/layouts/DetallesProducto';
import useProductos from '../hooks/useProductos';
import { css } from '@emotion/react';

const Home = () => {

  const { productos } = useProductos('creado');

  return (
    <>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <h1 css={css`
              text-align: center;
            `}>Todos los productos</h1>
            <ul className="bg-white">
              {productos.map(producto => (
                <DetallesProducto 
                  key={producto.id}
                  producto={producto}
                />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Home
