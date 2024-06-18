import stock from "../database.json";

export default function loadStock({ params }) {
    const stocks = stock.find(p => p.id === +params.stockId);
    // + faz a conversão rápida de string para number

    if (!stocks) {
        throw new Response("404 not found", { status: 404 })
    }
    return stocks
}