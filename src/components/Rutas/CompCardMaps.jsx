import React from "react";
import "./styles_rutas.css";

export default function CompCardMaps({ route, onViewHorarios }) {
  const { origen, destino, distancia, tiempo, mapa } = route;

  // Función que llama a la prop con los datos de la ruta
  const handleViewHorarios = () => {
    onViewHorarios(route);
  };

  return (
    <div className="route-card">
      <div className="map-placeholder">
        <img src={mapa} alt={`Mapa ${origen} - ${destino}`} />
      </div>
      <h5 className="card-title">
        {origen} - {destino}
      </h5>
      <p className="card-text-small text-center">Distancia: ~{distancia}</p>
      <p className="card-text-small text-center">Tiempo: ~{tiempo}</p>
      <button className="btn-horarios" onClick={handleViewHorarios}>
        Ver Horarios
      </button>
    </div>
  );
}
