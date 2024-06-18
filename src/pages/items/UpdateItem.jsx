import { useParams } from "react-router-dom";
import ItemForm from "../../components/ItemForm";
import useStock from "../../hooks/useStock";

export default function UpdateItem(){
    // pegar os item e id do stock e params para atualizar os produtos
    const {getItem} = useStock()
    const {id} = useParams()
    const item = getItem(id)

    return(
        <>
        <h2>Atualizar item</h2>
        <ItemForm itemToUpdate={item} />
        </>
    )
}