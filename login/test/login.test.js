import { realizarLogin, atualizarCredenciais, cadastrarUsuario, atualizarSenha  } from '../src/login.js';
import assert from 'node:assert';
import { describe, it } from 'mocha';


describe('Testando Função de Login', function () {

    it('realizarLogin: deve retornar sucesso para credenciais corretas', function () {
        const resultado = realizarLogin('joao@example.com', 'SenhaCorreta123');
        assert.strictEqual(resultado.sucesso, true);
        assert.strictEqual(resultado.mensagem, 'Login realizado com sucesso');
    });

    it('realizarLogin: deve retornar erro para credenciais incorretas', function () {
        const resultado = realizarLogin('joao@example.com', 'SenhaIncorreta');
        assert.strictEqual(resultado.sucesso, false);
        assert.strictEqual(resultado.mensagem, 'Email ou senha incorretos');
    });

    it('realizarLogin: deve retornar erro para credenciais expiradas', function () {
        const resultado = realizarLogin('maria@example.com', 'SenhaExpirada123');
        assert.strictEqual(resultado.sucesso, false);
        assert.strictEqual(resultado.mensagem, 'Credenciais expiradas');
    });
    it('realizarLogin: deve retornar erro para usuário não encontrado', function () {
        const resultado = realizarLogin('usuarioNaoEncontrado@example.com', 'SenhaQualquer123');
        assert.strictEqual(resultado.sucesso, false);
        assert.strictEqual(resultado.mensagem, 'Usuário não encontrado');
    });
});

describe('Testando Função de Cadastro de Usuário', function () {

    it('cadastrarUsuario: deve cadastrar um novo usuário com sucesso', function () {
        const resultado = cadastrarUsuario('Ana', 'ana@example.com', 'SenhaNova123');
        assert.strictEqual(resultado.sucesso, true);
        assert.strictEqual(resultado.mensagem, 'Usuário cadastrado com sucesso');
    });

    it('cadastrarUsuario: deve lançar erro ao tentar cadastrar com campos vazios', function () {
        assert.throws(
            () => cadastrarUsuario('test', '', ''),
            { message: 'Todos os campos são obrigatórios' }
        );
    });

    it('cadastrarUsuario: deve lançar erro ao tentar cadastrar com email já existente', function () {
        assert.throws(
            () => cadastrarUsuario('João', 'joao@example.com', 'SenhaCorreta123'),
            { message: 'Email já cadastrado' }
        );
    });

    it('atualizarCredenciais: deve atualizar o status de expiração do usuário', function () {
        const resultado = atualizarCredenciais(1, true);
        assert.strictEqual(resultado.sucesso, true);
        assert.strictEqual(resultado.mensagem, 'Credenciais atualizadas com sucesso');

        const loginResultado = realizarLogin('joao@example.com', 'SenhaCorreta123');
        assert.strictEqual(loginResultado.sucesso, false);
        assert.strictEqual(loginResultado.mensagem, 'Credenciais expiradas');
    });
});
