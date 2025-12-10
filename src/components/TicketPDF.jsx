import React from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import QRCode from "qrcode";

const TicketPDF = ({ datos, onClose }) => {
    const generarPDF = async () => {
        const ticket = document.getElementById("ticket-pdf");

        // Generar QR con toda la info
        const qrData = `
BOLETO MAYAB
Origen: ${datos.origen}
Destino: ${datos.destino}
Fecha: ${datos.fecha}
Horario: ${datos.horario}
Pasajeros: ${datos.pasajeros}
Clase: ${datos.clase}
Adicionales: ${datos.adicionales.join(", ")}
Total: ${datos.total}
ID Venta: ${datos.id_venta}
    `.trim();

        const qrCanvas = await QRCode.toCanvas(qrData);
        const qrDataUrl = qrCanvas.toDataURL("image/png");

        // Crear PDF
        const pdf = new jsPDF("p", "mm", "a4");
        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();

        // Fondo y título
        pdf.setFillColor(88, 129, 0);
        pdf.rect(0, 0, width, 40, "F");
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(24);
        pdf.setFont("helvetica", "bold");
        pdf.text("MAYAB - BOLETO DE VIAJE", width / 2, 25, { align: "center" });

        // Convertir ticket a imagen
        const canvas = await html2canvas(ticket, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        // Agregar al PDF
        pdf.addImage(imgData, "PNG", 10, 50, 190, 0);
        pdf.addImage(qrDataUrl, "PNG", 150, 200, 40, 40);

        // Pie de página
        pdf.setTextColor(100);
        pdf.setFontSize(10);
        pdf.text("Gracias por viajar con Mayab", width / 2, height - 15, {
            align: "center",
        });

        // Descargar
        pdf.save(`Ticket_Venta_${datos.id_venta}.pdf`);
        onClose();
    };

    React.useEffect(() => {
        generarPDF();
    }, []);

    const adicionales = [];
    if (datos.seguro) adicionales.push("Seguro de Viaje (+$100)");
    if (datos.equipaje) adicionales.push("Equipaje Extra (+$50)");

    return (
        <div
            style={{
                position: "fixed",
                top: -9999,
                left: -9999,
                background: "white",
            }}
        >
            <div
                id="ticket-pdf"
                style={{
                    width: "800px",
                    padding: "40px",
                    fontFamily: "Arial, sans-serif",
                    background:
                        "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                    border: "3px solid #588100",
                    borderRadius: "15px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                }}
            >
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                    <h1 style={{ color: "#588100", margin: 0 }}>MAYAB</h1>
                    <p style={{ color: "#666", margin: "5px 0" }}>
                        Tu plataforma confiable de boletos
                    </p>
                    <h2 style={{ color: "#2c3e50", margin: "10px 0" }}>
                        BOLETO DE VIAJE
                    </h2>
                </div>

                <div
                    style={{
                        background: "white",
                        padding: "25px",
                        borderRadius: "10px",
                        boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                    }}
                >
                    <table
                        style={{
                            width: "100%",
                            fontSize: "18px",
                            borderCollapse: "collapse",
                        }}
                    >
                        <tbody>
                            <tr>
                                <td
                                    style={{
                                        padding: "8px 0",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Origen:
                                </td>
                                <td>{datos.origen}</td>
                            </tr>
                            <tr>
                                <td
                                    style={{
                                        padding: "8px 0",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Destino:
                                </td>
                                <td>{datos.destino}</td>
                            </tr>
                            <tr>
                                <td
                                    style={{
                                        padding: "8px 0",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Fecha:
                                </td>
                                <td>{datos.fecha}</td>
                            </tr>
                            <tr>
                                <td
                                    style={{
                                        padding: "8px 0",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Horario:
                                </td>
                                <td>{datos.horario}</td>
                            </tr>
                            <tr>
                                <td
                                    style={{
                                        padding: "8px 0",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Pasajeros:
                                </td>
                                <td>{datos.pasajeros}</td>
                            </tr>
                            <tr>
                                <td
                                    style={{
                                        padding: "8px 0",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Clase:
                                </td>
                                <td>{datos.clase}</td>
                            </tr>
                            {adicionales.length > 0 && (
                                <tr>
                                    <td
                                        style={{
                                            padding: "8px 0",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Adicionales:
                                    </td>
                                    <td>{adicionales.join(" | ")}</td>
                                </tr>
                            )}
                            <tr>
                                <td
                                    style={{
                                        padding: "15px 0",
                                        fontWeight: "bold",
                                        fontSize: "24px",
                                        color: "#588100",
                                    }}
                                >
                                    TOTAL A PAGAR:
                                </td>
                                <td
                                    style={{
                                        fontSize: "28px",
                                        color: "#588100",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {datos.total}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div
                        style={{
                            marginTop: "30px",
                            textAlign: "center",
                            color: "#666",
                            fontSize: "14px",
                        }}
                    >
                        <p>
                            <strong>ID Venta:</strong> {datos.id_venta}
                        </p>
                        <p>¡Gracias por tu preferencia!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketPDF;
