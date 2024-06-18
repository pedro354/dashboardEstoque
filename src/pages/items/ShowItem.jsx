import { Link, useParams } from "react-router-dom"
import useStock from "../../hooks/useStock"
import DeleteButton from "../../components/DeleteButton"
// com useStock pega a função getItem para poder obter o estado do item, com o parametro da url que é (id:update) usando o useParams,que tem o nome id, seguindo o que foi descrito no arquivo routers
// passando a variavel item e pegar o id
export default function ShowItem() {
    const {getItem} = useStock()
    const {id} = useParams()
    const item = getItem(id)
    return (
        <div className="item">
            <h2>{item.name }</h2>
            <Link to={`/item/${item.id}/update`} className="button is-small">Atualizar</Link>
            <DeleteButton itemId={item.id} itemName={item.name}/>
            <div className="row">
                <span>Categoria: {item.category}</span>
                <span>Quantidade em estoque: {item.quantity}</span>
                <span>Preço: R${item.price}</span>
            </div>
            <p>{item.description}</p>
            <div className="row">
                <p>Cadastrado em: {item.createdAt.toDateString()}</p>
                <p>Atualizado em: {item.updatedAt.toDateString()}</p>
            </div>

        </div>
    )

}