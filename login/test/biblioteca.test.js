import { buscarLivroPorId } from "../src/biblioteca.js";
import assert from 'node:assert';
import { describe, it } from 'mocha';


describe('Testando Função de Busca de Livro por ID', function () {

    it('buscarLivroPorId: deve retornar o título do livro para um ID válido', function () {
        const id = 1;
        
        const resultado = buscarLivroPorId(id);

        assert.strictEqual(resultado, "O Senhor dos Anéis");
    });

    it('buscarLivroPorId: deve retornar mensagem de erro para ID inválido', function () {
        const id = 10;

        const resultado = buscarLivroPorId(id);

        assert.strictEqual(resultado, "ID do livro inválido");
    });

    it('buscarLivroPorId: deve retornar mensagem de erro para ID negativo', function () {
        const id = -1;

        const resultado = buscarLivroPorId(id);

        assert.strictEqual(resultado, "ID do livro inválido");
    });

    it('buscarLivroPorId: deve retornar mensagem de erro para ID zero', function () {
        const id = 0;

        const resultado = buscarLivroPorId(id);

        assert.strictEqual(resultado, "ID do livro inválido");
    });
});