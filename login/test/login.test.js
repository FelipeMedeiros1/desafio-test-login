import { realizarLogin, atualizarCredenciais, cadastrarUsuario, atualizarSenha  } from '../src/login.js';
import assert from 'node:assert';
import { describe, it } from 'mocha';


describe('Testando Função de Login', function () {

    it('realizarLogin: deve retornar sucesso para credenciais corretas', function () {
        const emailCorreto = 'joao@example.com';
        const senhaCorreta = 'SenhaCorreta123';

        const resultado = realizarLogin(emailCorreto, senhaCorreta);

        assert.strictEqual(resultado.sucesso, true);
        assert.strictEqual(resultado.mensagem, 'Login realizado com sucesso');
    });

    it('realizarLogin: deve retornar erro para credenciais incorretas', function () {
        const emailCorreto = 'joao@example.com';
        const senhaIncorreta = 'SenhaIncorreta';

        const resultado = realizarLogin(emailCorreto, senhaIncorreta);
        
        assert.strictEqual(resultado.sucesso, false);
        assert.strictEqual(resultado.mensagem, 'Email ou senha incorretos');
    });

    it('realizarLogin: deve retornar erro para credenciais expiradas', function () {
        const emailExpirado = 'maria@example.com';
        const senhaExpirada = 'SenhaExpirada123';

        const resultado = realizarLogin(emailExpirado, senhaExpirada);

        assert.strictEqual(resultado.sucesso, false);
        assert.strictEqual(resultado.mensagem, 'Credenciais expiradas');
    });
    it('realizarLogin: deve retornar erro para usuário não encontrado', function () {
        const emailNaoEncontrado = 'usuarioNaoEncontrado@example.com';
        const senhaQualquer = 'SenhaQualquer123';

        const resultado = realizarLogin(emailNaoEncontrado, senhaQualquer);

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
        const emailVazio = '';
        const senhaVazia = '';
        assert.throws(
            () => cadastrarUsuario(nome, emailVazio, senhaVazia),
            { message: 'Todos os campos são obrigatórios' }
        );
    });

    it('cadastrarUsuario: deve lançar erro ao tentar cadastrar com email já existente', function () {
        const nome = 'João';
        const emailExistente = 'joao@example.com';
        const senhaExistente = 'SenhaCorreta123';
        assert.throws(
            () => cadastrarUsuario(nome, emailExistente, senhaExistente),
            { message: 'Email já cadastrado' }
        );
    });

    it('atualizarCredenciais: deve atualizar o status de expiração do usuário', function () {
        const idUsuario = 1;
        const novoStatusExpiracao = true;

        const resultado = atualizarCredenciais(idUsuario, novoStatusExpiracao);

        assert.strictEqual(resultado.sucesso, true);
        assert.strictEqual(resultado.mensagem, 'Credenciais atualizadas com sucesso');

        const email = 'joao@example.com';
        const senha = 'SenhaCorreta123';

        const loginResultado = realizarLogin(email, senha);
        
        assert.strictEqual(loginResultado.sucesso, false);
        assert.strictEqual(loginResultado.mensagem, 'Credenciais expiradas');
    });
});
