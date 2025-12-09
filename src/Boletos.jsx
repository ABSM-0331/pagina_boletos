import { useState, useEffect } from "react";
import DatosPersonales from "./components/DatosPersonales";
import DetallesViaje from "./components/DetallesViaje";
import OpcionesAdicionales from "./components/OpcionesAdicionales";
import ResumenCompra from "./components/ResumenCompra";
import TicketPDF from "./components/TicketPDF";

const Boletos = () => {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");

    const [origen, setOrigen] = useState("");
    const [origenes, setOrigenes] = useState([]);

    const [rutaSeleccionada, setRutaSeleccionada] = useState("");
    const [rutas, setRutas] = useState([]);

    // AQUÍ GUARDAMOS EL TEXTO EXACTO "Mérida - Peto"
    const [destinoTexto, setDestinoTexto] = useState("-");

    const [horario, setHorario] = useState("");
    const [horarios, setHorarios] = useState([]);

    const [fecha, setFecha] = useState("");
    const [pasajeros, setPasajeros] = useState(1);
    const [clase, setClase] = useState("");
    const [clasesOptions, setClasesOptions] = useState([]);
    const [precioBase, setPrecioBase] = useState(0);

    const [asiento, setAsiento] = useState("");
    const [seguro, setSeguro] = useState(false);
    const [equipaje, setEquipaje] = useState(false);

    const [metodoPago, setMetodoPago] = useState("Efectivo");
    const [showModal, setShowModal] = useState(false);
    const [showTicket, setShowTicket] = useState(false);
    const [datosTicket, setDatosTicket] = useState(null);

    const [resumen, setResumen] = useState({
        origenText: "-",
        destinoText: "-",
        fechaText: "-",
        horarioText: "-",
        pasajeros: "-",
        claseText: "-",
        subtotal: "$0",
        adicionales: "$0",
        total: "$0",
    });

    const preciosAdicionales = { seguro: 100, equipaje: 50 };

    // 1. Cargar orígenes
    useEffect(() => {
        fetch("http://localhost:3000/origens")
            .then((r) => r.json())
            .then(setOrigenes);
    }, []);

    // 2. Cargar rutas cuando cambia origen
    useEffect(() => {
        if (origen) {
            fetch(
                `http://localhost:3000/rutas?origen=${encodeURIComponent(
                    origen
                )}`
            )
                .then((r) => r.json())
                .then((data) => {
                    setRutas(data);
                    // Si ya había una ruta seleccionada, mantener su texto
                    // console.log(rutaSeleccionada);
                    if (rutaSeleccionada) {
                        const ruta = data.find(
                            (r) => r.id_ruta == rutaSeleccionada
                        );
                        if (ruta) setDestinoTexto(ruta.destino);
                    }
                });
        } else {
            setRutas([]);
            setDestinoTexto("-");
        }
        // // setRutaSeleccionada("");
        // setHorario("");
        // setClase("");
        // setPrecioBase(0);
        // setClasesOptions([]);
    }, [origen, rutaSeleccionada]);

    // 3. CUANDO SE SELECCIONA UNA RUTA → GUARDAR EL TEXTO "Mérida - Peto"
    useEffect(() => {
        if (rutaSeleccionada && rutas.length > 0) {
            const ruta = rutas.find((r) => r.id_ruta === rutaSeleccionada);
            if (ruta) {
                setDestinoTexto(ruta.label); // AQUÍ SE GUARDA EL TEXTO EXACTO
            }
        } else if (!rutaSeleccionada) {
            setDestinoTexto("-");
        }

        // Cargar horarios de esa ruta
        if (rutaSeleccionada) {
            fetch(`http://localhost:3000/horarios?id_ruta=${rutaSeleccionada}`)
                .then((r) => r.json())
                .then(setHorarios);
        } else {
            setHorarios([]);
        }

        setHorario("");
        setClase("");
        setPrecioBase(0);
        setClasesOptions([]);
    }, [rutaSeleccionada, rutas]);

    // 4. Precio y clases
    useEffect(() => {
        if (rutaSeleccionada && horario) {
            fetch(
                `http://localhost:3000/precio?id_ruta=${rutaSeleccionada}&id_horario=${horario}`
            )
                .then((r) => r.json())
                .then((data) => {
                    const base = data.precio_base || 0;
                    setPrecioBase(base);
                    setClasesOptions([
                        {
                            value: "Económico",
                            label: `Económico - $${base.toLocaleString(
                                "es-CO"
                            )}`,
                        },
                        {
                            value: "Ejecutivo",
                            label: `Ejecutivo - $${(base + 100).toLocaleString(
                                "es-CO"
                            )}`,
                        },
                        {
                            value: "Premium",
                            label: `Premium - $${(base + 300).toLocaleString(
                                "es-CO"
                            )}`,
                        },
                    ]);
                });
        }
    }, [rutaSeleccionada, horario]);

    // 5. Resumen → USAMOS destinoTexto
    // 5. Resumen → CORREGIDO: fecha y horario ahora sí aparecen bien
    useEffect(() => {
        // CORREGIR FECHA (problema de zona horaria)
        const fechaCorregida = fecha
            ? (() => {
                  const date = new Date(fecha);
                  // Ajustar zona horaria (Colombia UTC-5)
                  const offset = date.getTimezoneOffset() * 60000;
                  const localDate = new Date(date.getTime() + offset);
                  return localDate.toLocaleDateString("es-CO");
              })()
            : "-";

        // CORREGIR HORARIO (ahora sí se guarda bien)
        const horarioTexto =
            horarios.find((h) => h.id_horario === parseInt(horario))
                ?.hora_salida || "-";

        const claseText =
            clasesOptions.find((c) => c.value === clase)?.label || "-";

        let precioPorPersona = precioBase;
        if (clase === "Ejecutivo") precioPorPersona += 100;
        if (clase === "Premium") precioPorPersona += 300;

        const subtotal = precioPorPersona * pasajeros;
        const adicionales =
            ((seguro ? 100 : 0) + (equipaje ? 50 : 0)) * pasajeros;
        const total = subtotal + adicionales;

        setResumen({
            origenText: origen || "-",
            destinoText: destinoTexto,
            fechaText: fechaCorregida, // FECHA CORREGIDA
            horarioText: horarioTexto, // HORARIO AHORA SÍ APARECE
            pasajeros: pasajeros || "-",
            claseText,
            subtotal: "$" + subtotal.toLocaleString("es-CO"),
            adicionales: "$" + adicionales.toLocaleString("es-CO"),
            total: "$" + total.toLocaleString("es-CO"),
        });
    }, [
        origen,
        destinoTexto,
        fecha,
        horario,
        horarios,
        pasajeros,
        clase,
        clasesOptions,
        seguro,
        equipaje,
        precioBase,
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !nombre ||
            !email ||
            !telefono ||
            !origen ||
            !rutaSeleccionada ||
            !fecha ||
            !horario ||
            !pasajeros ||
            !clase ||
            !asiento
        ) {
            alert("Completa todos los campos");
            return;
        }
        setShowModal(true);
    };

    const confirmarPago = () => {
        const totalNumerico = parseFloat(resumen.total.replace(/\$|,/g, ""));

        const venta = {
            nombre,
            email,
            telefono,
            id_ruta: rutaSeleccionada,
            id_horario: horario,
            fecha_viaje: fecha,
            pasajeros,
            clase,
            total: totalNumerico,
            metodo_pago: metodoPago,
        };

        fetch("http://localhost:3000/ventas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(venta),
        })
            .then((r) => r.json())
            .then((result) => {
                if (result.success) {
                    const adicionales = [];
                    if (seguro) adicionales.push("Seguro de Viaje (+$100)");
                    if (equipaje) adicionales.push("Equipaje Extra (+$50)");

                    // HORARIO AHORA SÍ SE ENVÍA CORRECTO AL TICKET
                    const horarioDelTicket =
                        horarios.find((h) => h.id_horario === parseInt(horario))
                            ?.hora_salida || "-";

                    setDatosTicket({
                        origen,
                        destino: destinoTexto,
                        // FECHA CORREGIDA PARA EL PDF (evita que reste un día)
                        fecha: (() => {
                            const date = new Date(fecha);
                            // Ajuste manual para Colombia (UTC-5)
                            const offset = date.getTimezoneOffset() * 60000;
                            const localDate = new Date(date.getTime() + offset);
                            return localDate.toLocaleDateString("es-CO");
                        })(),
                        horario:
                            horarios.find(
                                (h) => h.id_horario === parseInt(horario)
                            )?.hora_salida || "-",
                        pasajeros,
                        clase,
                        adicionales,
                        total: resumen.total,
                        id_venta: result.id_venta,
                    });

                    setShowTicket(true);
                    setShowModal(false);
                }
            });
    };

    return (
        <>
            {/* Header y main igual que antes */}

            <main className="container py-5">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="card shadow-lg border-0">
                            <div className="card-header form-header">
                                <h2 className="card-title mb-0">
                                    Formulario de Compra
                                </h2>
                            </div>
                            <div className="card-body p-4">
                                <form onSubmit={handleSubmit}>
                                    <DatosPersonales
                                        nombre={nombre}
                                        setNombre={setNombre}
                                        email={email}
                                        setEmail={setEmail}
                                        telefono={telefono}
                                        setTelefono={setTelefono}
                                    />
                                    <hr className="my-4" />
                                    <DetallesViaje
                                        origen={origen}
                                        setOrigen={setOrigen}
                                        origenes={origenes}
                                        rutas={rutas}
                                        rutaSeleccionada={rutaSeleccionada}
                                        setRutaSeleccionada={
                                            setRutaSeleccionada
                                        }
                                        horarios={horarios}
                                        horario={horario}
                                        setHorario={setHorario}
                                        fecha={fecha}
                                        setFecha={setFecha}
                                        pasajeros={pasajeros}
                                        setPasajeros={setPasajeros}
                                        clase={clase}
                                        setClase={setClase}
                                        clasesOptions={clasesOptions}
                                        asiento={asiento}
                                        setAsiento={setAsiento}
                                    />
                                    <hr className="my-4" />
                                    <OpcionesAdicionales
                                        seguro={seguro}
                                        setSeguro={setSeguro}
                                        equipaje={equipaje}
                                        setEquipaje={setEquipaje}
                                    />
                                    <div className="d-grid gap-2 mt-4">
                                        <button
                                            type="submit"
                                            className="btn btn-compra btn-lg"
                                        >
                                            Proceder al Pago
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <ResumenCompra resumen={resumen} />
                    </div>
                </div>
            </main>

            {/* Modal y Ticket igual */}
            {showModal && (
                <div className="modal fade show d-block bg-dark bg-opacity-50">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Método de Pago</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        id="efectivo"
                                        value="Efectivo"
                                        checked={metodoPago === "Efectivo"}
                                        onChange={(e) =>
                                            setMetodoPago(e.target.value)
                                        }
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="efectivo"
                                    >
                                        Efectivo
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        id="tarjeta"
                                        value="Tarjeta"
                                        checked={metodoPago === "Tarjeta"}
                                        onChange={(e) =>
                                            setMetodoPago(e.target.value)
                                        }
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="tarjeta"
                                    >
                                        Tarjeta
                                    </label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={confirmarPago}
                                >
                                    Confirmar Pago
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showTicket && datosTicket && (
                <TicketPDF
                    datos={datosTicket}
                    onClose={() => setShowTicket(false)}
                />
            )}
        </>
    );
};

export default Boletos;
