import { realizarLogin, atualizarCredenciais, cadastrarUsuario, atualizarSenha  } from '../src/login.js';
import assert from 'node:assert';
import { describe, it } from 'mocha';


describe('Testando Função de Login', function () {

    it('realizarLogin: deve retornar sucesso para credenciais corretas', function () {
        const email = 'joao@example.com';
        const senha = 'SenhaCorreta123';

        const resultado = realizarLogin(email, senha);

        assert.strictEqual(resultado.sucesso, true);
        assert.strictEqual(resultado.mensagem, 'Login realizado com sucesso');
    });

    it('realizarLogin: deve retornar erro para credenciais incorretas', function () {
        const email = 'joao@example.com';
        const senha = 'SenhaIncorreta';

        const resultado = realizarLogin(email, senha);
        
        assert.strictEqual(resultado.sucesso, false);
        assert.strictEqual(resultado.mensagem, 'Email ou senha incorretos');
    });

    it('realizarLogin: deve retornar erro para credenciais expiradas', function () {
        const email = 'maria@example.com';
        const senha = 'SenhaExpirada123';

        const resultado = realizarLogin(email, senha);

        assert.strictEqual(resultado.sucesso, false);
        assert.strictEqual(resultado.mensagem, 'Credenciais expiradas');
    });
    it('realizarLogin: deve retornar erro para usuário não encontrado', function () {
        const email = 'usuarioNaoEncontrado@example.com';
        const senha = 'SenhaQualquer123';

        const resultado = realizarLogin(email, senha);

        assert.strictEqual(resultado.sucesso, false);
        assert.strictEqual(resultado.mensagem, 'Usuário não encontrado');
    });
});

describe('Testando Função de Cadastro de Usuário', function () {

    it('cadastrarUsuario: deve cadastrar um novo usuário com sucesso', function () {
        const nome = 'Ana';
        const email = 'ana@example.com';
        const senha = 'SenhaNova123';

        const resultado = cadastrarUsuario(nome, email, senha);

        assert.strictEqual(resultado.sucesso, true);
        assert.strictEqual(resultado.mensagem, 'Usuário cadastrado com sucesso');
    });

    it('cadastrarUsuario: deve lançar erro ao tentar cadastrar com campos vazios', function () {
        const nome = 'test';
        const email = '';
        const senha = '';
        assert.throws(
            () => cadastrarUsuario(nome, email, senha),
            { message: 'Todos os campos são obrigatórios' }
        );
    });

    it('cadastrarUsuario: deve lançar erro ao tentar cadastrar com email já existente', function () {
        const nome = 'João';
        const email = 'joao@example.com';
        const senha = 'SenhaCorreta123';
        assert.throws(
            () => cadastrarUsuario(nome, email, senha),
            { message: 'Email já cadastrado' }
        );
    });

    it('atualizarCredenciais: deve atualizar o status de expiração do usuário', function () {
        const resultado = atualizarCredenciais(1, true);

        assert.strictEqual(resultado.sucesso, true);
        assert.strictEqual(resultado.mensagem, 'Credenciais atualizadas com sucesso');

        const email = 'joao@example.com';
        const senha = 'SenhaCorreta123';

        const loginResultado = realizarLogin(email, senha);
        
        assert.strictEqual(loginResultado.sucesso, false);
        assert.strictEqual(loginResultado.mensagem, 'Credenciais expiradas');
    });
});
