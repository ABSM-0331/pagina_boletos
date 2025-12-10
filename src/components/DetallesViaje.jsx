import React from "react";

const DetallesViaje = ({
    origen,
    setOrigen,
    origenes, // ← Array de origenes desde DB
    rutas, // ← Rutas filtradas
    rutaSeleccionada,
    setRutaSeleccionada,
    horarios,
    horario,
    setHorario,
    fecha,
    setFecha,
    pasajeros,
    setPasajeros,
    clase,
    setClase,
    clasesOptions,
    asiento,
    setAsiento,
}) => {
    return (
        <div className="section-form mb-4">
            <h5 className="section-title mb-3">Detalles del Viaje</h5>

            <div className="row">
                {/* ORIGEN */}
                <div className="col-md-6 mb-3">
                    <label className="form-label">Origen</label>
                    <select
                        className="form-select"
                        value={origen}
                        onChange={(e) => setOrigen(e.target.value)}
                        required
                    >
                        <option value="">Selecciona origen</option>
                        {origenes.map((o, i) => (
                            <option key={i} value={o}>
                                {o}
                            </option>
                        ))}
                    </select>
                </div>

                {/* RUTA (Origen - Destino) */}
                <div className="col-md-6 mb-3">
                    <label className="form-label">Ruta</label>
                    <select
                        className="form-select"
                        value={rutaSeleccionada}
                        onChange={(e) => {
                            setRutaSeleccionada(e.target.value);
                        }}
                        required
                    >
                        <option value="">Selecciona ruta</option>
                        {rutas.map((r) => (
                            <option key={r.id_ruta} value={r.id_ruta}>
                                {r.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-label">Fecha</label>
                    <input
                        type="date"
                        className="form-control"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        required
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">Horario</label>
                    <select
                        className="form-select"
                        value={horario}
                        onChange={(e) => setHorario(e.target.value)}
                        required
                    >
                        <option value="">Selecciona horario</option>
                        {horarios.map((h) => (
                            <option key={h.id_horario} value={h.id_horario}>
                                {h.hora_salida}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-label">Pasajeros</label>
                    <input
                        type="number"
                        className="form-control"
                        value={pasajeros}
                        min="1"
                        max="10"
                        onChange={(e) => setPasajeros(e.target.value)}
                        required
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">Clase de Servicio</label>
                    <select
                        className="form-select"
                        value={clase}
                        onChange={(e) => setClase(e.target.value)}
                        required
                    >
                        <option value="">Selecciona clase</option>
                        {clasesOptions.map((opt, i) => (
                            <option key={i} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-label">Preferencia de Asiento</label>
                    <select
                        className="form-select"
                        value={asiento}
                        onChange={(e) => setAsiento(e.target.value)}
                        required
                    >
                        <option value="">Cualquiera</option>
                        <option value="ventana">Ventana</option>
                        <option value="pasillo">Pasillo</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default DetallesViaje;
