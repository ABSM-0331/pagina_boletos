import React from "react";
import "./styles.css";

const teamMembers = [
    {
        name: "Abran Sosa",
        role: "Backend",
        photo: "src/assets/abran.png",
        contribution:
            "Diseñó y construyó la lógica del servidor para que las rutas y compras funcionen sin fallas.",
    },
    {
        name: "Marcos Pacab",
        role: "Administración de Base de Datos",
        photo: "src/assets/marcos.png",
        contribution:
            "Modeló y administró la base de datos asegurando datos consistentes y respaldos confiables.",
    },
    {
        name: "Jesús Yam",
        role: "Frontend",
        photo: "src/assets/arturo.png",
        contribution:
            "Diseñó la interfaz de usuario y optimizó la experiencia de compra para que sea clara y ágil.",
    },
];

export default function Team() {
    return (
        <section className="team-section" id="sobre-nosotros">
            <div className="team-header">
                <p className="eyebrow">Sobre nosotros</p>
                <h1>Personas detrás del proyecto</h1>
                <p>
                    Un equipo pequeño pero dedicado que combinó experiencia
                    técnica y visión de producto para llevarte las rutas que
                    necesitas.
                </p>
            </div>

            <div className="team-grid">
                {teamMembers.map((member) => (
                    <article className="team-card" key={member.name}>
                        <div className="team-photo-frame">
                            <img src={member.photo} alt={member.name} />
                            <span className="team-role">{member.role}</span>
                        </div>
                        <div className="team-info">
                            <h3>{member.name}</h3>
                            <p>{member.contribution}</p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
