import React from "react";

const CarouselBootstrap = () => {
    const slides = [
        {
            src: "https://www.royalresorts.com/blog/wp-content/uploads/2024/09/merida-catedral.jpg",
            alt: "Mérida",
            title: "Mérida",
            caption: "La ciudad blanca, capital de Yucatán",
        },
        {
            src: "https://yucatantoday.com/hubfs/Imported_Blog_Media/Tekax-letras-e-iglesia-by-Yucatan-Today-sin-logo.jpg",
            alt: "tekax",
            title: "Tekax",
            caption: "Puerta al sur de Yucatán",
        },
        {
            src: "https://yucatantoday.com/hubfs/Imported_Blog_Media/Peto-Letras-y-Catedral-de-Peto-by-Oscar-Gongora-DESTACADA-1.jpg",
            alt: "peto",
            title: "Peto",
            caption: "Encanto colonial en el corazón de Yucatán",
        },
        {
            src: "https://randomtrip.es/wp-content/uploads/2024/07/letras-cancun-playa-chacmool.jpg",
            alt: "cancun",
            title: "Cancún",
            caption: "Destino turístico de clase mundial",
        },
        {
            src: "https://topyucatan.com/uploads/notas/que-hacer-un-dia-en-valladolid-yucatan.jpg",
            alt: "valladolid",
            title: "Valladolid",
            caption: "Tradición y cultura maya",
        },
    ];

    return (
        <div className="carousel-wrapper">
            <div
                id="carouselExampleIndicators"
                className="carousel slide carousel-custom"
                data-bs-ride="carousel"
            >
                <div className="carousel-indicators">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to={idx}
                            className={idx === 0 ? "active" : ""}
                            aria-current={idx === 0 ? "true" : undefined}
                            aria-label={`Slide ${idx + 1}`}
                        ></button>
                    ))}
                </div>
                <div className="carousel-inner">
                    {slides.map((slide, idx) => (
                        <div
                            key={idx}
                            className={`carousel-item ${
                                idx === 0 ? "active" : ""
                            }`}
                        >
                            <img
                                src={slide.src}
                                className="d-block w-100"
                                alt={slide.alt}
                            />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>{slide.title}</h5>
                                <p>{slide.caption}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev"
                >
                    <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Anterior</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next"
                >
                    <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Siguiente</span>
                </button>
            </div>
        </div>
    );
};

export default CarouselBootstrap;
