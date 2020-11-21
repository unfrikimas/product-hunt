import React from "react";
import Buscar from '../ui/Buscar';

const Header = () => {
  return (
    <header>
      <div>
        <div>
          <p>Product Hunt</p>
            <Buscar />
            {/* Nav aqui */}
        </div>
        <div>
            {/* Menu de administracion */}
        </div>
      </div>
    </header>
  );
};

export default Header;
