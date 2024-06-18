// conseguimos exportar a catgegoria para o jsx no outro arquivo
export const CATEGORIES = [
    'Smartphones',
    'Livros',
    'Informática',
    'Brinquedos'
]
export default class StockItem{
    constructor({name, description, quantity, price, category}){
        // por não ta trabando com banco de dados, cria-se um número aleatorio de id(armazena)
        this.id = Math.floor(Math.random() * 10000000000)
        this.name = name;
        this.description = description;
        // lembrete: '+' é usado para passar de string para number
        this.quantity = +quantity; 
        this.price = +price;
        this.category = category;
        // criando um comportamento da classe createdAt, para que sempre seja enviado um novo item de forma automática
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.#validate()
    }
    #validate() {
        // testa se o tipo de nome é valido como string
        const validName = typeof this.name === "string"
        // testa se o tipo de descrição é valido como string
        const validDescription = typeof this.description === 'string'
        // testa se o tipo de quantidade é valido como number e o number seja inteiro
        const validQuantity = typeof this.quantity === 'number' && Number.isInteger(this.quantity)
        // testa se o tipo de preço é valido como number
        const validPrice = typeof this.price === 'number'
        // testa se o tipo de categorias é valido como categoria
        const validCategory = CATEGORIES.includes(this.category)
        // faz a verificação se é valido, se não causa erro
        if(!(
            validName &&
            validDescription &&
            validQuantity &&
            validPrice &&
            validCategory
        )) {
            throw new Error('Item inválido!')
    
        }
        
    }
}