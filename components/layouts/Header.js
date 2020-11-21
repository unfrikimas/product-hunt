import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Buscar from "../ui/Buscar";
import Navegacion from "../layouts/Navegacion";
import Boton from '../ui/Boton';

const ContenedorHeader = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;
const Logo = styled.p`
    color: var(--naranja);
    font-size: 4rem;
    line-height: 0;
    font-weight: 700;
    font-family: 'Roboto Slab', serif;
    margin-right: 2rem;
`;

const Header = () => {

    const usuario = false;

  return (
    <header
      css={css`
        border-bottom: 2px solid var(--gris3);
        padding: 1rem 0;
      `}
    >
      <ContenedorHeader>
        <div>
            <Link href="/">
                <Logo>Product Hunt</Logo>
            </Link>
            <Buscar />
            <Navegacion />
        </div>
        <div
            css={css`
                display: flex;
                align-items: center;
            `}
        >
            { usuario ? (
                <>
                    <p
                        css={css`
                            margin-right: 2rem;
                        `}
                    >Hola: Carlos</p>
                    <Boton bgColor="true">Cerrar sesión</Boton>
                </>
            ) : (
                <>
                    <Link href="/">
                        <Boton bgColor="true">Login</Boton>
                    </Link>
                    <Link href="/">
                        <Boton>Crear cuenta</Boton>
                    </Link>   
                </>
            ) }
        </div>
      </ContenedorHeader>
    </header>
  );
};

export default Header;
