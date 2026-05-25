
export function listarQuantidadeDePedidosPorNome(nomeItem, listaProdutos) {
    if (!nomeItem || typeof nomeItem !== "string") {
        throw new Error("Item deve ser uma string não vazia");
    }
    if (!Array.isArray(listaProdutos)) {
        throw new Error("Lista de produtos deve ser um array");
    } 
        const quantidade = listaProdutos.filter(item => {
            if (item.nome && typeof item.nome === "string") {
                return item.nome.toLowerCase() === nomeItem.toLowerCase();
            }
            return false;
        }).length;
    return quantidade;
}

export function calcularValorTotalPedidos(listaProdutos) {
    if (!Array.isArray(listaProdutos)) {
        throw new Error("Lista de produtos deve ser um array");
    }   
    const valorTotal = listaProdutos.reduce((total, produto) => {
        if (produto.preco === undefined || typeof produto.preco !== "number" || produto.preco < 0) {
            throw new Error("Cada produto deve ter um preço válido");
        }
        return total + produto.preco;
    }, 0);
    return valorTotal;
}