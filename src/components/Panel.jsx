import React from 'react';
import UserInfo from './UserInfo';

const Panel = () => {
  const handleStartTest = () => {
    alert("Iniciando test diario...");
  };

  return (
    <div className="panel">
      <UserInfo />
      <button onClick={handleStartTest}>Iniciar test diario</button>
    </div>
  );
};

export default Panel;
