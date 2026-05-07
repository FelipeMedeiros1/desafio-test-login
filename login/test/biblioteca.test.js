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
        const tema = 'Inexistente';
        const resultado = buscarLivrosPorTema(tema);
        assert.strictEqual(resultado, `Nenhum livro com o tema: ${tema}, foi encontrado na biblioteca`);
    });
    it('deve retornar o título do livro se existir', function () {
        const titulo = '1984';
        const resultado = buscarPorTitulo(titulo);
        assert.strictEqual(resultado, titulo);
    });
    it('deve retornar mensagem de erro se não existir', function () {
        const titulo = 'Livro Inexistente';
        const resultado = buscarPorTitulo(titulo);
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
        const preco = -10;

        const resultado = adicionarLivro(titulo, tema, preco);
        assert.strictEqual(resultado, "Preço do livro deve ser um número positivo com no máximo duas casas decimais");
    });
    it('não deve adicionar livro com título repetido', function () {
        const titulo = '1984';
        const tema = 'Distopia';
        const preco = 29.90;

        const resultado = adicionarLivro(titulo, tema, preco);
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
        const novoPreco = -5;

        const resultado = atualizarPrecoLivro(id, novoPreco);
        assert.strictEqual(resultado, "Preço do livro deve ser um número positivo com no máximo duas casas decimais");
    });
    it('não deve atualizar livro inexistente', function () {
        const id = 999;
        const novoPreco = 10.00;

        const resultado = atualizarPrecoLivro(id, novoPreco);
        assert.strictEqual(resultado, "Livro não encontrado");
    });
    it('deve remover um livro existente', function () {
        const id = 5;
        const resultado = removerLivroPorId(id);
        assert.strictEqual(resultado, 'Livro removido com sucesso');
    });
    it('não deve remover livro inexistente', function () {
        const id = 999;
        const resultado = removerLivroPorId(id);
        assert.strictEqual(resultado, "Livro não encontrado");
    });

});