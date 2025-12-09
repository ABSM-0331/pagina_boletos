import React from "react";
import "./styles_rutas.css";

export default function CompHorarios({ isOpen, route, onClose, horarios }) {
  // Si no está abierto, no renderiza nada
  if (!isOpen) return null;

  const modalTitle = route
    ? `Horarios - ${route.origen} - ${route.destino}`
    : "Horarios";

  return (
    // Fondo oscuro del modal
    <div className="modal-backdrop">
      {/* Contenido del Modal */}
      <div className="modal-dialog-custom">
        <div className="modal-content-custom">
          <div className="modal-header-custom">
            <h5 className="modal-title-custom">{modalTitle}</h5>
            {/* Botón de cerrar */}
            <button
              type="button"
              className="btn-close-custom"
              onClick={onClose}
            >
              &times;
            </button>
          </div>

          <div className="modal-body-custom">
            {horarios && horarios.length > 0 ? (
              <ul className="horarios-list">
                {horarios.map((hora, index) => (
                  <li key={index} className="horario-item">
                    {hora}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay horarios disponibles para esta ruta.</p>
            )}
          </div>

          <div className="modal-footer-custom">
            {/* El botón de comprar haría una redirección */}
            <button
              type="button"
              className="btn-comprar"
              onClick={() => enviarDatos(route.origen, route.destino)}
            >
              Comprar Boleto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function enviarDatos(origen, destino) {
  console.log("Origen:", origen);
  console.log("Destino:", destino);

  //abrir la pagina de boletos y obtener los valores para usarlos
}
