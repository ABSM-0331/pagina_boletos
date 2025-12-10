import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Ruta from "./components/Rutas/Ruta";
import ComprarBoletos from "./ComprarBoletos";
import Team from "./components/Team";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import "bootstrap/dist/css/bootstrap.min.css";
// IMPORTANT: importa el bundle JS que incluye Popper + plugins (activa los controles)
import "bootstrap/dist/js/bootstrap.bundle.min.js";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Home />} />
                    <Route path="rutas" element={<Ruta />} />
                    <Route path="sobre-nosotros" element={<Team />} />
                    <Route path="login" element={<Login />} />
                    <Route path="registro" element={<Register />} />
                    <Route
                        path="comprar-boletos"
                        element={
                            <ProtectedRoute>
                                <ComprarBoletos />
                            </ProtectedRoute>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
