import React, { useRef } from "react";
import CompCardMaps from "./CompCardMaps";
import "./styles_rutas.css";

export default function CompRutas({ title, routes, onSelectRoute, idPrefix }) {
  const carouselRef = useRef(null);

  // Lógica simple para desplazar el carrusel
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 1 ? 220 : -220; // 200px (ancho de tarjeta) + 20px (gap)
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="rutas-section">
      <div className="container-fluid">
        {/* Título (Rectángulo Verde) */}
        <h3 className="rutas-title">{title}</h3>
        <div className="carousel-wrapper">
          {/* Botón Izquierda (Círculo Naranja) */}
          <button
            className="carousel-btn carousel-btn-left"
            onClick={() => scrollCarousel(-1)}
          >
            &#10094;
          </button>
          <div
            className="carousel-container"
            id={`carousel-${idPrefix}`}
            ref={carouselRef}
          >
            {routes.map((route) => (
              // Renderiza las cartas de ruta
              <CompCardMaps
                key={route.id}
                route={route}
                onViewHorarios={onSelectRoute}
              />
            ))}
          </div>
          {/* Botón Derecha */}
          <button
            className="carousel-btn carousel-btn-right"
            onClick={() => scrollCarousel(1)}
          >
            &#10095;
          </button>
        </div>
      </div>
    </section>
  );
}
