import { realizarLogin, atualizarCredenciais, cadastrarUsuario, atualizarSenha  } from '../src/login.js';
import assert from 'node:assert';
import { describe, it } from 'mocha';


describe('Testando Função de Login', function () {

    it('realizarLogin: deve retornar sucesso para credenciais corretas', function () {
        const emailCorreto = 'joao@example.com';
        const senhaCorreta = 'SenhaCorreta123';
        const emailCorreto = 'joao@example.com';
        const senhaCorreta = 'SenhaCorreta123';

        const resultado = realizarLogin(emailCorreto, senhaCorreta);
        const resultado = realizarLogin(emailCorreto, senhaCorreta);

        assert.strictEqual(resultado.status, true);
        assert.strictEqual(resultado.mensagem, 'Login realizado com sucesso');
    });

    it('realizarLogin: deve retornar erro para credenciais incorretas', function () {
        const emailCorreto = 'joao@example.com';
        const senhaIncorreta = 'SenhaIncorreta';
        const emailCorreto = 'joao@example.com';
        const senhaIncorreta = 'SenhaIncorreta';

        const resultado = realizarLogin(emailCorreto, senhaIncorreta);
        const resultado = realizarLogin(emailCorreto, senhaIncorreta);
        
        assert.strictEqual(resultado.status, false);
        assert.strictEqual(resultado.mensagem, 'Email ou senha incorretos');
    });

    it('realizarLogin: deve retornar erro para credenciais expiradas', function () {
        const emailExpirado = 'maria@example.com';
        const senhaExpirada = 'SenhaExpirada123';
        const emailExpirado = 'maria@example.com';
        const senhaExpirada = 'SenhaExpirada123';

        const resultado = realizarLogin(emailExpirado, senhaExpirada);
        const resultado = realizarLogin(emailExpirado, senhaExpirada);

        assert.strictEqual(resultado.status, false);
        assert.strictEqual(resultado.mensagem, 'Credenciais expiradas');
    });
    it('realizarLogin: deve retornar erro para usuário não encontrado', function () {
        const emailNaoEncontrado = 'usuarioNaoEncontrado@example.com';
        const senhaQualquer = 'SenhaQualquer123';
        const emailNaoEncontrado = 'usuarioNaoEncontrado@example.com';
        const senhaQualquer = 'SenhaQualquer123';

        const resultado = realizarLogin(emailNaoEncontrado, senhaQualquer);
        const resultado = realizarLogin(emailNaoEncontrado, senhaQualquer);

        assert.strictEqual(resultado.status, false);
        assert.strictEqual(resultado.mensagem, 'Usuário não encontrado');
    });
});

describe('Testando Função de Cadastro de Usuário', function () {

    it('cadastrarUsuario: deve cadastrar um novo usuário com sucesso', function () {
        const nome = 'Ana';
        const email = 'ana@example.com';
        const senha = 'SenhaNova123';

        const resultado = cadastrarUsuario(nome, email, senha);

        assert.strictEqual(resultado.status, true);
        assert.strictEqual(resultado.mensagem, 'Usuário cadastrado com sucesso');
    });

    it('cadastrarUsuario: deve lançar erro ao tentar cadastrar com campos vazios', function () {
        const nome = 'test';
        const emailVazio = '';
        const senhaVazia = '';
        const emailVazio = '';
        const senhaVazia = '';
        assert.throws(
            () => cadastrarUsuario(nome, emailVazio, senhaVazia),
            () => cadastrarUsuario(nome, emailVazio, senhaVazia),
            { message: 'Todos os campos são obrigatórios' }
        );
    });

    it('cadastrarUsuario: deve lançar erro ao tentar cadastrar com email já existente', function () {
        const nome = 'João';
        const emailExistente = 'joao@example.com';
        const senha = 'SenhaCorreta123';
        assert.throws(
            () => cadastrarUsuario(nome, emailExistente, senha),
            { message: 'Email já cadastrado' }
        );
    });

    it('atualizarCredenciais: deve atualizar o status de expiração do usuário', function () {
        const idUsuario = 1;
        const novoStatusExpiracao = true;

        const resultado = atualizarCredenciais(idUsuario, novoStatusExpiracao);
        const idUsuario = 1;
        const novoStatusExpiracao = true;

        const resultado = atualizarCredenciais(idUsuario, novoStatusExpiracao);

        assert.strictEqual(resultado.status, true);
        assert.strictEqual(resultado.mensagem, 'Credenciais atualizadas com sucesso');

        const emailExpirado = 'joao@example.com';
        const senhaExpirada = 'SenhaCorreta123';

        const loginResultado = realizarLogin(emailExpirado, senhaExpirada);
        
        assert.strictEqual(loginResultado.status, false);
        assert.strictEqual(loginResultado.mensagem, 'Credenciais expiradas');
    });
});
