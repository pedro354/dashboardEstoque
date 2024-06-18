import { Link, Outlet, useLocation } from "react-router-dom";

export default function ItemsLayout(){
// Outlet vai combinar esse layout para as rotas filhas
// useLocation: Essa função retorna o objeto de localização que representa a localização atual da URL. Isso é útil quando você precisa acessar informações sobre a rota atual dentro de um componente React, como o pathname (o caminho da URL), search (a parte da consulta da URL) e hash (a parte hash da URL). 
    const { pathname } = useLocation()
    return (
        <main>
            <h1>Stock Items</h1>
            <div className="tabs">
                <Link 
                to="/items" 
                className={`tab ${pathname === "/items" ? "active" : ""}`}
                >Todos os Items
                </Link>
                <Link to="/items/new" 
                className={`tab ${pathname === "/items/new" ? "active" : ""}`}
                
                >Novo Item</Link>
            </div>
            <Outlet/>
        </main>
    )
}