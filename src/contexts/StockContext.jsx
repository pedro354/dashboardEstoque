// aqui ficará toda lógica de adição e exlcusão de item, atualização de data e criação.

import { createContext, useState } from "react"
import PropTypes from "prop-types"

export const StockContext = createContext({})

StockContextProvider.propTypes = {
    children: PropTypes.node
}
// {name, description, quantity, createdAt}
export function StockContextProvider({ children }) {
    const [items, setItem] = useState(() => {
        const storedItems = localStorage.getItem('react-stock')
        if (!storedItems) return []
        const items = JSON.parse(storedItems)
        items.forEach((item) => {
            item.createdAt = new Date(item.createdAt)
            item.updatedAt = new Date(item.updatedAt)
        })
        return items
    })

    const addItem = (item) => {
        setItem(currentState => {
            const updatedItems = [item, ...currentState]
            localStorage.setItem('react-stock', JSON.stringify(updatedItems))
            return updatedItems
        })
    }

    // A função getItem irá devolver o item especifico
    const getItem = (itemId) =>{
        return items.find(item => item.id === +itemId)
    }
    // a função atualiza os items, pegando pelo parametro id e criando novos atributos
    const updateItem = (itemId, newAttributes) => {
        // com o currentState para encontrar o item que queremos editar
        setItem(currentState => {
            // encontrar pelo indice do array e atualizando os items daquele objeto
            const itemIndex = currentState.findIndex(item => item.id === +itemId)
            // criar um novo array que é igual ao update antigo
            const updatedItems = [...currentState]
            // a partir desse novo array o metodo assing e passa o updateItem na posição[intemIdex] e pegar esse objetos e atribuir os novos atributos(modificando o antigo) e passando uma propridade nova criando uma nova data
            Object.assign(updatedItems[itemIndex], newAttributes, {updatedAt: new Date()})
            // salvando no localStorage
            localStorage.setItem('react-stock', JSON.stringify(updatedItems))
            return updatedItems
        })
    }

    //  passando o contexto do parametro do item que será excluido
    const removeItem = (itemId) => {
        // chamando o setItem, pegando o current state, criando um updateItems, criando um novo array modificado e retornar o valor modificado. Para excluir o item usando o filter  para filtrar para fora do array. para cada item fazer uma verificação, se o id é diferente que foi passado no parametro. 
        setItem(currentState => {
            const updatedItems = currentState.filter(item => item.id !== itemId)
            localStorage.setItem('react-stock', JSON.stringify(updatedItems))
            return updatedItems
        })
    }

    const stock = {
        items,
        getItem,
        addItem,
        updateItem,
        removeItem
    }
    return (
        <StockContext.Provider value={ stock }>
            { children }
        </StockContext.Provider>
    )
}

// Imports: O código importa os módulos necessários do React (createContext, useState) e PropTypes.

// Criação do Contexto: Ele cria um contexto chamado StockContext usando createContext({}). O valor inicial é um objeto vazio, o que significa que qualquer componente que consumir esse contexto sem um provedor correspondente receberá um objeto vazio como seu valor.

// PropTypes: Ele especifica PropTypes para o componente StockContextProvider. Espera uma prop children, que deve ser um nó React.

// Componente StockContextProvider: Este componente é responsável por fornecer os dados relacionados ao estoque para seus descendentes.

//     Estado: Ele inicializa uma variável de estado items usando useState(). O estado inicial é obtido verificando se há itens armazenados no armazenamento local sob a chave 'react-stock'. Se houver, eles são analisados do formato JSON e as strings createdAt e updatedAt são convertidas em objetos Date. Caso contrário, o estado é inicializado como um array vazio.

//     Função addedItems: Esta função é usada para adicionar um item ao estoque. Ela atualiza o estado adicionando o novo item no início do array items. Também atualiza o armazenamento local com os itens atualizados.

//     Valor do Contexto: Ele define um objeto stock contendo items (os itens atuais do estoque) e addedItems (a função para adicionar itens). Este objeto é passado como valor para o StockContext.Provider.

//     Renderização: Ele renderiza o StockContext.Provider, passando o objeto stock como valor, e renderizando seus filhos.