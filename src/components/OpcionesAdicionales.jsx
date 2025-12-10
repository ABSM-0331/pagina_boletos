import React from 'react';

const OpcionesAdicionales = ({ seguro, setSeguro, equipaje, setEquipaje }) => {
  return (
    <div className="section-form mb-4">
      <h5 className="section-title mb-3">Opciones Adicionales</h5>
      <div className="form-check mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          id="seguro"
          checked={seguro}
          onChange={(e) => setSeguro(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="seguro">
          Agregar Seguro de Viaje (+$100)
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="equipaje"
          checked={equipaje}
          onChange={(e) => setEquipaje(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="equipaje">
          Equipaje Extra (+$50)
        </label>
      </div>
    </div>
  );
};

export default OpcionesAdicionales;