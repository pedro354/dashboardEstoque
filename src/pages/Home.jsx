import { Link } from 'react-router-dom'
import useStock from '../hooks/useStock'

export default function Home() {
    const { items } = useStock()
    const diversity = items.length
    const inventoryTotal = items.reduce((sum, item) => +sum + +item.quantity, 0)
    // variavel para a criação de data nos ultimos dez dias, datando um limite de data conforme a baixo
    const today = new Date()
    const limitDate = new Date()
    limitDate.setDate(limitDate.getDate() - 10)
    // criando uma variavel para items recentes, filtrando o array total apenas uma parte do calculo baseado no createdAt sendo maior ou igual a data criação do que a de dez dias atrás, e(&&) item.createdAT menor ou igual a hoje
    const recentItems = items.filter((item) => item.createdAt >= limitDate && item.createdAt <= today)
    const recentTotal = recentItems.length
    // criando os itens q estao acabando
    const lowQuantityItems = items.filter((item) => item.quantity < 10)
    const lowQuantityTotal = lowQuantityItems.length
    return (
        <main>
            <h1>Dashboard</h1>
            <div className="row">
                <div className="dashboardCard">
                    Diversidade de Itens
                    <span>{ diversity }</span>
                </div>
                <div className="dashboardCard">
                    Inventário Total
                    <span>{ inventoryTotal }</span>
                </div>
                <div className="dashboardCard">
                    Itens recentes
                    <span>{ recentTotal }</span>
                </div>
                <div className="dashboardCard">
                    Itens Acabando
                    <span>{ lowQuantityTotal }</span>
                </div>
            </div>
            <div className="row">
                <div className="recent">
                    <table>
                        <thead>
                            <tr><th>Itens Recentes</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentItems.map((item) => (
                                <tr key={item.id}>
                                <td>{item.name}</td>
                                    <td><Link to={`/items/${item.id}`} className='button is-small'>Ver</Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="low">
                    <table>
                        <thead>
                            <tr>
                                <th>Itens Acabando</th>
                                <th>Qtd.</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lowQuantityItems.map((item) =>(
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td><Link to={`/items/${item.id}`} className='button is-small'>Ver</Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}