import "./styles.css";
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <a href="#" className="navbar-brand">
                    Mayab
                    <span>Tu plataforma confiable para compra de boletos</span>
                </a>
                <ul className="navbar-menu">
                    <li>
                        <a href="index.html">Inicio</a>
                    </li>
                    <li>
                        <a href="rutas.html">Rutas</a>
                    </li>
                    <li>
                        <a href="sobre-nosotros.html">Sobre Nosotros</a>
                    </li>
                    <li>
                        <a href="comprar-boletos.html">Comprar Boletos</a>
                    </li>
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
