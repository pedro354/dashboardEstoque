import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <Link to="/" className="logo">REACT STOCK</Link>
            <nav>
                <div id="nav">
                    <Link to="/">Inicio</Link>
                    <Link to="/items">Items</Link>
                </div>
            </nav>
        </header>
    )
}