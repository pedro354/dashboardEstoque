import PropTypes from "prop-types"
import { useRef, useState } from "react"
import StockItem, { CATEGORIES } from "../entities/StockItem"
import useStock from "../hooks/useStock"

ItemForm.propTypes = {
    itemToUpdate: PropTypes.object
}

export default function ItemForm({ itemToUpdate }) {
    // um objeto destruturado para resetar o item quando o usuario preencher o formulário ao salvar
    // Esse formulário serve tanto para criar um item quanto atualizar um item existente
    // itemToUpdate serve para ser atulizado
    const defaultItem = {
        name: "",
        description: "",
        quantity: 0,
        price: 0,
        category: ""
    }
    // se o itemToUpdate existir, se ele não existir retorna defaultItem. Conseguimos identificar essa prop esse valor inciial do formulário vai ser a prop que foi repassado, se não será o padrão, criando um novo item
    const [item, setItem] = useState(itemToUpdate ? itemToUpdate : defaultItem)
    const {addItem, updateItem} = useStock()
    const inputRef = useRef(null)
    // inputRef captura a referencia direto no elemento. Criando um DOM 
    // chamando o arquivo useStock, obtendo a função addItem
    // para atualizar varios itens de um estado. Com essa função abaixo...
    // esse 'ev' saberemos qual foi o input passado para o evento. Então setamos o item atual 'setItem(currentState =>)' ele vai retornar um novo objeto, tendo todas as propriedades do objeto antigo, destruturando todas as propriedades '...currentState'(o nome, descrição, preço...) e acrescentar uma atualização.
    // pegamos um evento.target.name ou seja o nome do input e dizer que nessa chave que nesse valor seja ev.target.value e será atualizado cada input: '[ev.target.name]: ev.target.value'
    const handleChange = (ev) => {
        setItem(currentState => {
            return {
                ...currentState,
                [ev.target.name]: ev.target.value
            }
        })
    }

    // Criar um novo item no estoque
    const handleSubmit = (ev) => {
        ev.preventDefault()
        // criando um try catch, criar uma classe para construir os items, em uma pasta separada chamada entities
        try {
            if(itemToUpdate){
                updateItem(itemToUpdate.id, item)
                alert('item foi atualizado com sucesso!')
            } else {
                const validItem = new StockItem(item)
                addItem(validItem)
                setItem(defaultItem)
                alert('Item cadastrado com sucesso!')
                // quando chamar a função validItem deve salvar esse item no formato que queremos
            }
        } catch (err) {
            console.log(err.message);
        } finally {
            inputRef.current.focus()
            // a manipulação conseguirá trazer o foco de volta ao elemento depois de salvar o item
        }
    }
    return (
        <form onSubmit={ handleSubmit }>
            <div className="row">
                <div>
                    <label htmlFor="name">Nome</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        ref={ inputRef }
                        // criando uma ref
                        value={ item.name }
                        onChange={ handleChange }
                    />
                </div>
                <div>
                    <label htmlFor="quantity">Quantidade</label>
                    <input
                        type="number"
                        name="quantity"
                        id="quantity"
                        required
                        min={ 0 }
                        step={ 1 }
                        value={ item.quantity }
                        onChange={ handleChange }
                    />
                </div>
                <div>
                    <label htmlFor="price">Preço</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        required
                        min={ 0.00 }
                        step={ 0.01 }
                        value={ item.price }
                        onChange={ handleChange }
                    />
                </div>
                <div>
                    <label htmlFor="category">Categoria</label>
                    <select
                        name="category"
                        id="category"
                        required
                        value={ item.category }
                        onChange={ handleChange }
                    >
                        <option disabled value="">Selecione uma categoria...</option>
                        { CATEGORIES.map((category) => (
                            <option
                                key={ category }
                                value={ category }
                                defaultChecked={ item.category === category }>
                                { category }
                            </option>
                        )) }
                    </select>
                </div>
            </div>
            <div className="form-control">
                <label htmlFor="description">Descrição</label>
                <textarea
                    name="description"
                    id="description"
                    required
                    rows={ 6 }
                    value={ item.description }
                    onChange={ handleChange }
                ></textarea>
            </div>
            <button className="button is-primary is-large">Salvar</button>
        </form>
    )
}