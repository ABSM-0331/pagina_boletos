import "./styles.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [usuario, setUsuario] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const checkAuth = () => {
        const token = localStorage.getItem("token");
        const usuarioData = localStorage.getItem("usuario");

        if (token) {
            setIsAuthenticated(true);
            if (usuarioData) {
                setUsuario(JSON.parse(usuarioData));
            }
        } else {
            setIsAuthenticated(false);
            setUsuario(null);
        }
    };

    useEffect(() => {
        checkAuth();
    }, [location]);

    useEffect(() => {
        window.addEventListener("storage", checkAuth);
        return () => window.removeEventListener("storage", checkAuth);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        setIsAuthenticated(false);
        setUsuario(null);
        navigate("/");
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    Mayab
                    <span>Tu plataforma confiable para compra de boletos</span>
                </Link>
                <ul className="navbar-menu">
                    <li>
                        <Link to="/">Inicio</Link>
                    </li>
                    <li>
                        <Link to="/rutas">Rutas</Link>
                    </li>
                    <li>
                        <Link to="/sobre-nosotros">Sobre Nosotros</Link>
                    </li>
                    <li>
                        <Link to="/comprar-boletos">Comprar Boletos</Link>
                    </li>
                    {isAuthenticated ? (
                        <>
                            <li>
                                <span className="text-white small">
                                    {usuario?.nombre}
                                </span>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="btn btn-outline-light btn-sm fw-semibold"
                                >
                                    Cerrar sesión
                                </button>
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link
                                to="/login"
                                className="btn btn-outline-light btn-sm fw-semibold"
                            >
                                Iniciar sesión
                            </Link>
                        </li>
                    )}
                </ul>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Buscar rutas..."
                        id="searchInput"
                    ></input>
                    <button onclick="searchRoutes()">Buscar</button>
                </div>
            </div>
        </nav>
    );
}
