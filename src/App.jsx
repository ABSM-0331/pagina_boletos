import Ruta from "./components/Rutas/Ruta.jsx";
import { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
// import Home from "./components/Home.jsx";
// import Team from "./components/Team.jsx";

function App() {
    return (
        //     <Routes>
        //         {/* <Route path="/" element={<Home />} /> */}
        //         <Route path="/Rutas" element={<Ruta />} />
        //         {/* <Route path="/Team" element={<Team />} /> */}
        //     </Routes>
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
}

export default App;
