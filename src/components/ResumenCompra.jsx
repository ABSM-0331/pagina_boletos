const ResumenCompra = ({ resumen }) => {
    return (
        <div
            className="card shadow-lg border-0 sticky-top"
            style={{ top: "20px" }}
        >
            <div className="card-header resumen-header">
                <h5 className="card-title mb-0">Resumen de Compra</h5>
            </div>
            <div className="card-body p-4">
                <div className="resumen-item mb-3">
                    <span>Origen:</span>
                    <span className="resumen-valor">{resumen.origenText}</span>
                </div>
                <div className="resumen-item mb-3">
                    <span>Destino:</span>
                    <span className="resumen-valor">{resumen.destinoText}</span>
                </div>
                <div className="resumen-item mb-3">
                    <span>Fecha:</span>
                    <span className="resumen-valor">{resumen.fechaText}</span>
                </div>
                <div className="resumen-item mb-3">
                    <span>Horario:</span>
                    <span className="resumen-valor">{resumen.horario}</span>
                </div>
                <div className="resumen-item mb-3">
                    <span>Pasajeros:</span>
                    <span className="resumen-valor">{resumen.pasajeros}</span>
                </div>
                <div className="resumen-item mb-3">
                    <span>Clase:</span>
                    <span className="resumen-valor">{resumen.claseText}</span>
                </div>
                <hr />
                <div className="resumen-item mb-3">
                    <span>Subtotal:</span>
                    <span className="resumen-valor">{resumen.subtotal}</span>
                </div>
                <div className="resumen-item mb-3">
                    <span>Adicionales:</span>
                    <span className="resumen-valor">{resumen.adicionales}</span>
                </div>
                <hr />
                <div className="resumen-item total">
                    <span>
                        <strong>TOTAL:</strong>
                    </span>
                    <span className="resumen-valor">
                        <strong>{resumen.total}</strong>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ResumenCompra;
