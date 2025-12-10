import React, { useState } from "react";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        telefono: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                "https://api-boletos-production-1679.up.railway.app/registro",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nombre: formData.nombre,
                        email: formData.email,
                        telefono: formData.telefono,
                        password: formData.password,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok && data.success) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("usuario", JSON.stringify(data.usuario));
                window.location.href = "/comprar-boletos";
            } else {
                setError(data.message || "Error al registrarse");
            }
        } catch (err) {
            setError("Error de conexión. Por favor intenta nuevamente.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-xl-8 col-lg-10">
                    <div className="row g-0 border rounded shadow-sm overflow-hidden bg-white">
                        <div className="col-lg-6 p-4 p-md-5">
                            <p className="text-uppercase text-muted mb-2 small fw-bold">
                                Registro
                            </p>
                            <h1 className="h3 mb-3">Crear cuenta</h1>
                            <p className="text-secondary mb-4">
                                Guarda tus rutas favoritas y paga más rápido la
                                próxima vez.
                            </p>

                            {error && (
                                <div
                                    className="alert alert-danger"
                                    role="alert"
                                >
                                    {error}
                                </div>
                            )}

                            <form className="row gy-3" onSubmit={handleSubmit}>
                                <div className="col-12">
                                    <label
                                        className="form-label"
                                        htmlFor="name"
                                    >
                                        Nombre completo
                                    </label>
                                    <input
                                        id="name"
                                        name="nombre"
                                        type="text"
                                        className="form-control"
                                        placeholder="Nombre y apellidos"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-12">
                                    <label
                                        className="form-label"
                                        htmlFor="email"
                                    >
                                        Correo electrónico
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="form-control"
                                        placeholder="tu@email.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-12">
                                    <label
                                        className="form-label"
                                        htmlFor="telefono"
                                    >
                                        Teléfono
                                    </label>
                                    <input
                                        id="telefono"
                                        name="telefono"
                                        type="tel"
                                        className="form-control"
                                        placeholder="9991234567"
                                        value={formData.telefono}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-12">
                                    <label
                                        className="form-label"
                                        htmlFor="password"
                                    >
                                        Contraseña
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        className="form-control"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-12">
                                    <label
                                        className="form-label"
                                        htmlFor="confirm"
                                    >
                                        Confirmar contraseña
                                    </label>
                                    <input
                                        id="confirm"
                                        name="confirmPassword"
                                        type="password"
                                        className="form-control"
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-12 d-flex align-items-center gap-3 flex-wrap mt-2">
                                    <button
                                        type="submit"
                                        className="btn btn-success"
                                        disabled={loading}
                                    >
                                        {loading
                                            ? "Registrando..."
                                            : "Registrarme"}
                                    </button>
                                    <Link
                                        to="/login"
                                        className="link-success fw-semibold"
                                    >
                                        Ya tengo cuenta
                                    </Link>
                                </div>
                            </form>
                        </div>

                        <div className="col-lg-6 bg-success text-white d-flex flex-column p-4 p-md-5">
                            <div className="mb-4">
                                <p className="text-uppercase small mb-1 fw-semibold opacity-75">
                                    Beneficios
                                </p>
                                <h2 className="h4 mb-2">Viaja con ventajas</h2>
                                <p className="opacity-90 mb-0">
                                    Guarda tus datos y recibe avisos para no
                                    perder las mejores salidas y promociones.
                                </p>
                            </div>
                            <ul className="mb-4 ps-3">
                                <li className="mb-1">
                                    Historial de boletos y facturas.
                                </li>
                                <li className="mb-1">
                                    Preferencias guardadas.
                                </li>
                                <li className="mb-1">
                                    Alertas de horarios y promos.
                                </li>
                            </ul>
                            <div className="mt-auto">
                                <Link
                                    to="/login"
                                    className="btn btn-outline-light w-100"
                                >
                                    Iniciar sesión
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
