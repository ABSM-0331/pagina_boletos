import CarouselBootstrap from "./Carousel";

export default function Home() {
    return (
        <>
            <section className="hero" id="inicio">
                <h1>Encuentra tu ruta aquí</h1>
                <p>Viaja cómodo y seguro a tu destino favorito</p>
            </section>

            <section className="carousel-section" id="rutas">
                <h2>Nuestras Ciudades</h2>
                <CarouselBootstrap />
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
