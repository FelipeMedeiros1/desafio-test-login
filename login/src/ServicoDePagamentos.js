export class ServicoDePagamentos {

    #pagamentos;
    #agora;

    constructor({ pagamentosIniciais = [], agora = () => new Date() } = {}) {
        this.#pagamentos = [...pagamentosIniciais];
        this.#agora = agora;
    }

    realizarPagamento(codigoBarras, nomeEmpresa, valor) {
        if (!codigoBarras || !nomeEmpresa || valor === undefined) {
            throw new Error("Todos os campos são obrigatórios");
        }

        if (typeof valor !== "number" || Number.isNaN(valor) || valor <= 0) {
            throw new Error("Valor deve ser um número positivo");
        }

        const novoPagamento = {
            codigoBarras,
            nomeEmpresa,
            valor,
            categoria: valor > 100.00 ? "Cara" : "Padrao",
            data: this.#agora()
        };
        this.#pagamentos.push(novoPagamento);
        return { ...novoPagamento };
    }

    consultarUltimoPagamento() {
        const ultimoPagamento = this.#pagamentos.at(-1);
        if (!ultimoPagamento) {
            throw new Error("Nenhum pagamento encontrado");
        }
        return { ...ultimoPagamento };
    }

    listarPagamentos() {
        return this.#pagamentos.map(p => ({ ...p }));
    }

}