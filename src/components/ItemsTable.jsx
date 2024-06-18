import { Link } from "react-router-dom";
import useStock from "../hooks/useStock";
import DeleteButton from "./DeleteButton";

export default function ItemsTable(){

    const { items } = useStock()

    return(
        <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Stock</th>
                <th>Category</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {items.map((item) => (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.quantity} unid.</td>
                    <td>{item.category}</td>
                    <td>
                    <Link to={`/items/${item.id}`} className="button is-primary is-small">Ver
                    </Link>
                    <Link to={`/items/${item.id}/update`} className="button is-secondary is-small">Atualizar</Link>
                    <DeleteButton 
                    itemId={item.id}
                    itemName={item.name} />
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    )
}

// Este componente ItemsTable é uma tabela que exibe os itens do estoque. Ele utiliza o hook useStock para obter os itens do contexto de estoque.

//     Imports: O componente importa o componente Link do React Router DOM e o hook useStock de um arquivo de ganchos personalizado.

//     Componente ItemsTable: Este componente é uma função que renderiza uma tabela HTML.

//         Uso do Hook useStock: Ele usa o hook useStock para obter os itens do estoque.

//         Renderização da Tabela: Renderiza uma tabela HTML com cabeçalhos para ID, Nome, Estoque, Categoria e Ações.

//         Mapeamento dos Itens: Itera sobre os itens do estoque e renderiza uma linha na tabela para cada item. Cada linha contém as informações do item, como ID, nome, quantidade e categoria.

//         Links de Ação: Dentro da última célula de cada linha, há dois links de ação. O primeiro link redireciona para a página de detalhes do item, usando o ID do item na URL. O segundo link redireciona para a página de atualização do item, também usando o ID do item na URL.

//         Classes CSS dos Links: Os links são estilizados com classes CSS do framework Bulma (button, is-primary, is-small) para fornecer uma aparência de botão. No entanto, os links estão vazios, não têm texto visível dentro deles. Eles devem ser atualizados com texto ou ícones para indicar a ação que realizam.