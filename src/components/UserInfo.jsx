import React, { useState, useEffect } from 'react';

const UserInfo = () => {
  const [user, setUser] = useState({ nombre: "Juan Pérez", puntos: 125 });

  useEffect(() => {
    // Aquí podrías agregar una llamada a tu backend para obtener los datos reales
  }, []);

  return (
    <div className="user-info">
      <h2>Bienvenido, {user.nombre}</h2>
      <p>Puntos acumulados: {user.puntos}</p>
    </div>
  );
};

export default UserInfo;
