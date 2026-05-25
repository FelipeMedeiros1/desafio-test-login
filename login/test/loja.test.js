import { it, describe } from "mocha";
import assert from "node:assert";
import { listarQuantidadeDePedidosPorNome, calcularValorTotalPedidos } from "../src/loja.js";

describe("listarQuantidadeDePedidosPorNome", () => {
    it("deve retornar a quantidade correta de pedidos para um item específico", () => {
        const listaProdutos = [
            { nome: "Camiseta", preco: 29.99 },
            { nome: "Calça", preco: 49.99 },
            { nome: "Camiseta", preco: 29.99 },
            { nome: "Tênis", preco: 89.99 },
            { nome: "Camiseta", preco: 29.99 }
        ];

        const qtdEsperada = 3;
        const itemPesquisado = "Camiseta";

        const resultado = listarQuantidadeDePedidosPorNome(itemPesquisado, listaProdutos);
        assert.strictEqual(resultado, qtdEsperada, `Esperado ${qtdEsperada}, mas obteve ${resultado}`);
    });

    it("deve retornar 0 se o item não existir na lista", () => {
        const listaProdutos = [
            { nome: "Camiseta", preco: 29.99 },
            { nome: "Calça", preco: 49.99 }
        ];
        const itemPesquisado = "Tênis";
        const resultado = listarQuantidadeDePedidosPorNome(itemPesquisado, listaProdutos);
        assert.strictEqual(resultado, 0, `Esperado 0, mas obteve ${resultado}`);
    });

    it("deve retornar 0 se a lista estiver vazia", () => {
        const listaProdutos = [];
        const itemPesquisado = "Camiseta";
        const resultado = listarQuantidadeDePedidosPorNome(itemPesquisado, listaProdutos);
        assert.strictEqual(resultado, 0, `Esperado 0, mas obteve ${resultado}`);
    });
});

describe("calcularValorTotalPedidos", () => {
    it("deve retornar 0 para lista vazia", () => {
        assert.strictEqual(calcularValorTotalPedidos([]), 0);
    });

    it("deve somar corretamente os preços dos produtos", () => {
        const produtos = [
            { nome: "Camiseta", preco: 50 },
            { nome: "Calça", preco: 100 },
            { nome: "Tênis", preco: 200 }
        ];
        assert.strictEqual(calcularValorTotalPedidos(produtos), 350);
    });

    it("deve lançar erro se algum produto não tiver preço", () => {
        const produtos = [
            { nome: "Camiseta", preco: 50 },
            { nome: "Calça" }
        ];
        assert.throws(() => calcularValorTotalPedidos(produtos), /Cada produto deve ter um preço válido/);
    });

    it("deve lançar erro se preço não for número", () => {
        const produtos = [
            { nome: "Camiseta", preco: "50" }
        ];
        assert.throws(() => calcularValorTotalPedidos(produtos), /Cada produto deve ter um preço válido/);
    });

    it("deve lançar erro se preço for negativo", () => {
        const produtos = [
            { nome: "Camiseta", preco: -10 }
        ];
        assert.throws(() => calcularValorTotalPedidos(produtos), /Cada produto deve ter um preço válido/);
    });

    it("deve lançar erro se listaProdutos não for array", () => {
        assert.throws(() => calcularValorTotalPedidos("não é array"), /Lista de produtos deve ser um array/);
    });
});
