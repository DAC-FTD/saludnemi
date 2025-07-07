import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/home">Inicio</Link></li>
        <li><Link to="/ranking">Ranking</Link></li>
        <li><Link to="/documentacion">Documentación</Link></li>
        <li><Link to="/mas-info">Más Información</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
