export default function Home() {
    return (
        <>
            <section className="hero" id="inicio">
                <h1>Encuentra tu ruta aquí</h1>
                <p>Viaja cómodo y seguro a tu destino favorito</p>
            </section>

            <section className="carousel-section" id="rutas">
                <h2>Nuestras Ciudades</h2>
                <div className="carousel-container">
                    <div className="carousel" id="carousel">
                        <div className="carousel-item">
                            <img
                                src="https://g-hhzdd0aq46n.vusercontent.net/placeholder.svg?height=400&width=1200"
                                alt="Mérida"
                            ></img>
                            <div className="carousel-caption">
                                <h3>Mérida</h3>
                                <p>La ciudad blanca, capital de Yucatán</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img
                                src="https://g-hhzdd0aq46n.vusercontent.net/placeholder.svg?height=400&width=1200"
                                alt="Progreso"
                            ></img>
                            <div className="carousel-caption">
                                <h3>Progreso</h3>
                                <p>Puerto y playa del Golfo de México</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img
                                src="https://g-hhzdd0aq46n.vusercontent.net/placeholder.svg?height=400&width=1200"
                                alt="Ticul"
                            ></img>
                            <div className="carousel-caption">
                                <h3>Ticul</h3>
                                <p>Cuna de la alfarería yucateca</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img
                                src="https://g-hhzdd0aq46n.vusercontent.net/placeholder.svg?height=400&width=1200"
                                alt="Oxkutzcab"
                            ></img>
                            <div className="carousel-caption">
                                <h3>Oxkutzcab</h3>
                                <p>La huerta del estado</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img
                                src="https://g-hhzdd0aq46n.vusercontent.net/placeholder.svg?height=400&width=1200"
                                alt="Muna"
                            ></img>
                            <div className="carousel-caption">
                                <h3>Muna</h3>
                                <p>Tradición y cultura maya</p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-controls">
                        <button className="carousel-btn" onclick="prevSlide()">
                            ‹
                        </button>
                        <button className="carousel-btn" onClick="nextSlide()">
                            ›
                        </button>
                    </div>
                </div>
                <div className="carousel-indicators" id="indicators"></div>
            </section>

            <section className="instructions-section" id="comprar">
                <h2>¿Cómo comprar tus boletos?</h2>
                <div className="instructions-grid">
                    <div className="instruction-card">
                        <div className="instruction-number">1</div>
                        <h3>Selecciona tu ruta</h3>
                        <p>
                            Elige tu ciudad de origen y destino desde nuestro
                            buscador de rutas disponibles.
                        </p>
                    </div>
                    <div className="instruction-card">
                        <div className="instruction-number">2</div>
                        <h3>Elige fecha y horario</h3>
                        <p>
                            Selecciona la fecha de tu viaje y el horario que
                            mejor se adapte a tus necesidades.
                        </p>
                    </div>
                    <div className="instruction-card">
                        <div className="instruction-number">3</div>
                        <h3>Ingresa tus datos</h3>
                        <p>
                            Completa el formulario con tu información personal y
                            de contacto.
                        </p>
                    </div>
                    <div className="instruction-card">
                        <div className="instruction-number">4</div>
                        <h3>Realiza el pago</h3>
                        <p>
                            Procede al pago de forma segura con tarjeta de
                            crédito, débito o transferencia.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
