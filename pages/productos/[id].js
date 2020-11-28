import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layouts/Layout';
import { formatDistanceToNow, format } from 'date-fns'
import { es } from 'date-fns/locale';
import { FirebaseContext } from '../../firebase';
import Error404 from '../../components/layouts/404';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Campo, InputSubmit } from '../../components/ui/Formulario';
import Boton from '../../components/ui/Boton';

const ContenedorProducto = styled.div`
    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
`;
const TextoFecha = styled.p`
    font-size: 1.4rem;
`;

const Producto = () => {

    //state del componente
    const [ producto, guardarProducto ] = useState({});
    const [ error, guardarError ] = useState(false);

    //Routing para obtener el id actual
    const router = useRouter();
    const { query: { id } } = router;

    //context de firebase
    const { firebase, usuario } = useContext(FirebaseContext);

    useEffect(() => {
        if(id) {
            const obtenerProducto = async () => {
                const productoQuery = await firebase.db.collection('productos').doc(id);
                const producto = await productoQuery.get();
                if(producto.exists) {
                    guardarProducto(producto.data());
                } else {
                    guardarError(true);
                }
            }
            obtenerProducto();
        }
    }, [id]);
    
    const { comentarios, creado, descripcion, empresa, nombre, url, urlimagen, votos, creador } = producto

    return (  
        <Layout>
            <>
                { error && <Error404 /> }
                <div className="contenedor">
                    <h1 css={css`
                        text-align: center;
                        margin-top: 5rem;
                    `}>{nombre}</h1>
                    <ContenedorProducto>
                        <div>
                            {/* <TextoFecha>Publicado el {format(new Date(Date(creado)), 'MM/dd/yyyy')}</TextoFecha> */}
                            <img src={urlimagen}  />
                            <p>{descripcion}</p>
                            <p css={css`
                                font-size: 1.4rem;
                                color: #888;
                            `}>Publicado por {creador && creador.nombre} de {empresa} </p>

                            { usuario && (
                                <>
                                    <h2>Agrega tu comentario</h2>
                                    <form>
                                        <Campo>
                                            <input 
                                                type="text"
                                                name="mensaje"
                                            />
                                        </Campo>
                                        <InputSubmit 
                                            type="submit"
                                            value="Agregar comentario"
                                        />
                                    </form>                                
                                </>
                            ) }

                            <h2>Comentarios</h2>
                            {/* {comentarios.map(comentario => (
                               <li>
                                   <p>{comentario.nombre}</p>
                                   <p>{comentario.usuarioNombre}</p>
                               </li> 
                            ))} */}
                        </div>
                        <aside>
                            <Boton
                                target="_blank"
                                bgColor="true"
                                href={url}
                            >Visitar URL</Boton>
                            
                            <div css={css`
                                margin-top: 5rem;
                            `}>
                                <p css={css`
                                    text-align: center;
                                `}>{votos} Votos</p>
                                { usuario && (
                                    <Boton>
                                        Votar
                                    </Boton>
                                ) }
                            </div>
                        </aside>
                    </ContenedorProducto>
                </div>
            </>
        </Layout>
    );
}
 
export default Producto;