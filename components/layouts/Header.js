import React from "react";
import Buscar from '../ui/Buscar';
import Navegacion from '../layouts/Navegacion';
import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <div>
        <div>
          <p>Product Hunt</p>
            <Buscar />
            <Navegacion />
        </div>
        <div>
            <p>Hola: Carlos</p>
        </div>
            <button type="button">Cerrar sesión</button>
            <Link href="/">Login</Link>
            <Link href="/">Crear cuenta</Link>
      </div>
    </header>
  );
};

export default Header;
