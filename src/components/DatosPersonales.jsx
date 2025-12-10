const DatosPersonales = ({
    nombre,
    setNombre,
    email,
    setEmail,
    telefono,
    setTelefono,
}) => {
    return (
        <div className="section-form mb-4">
            <h5 className="section-title mb-3">Datos Personales</h5>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="nombre" className="form-label">
                        Nombre Completo
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        placeholder="juan perez lopez"
                        required
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="jesusypolanco@gmail.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="telefono" className="form-label">
                        Teléfono
                    </label>
                    <input
                        type="tel"
                        className="form-control"
                        id="telefono"
                        placeholder="+1 234 567 8900"
                        required
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default DatosPersonales;
