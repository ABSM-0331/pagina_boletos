import React, { useState } from "react";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch(
                "https://api-boletos-production-1679.up.railway.app/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                }
            );

            const data = await response.json();

            if (response.ok && data.success) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("usuario", JSON.stringify(data.usuario));
                window.location.href = "/comprar-boletos";
            } else {
                setError(data.message || "Error al iniciar sesión");
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
                <div className="col-lg-6 col-md-8">
                    <div className="card shadow-sm border-0">
                        <div className="card-body p-4 p-md-5">
                            <p className="text-uppercase text-muted mb-2 small fw-bold text-center">
                                Acceso
                            </p>
                            <h1 className="h4 mb-3 text-center">
                                Iniciar sesión
                            </h1>
                            <p className="text-secondary mb-4 text-center">
                                Ingresa tus credenciales para continuar con tus
                                compras de boletos.
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
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
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
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className="col-12 d-flex align-items-center gap-3 flex-wrap mt-2">
                                    <button
                                        type="submit"
                                        className="btn btn-success"
                                        disabled={loading}
                                    >
                                        {loading ? "Ingresando..." : "Ingresar"}
                                    </button>
                                    <Link
                                        to="/registro"
                                        className="link-success fw-semibold"
                                    >
                                        Crear una cuenta
                                    </Link>
                                </div>
                            </form>

                            <div className="mt-4 p-3 bg-success-subtle rounded">
                                <h2 className="h6 mb-2 text-success">
                                    ¿Primera vez aquí?
                                </h2>
                                <ul className="mb-2 ps-3 small text-success">
                                    <li>Guarda tus datos y rutas favoritas.</li>
                                    <li>
                                        Historial de boletos y facturación
                                        rápida.
                                    </li>
                                    <li>
                                        Alertas de nuevos horarios y
                                        promociones.
                                    </li>
                                </ul>
                                <Link
                                    to="/registro"
                                    className="btn btn-outline-success btn-sm"
                                >
                                    Crear cuenta
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
