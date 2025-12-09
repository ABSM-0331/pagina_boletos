import { useState, useMemo } from "react";
import CompRutas from "./CompRutas";
import CompHorarios from "./CompHorarios";
import "./styles_rutas.css";

const MOCK_ROUTES = [
    {
        id: 1,
        origen: "Mérida",
        destino: "Peto",
        distancia: "2.3 km",
        tiempo: "2 horas",
        mapa: "/public/img_maps/merida-peto.png",
        horarios: ["6:00 AM", "9:30 AM", "1:00 PM", "4:30 PM"],
    },
];

const MOCK_ROUTES_CANCUN = [
    {
        id: 7,
        origen: "Cancun",
        destino: "Peto",
        distancia: "100 km",
        tiempo: "6 horas",
        mapa: "/public/img_maps/cancun-peto.png",
        horarios: ["6:30 AM", "10:00 AM", "2:00 PM"],
    },
];

const MOCK_ROUTES_TEKAX = [
    {
        id: 37,
        origen: "Tekax",
        destino: "Valladolid",
        distancia: "100 km",
        tiempo: "6 min",
        mapa: "/public/img_maps/tekax-valla.png",
        horarios: ["6:30 AM", "10:00 AM", "2:00 PM"],
    },
];
const allRoutes = [...MOCK_ROUTES, ...MOCK_ROUTES_TEKAX, ...MOCK_ROUTES_CANCUN];

export default function Ruta() {
    const [searchTerm, setSearchTerm] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRoute, setSelectedRoute] = useState(null);

    const filteredRoutes = useMemo(() => {
        if (searchTerm.length === 0) {
            return allRoutes;
        }

        const lowerCaseSearch = searchTerm.toLowerCase();
        return allRoutes.filter(
            (route) =>
                route.origen.toLowerCase().includes(lowerCaseSearch) ||
                route.destino.toLowerCase().includes(lowerCaseSearch)
        );
    }, [searchTerm]); // La dependencia es 'searchTerm'

    // 2. Separar las rutas filtradas para los carruseles
    const meridaRoutes = filteredRoutes.filter((r) => r.origen === "Mérida");
    const cacunRoutes = filteredRoutes.filter((r) => r.origen === "Cancun");
    const tekaxRoutes = filteredRoutes.filter((r) => r.origen === "Tekax");

    const openHorariosModal = (route) => {
        setSelectedRoute(route);
        setModalOpen(true);
    };

    const closeHorariosModal = () => {
        setModalOpen(false);
        setSelectedRoute(null);
    };

    return (
        <main>
            {/* Sección de Búsqueda */}
            <section className="search-section">
                <div className="container">
                    <h2 className="search-title">Encuentra tu ruta aquí</h2>
                    <div className="search-box">
                        <input
                            type="text"
                            className="form-control search-input"
                            placeholder="Buscar lugar de ruta"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            {/* Componentes de Rutas usando las rutas calculadas */}
            {meridaRoutes.length > 0 && (
                <CompRutas
                    title="Rutas de Mérida"
                    routes={meridaRoutes}
                    onSelectRoute={openHorariosModal}
                    idPrefix="merida"
                />
            )}

            {cacunRoutes.length > 0 && (
                <CompRutas
                    title="Rutas de Cancun"
                    routes={cacunRoutes}
                    onSelectRoute={openHorariosModal}
                    idPrefix="cancun"
                />
            )}

            {tekaxRoutes.length > 0 && (
                <CompRutas
                    title="Rutas de Tekax"
                    routes={tekaxRoutes}
                    onSelectRoute={openHorariosModal}
                    idPrefix="tekax"
                />
            )}

            {/* Modal de Horarios */}
            {selectedRoute && (
                <CompHorarios
                    isOpen={modalOpen}
                    route={selectedRoute}
                    onClose={closeHorariosModal}
                    horarios={selectedRoute.horarios}
                />
            )}
        </main>
    );
}
