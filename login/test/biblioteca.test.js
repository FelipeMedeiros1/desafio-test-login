import {
    buscarLivroPorId,
    buscarLivrosPorTema,
    buscarPorTitulo,
    adicionarLivro,
    atualizarPrecoLivro,
    removerLivroPorId,
    buscarTodosLivros
} from "../src/biblioteca.js";
import assert from 'node:assert';
import { describe, it } from 'mocha';


describe('Testando Função de Busca de Livros', function () {

    it('buscarLivroPorId: deve retornar o título do livro para um ID válido', function () {
        const idValido = 1;
        const resultado = buscarLivroPorId(idValido);
        assert.strictEqual(resultado, "O Senhor dos Anéis");
    });

    it('buscarLivroPorId: deve retornar mensagem de erro para ID inválido', function () {
        const idInvalido = 10;
        const resultado = buscarLivroPorId(idInvalido);
        assert.strictEqual(resultado, "ID do livro inválido");
    });

    it('buscarLivroPorId: deve retornar mensagem de erro para ID negativo', function () {
        const idNegativo = -1;
        const resultado = buscarLivroPorId(idNegativo);
        assert.strictEqual(resultado, "ID do livro inválido");
    });

    it('buscarLivroPorId: deve retornar mensagem de erro para ID zero', function () {
        const idZero = 0;
        const resultado = buscarLivroPorId(idZero);
        assert.strictEqual(resultado, "ID do livro inválido");
    });
    it('deve retornar títulos dos livros do tema escolhido', function () {
        const tema = 'Fantasia';
        const resultado = buscarLivrosPorTema(tema);
        assert.deepStrictEqual(resultado, ["O Senhor dos Anéis", "O Hobbit"]);
    });
    it('deve retornar todos os livros disponíveis na biblioteca', function () {
        const resultado = buscarTodosLivros();
        assert.deepStrictEqual(resultado.map(livro => livro.titulo), ["O Senhor dos Anéis", "1984", "O Hobbit", "Fahrenheit 451", "O Código Da Vinci"]);
    });
    it('deve retornar mensagem de erro para tema inexistente', function () {
        const temaInexistente = 'Inexistente';
        const resultado = buscarLivrosPorTema(temaInexistente);
        assert.strictEqual(resultado, `Nenhum livro com o tema: ${temaInexistente}, foi encontrado na biblioteca`);
    });
    it('deve retornar o título do livro se existir', function () {
        const tituloExistente = '1984';
        const resultado = buscarPorTitulo(tituloExistente);
        assert.strictEqual(resultado, tituloExistente);
    });
    it('deve retornar mensagem de erro se não existir', function () {
        const tituloInexistente = 'Livro Inexistente';
        const resultado = buscarPorTitulo(tituloInexistente);
        assert.strictEqual(resultado, "Livro não encontrado");
    });
});

describe('Testando funções de biblioteca', function () {
    it('deve adicionar um novo livro', function () {
        const titulo = 'Novo Livro';
        const tema = 'Aventura';
        const preco = 19.99;

        const resultado = adicionarLivro(titulo, tema, preco);
        assert.strictEqual(resultado, `Livro: ${titulo} adicionado com sucesso`);
    });
    it('não deve adicionar livro com preço inválido', function () {
        const titulo = 'Outro Livro';
        const tema = 'Aventura';
        const precoInvalido = -10;

        const resultado = adicionarLivro(titulo, tema, precoInvalido);
        assert.strictEqual(resultado, "Preço do livro deve ser um número positivo com no máximo duas casas decimais");
    });
    it('não deve adicionar livro com título repetido', function () {
        const tituloRepetido = '1984';
        const tema = 'Distopia';
        const preco = 29.90;

        const resultado = adicionarLivro(tituloRepetido, tema, preco);
        assert.strictEqual(resultado, "Livro já existe");
    });
    it('deve atualizar o preço de um livro existente', function () {
        const id = 2;
        const novoPreco = 35.50;

        const resultado = atualizarPrecoLivro(id, novoPreco);
        assert.strictEqual(resultado, 'Preço do livro atualizado com sucesso');
    });
    it('não deve atualizar preço para valor inválido', function () {
        const id = 2;
        const novoPrecoInvalido = -5;

        const resultado = atualizarPrecoLivro(id, novoPrecoInvalido);
        assert.strictEqual(resultado, "Preço do livro deve ser um número positivo com no máximo duas casas decimais");
    });
    it('não deve atualizar livro inexistente', function () {
        const idInexistente = 999;
        const novoPreco = 10.00;

        const resultado = atualizarPrecoLivro(idInexistente, novoPreco);
        assert.strictEqual(resultado, "Livro não encontrado");
    });
    it('deve remover um livro existente', function () {
        const idExistente = 5;
        const resultado = removerLivroPorId(idExistente);
        assert.strictEqual(resultado, 'Livro removido com sucesso');
    });
    it('não deve remover livro inexistente', function () {
        const idInexistente = 999;
        const resultado = removerLivroPorId(idInexistente);
        assert.strictEqual(resultado, "Livro não encontrado");
    });

});