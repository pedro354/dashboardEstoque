import PropTypes from 'prop-types'
import useStock from '../hooks/useStock'
import { useNavigate } from 'react-router-dom'
// buscando excluir o nome do item, chamamos o propTypes a lógica abaixo
DeleteButton.propTypes = {
    itemId: PropTypes.number,
    itemName: PropTypes.string
}

export default function DeleteButton({ itemId, itemName }) {
    // usar o stock, devolvendo um objeto deleteItem
    const { removeItem } = useStock()
    // criando uma confirmação no botão
    const navigation = useNavigate()
    const handleDelete = () => {
        if (confirm(`Tem certeza que deseja excluir o item ${itemName} ?`)) {
            removeItem(itemId)
            navigation('/items')
        }
    }



    return (
        <button
            className="button is-danger is-small" onClick={ handleDelete }
        >Excluir</button>
    )
}