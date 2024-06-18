
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function RootLayout() {
    // Outlet vai combinar esse layout para as rotas filhas
    return (
        <>
            <Header />
                <Outlet />
            <footer>
                Feito com React Router DOM
            </footer>
        </>
    )
}