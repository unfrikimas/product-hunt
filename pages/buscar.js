import React, { useEffect, useState } from 'react';
import Layout from '../components/layouts/Layout';
import { useRouter } from 'next/router';
import DetallesProducto from '../components/layouts/DetallesProducto';
import useProductos from '../hooks/useProductos';
import { css } from '@emotion/react';

const Buscar = () => {

  const router = useRouter();
  const { query: { q } } = router;

  //todos los productos
  const { productos } = useProductos('creado');  
  const [ resultado, guardarResultado ] = useState([]);
  
  useEffect(() => {
    if(q) {
      const busqueda = q.toLowerCase();
      const filtro = productos.filter(producto => {
        return (
          producto.nombre.toLowerCase().includes(busqueda) ||
          producto.descripcion.toLowerCase().includes(busqueda)
        )
      });
      guardarResultado(filtro);
    }
  }, [q, productos]);

  return (
    <>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <h1 css={css`
              text-align: center;
            `}>Filtrado por {q}</h1>
            <ul className="bg-white">
              {resultado.map(producto => (
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

export default Buscar