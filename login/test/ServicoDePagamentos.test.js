import { ServicoDePagamentos } from '../src/ServicoDePagamentos.js';
import assert from 'node:assert';
import { describe, it, beforeEach } from 'mocha';

describe('Teste do ServicoDePagamentos', () => {
    let servico;

    beforeEach(() => {
        servico = new ServicoDePagamentos();
    });



    describe('realizarPagamento - casos de sucesso', () => {
        it('Deve realizar um pagamento padrão (valor <= 100)', () => {
            const codigoBarras = '987654321';
            const nomeEmpresa = 'Empresa B';
            const valorPagamentoPadrao = 50.00;
            const categoriaEsperada = 'Padrao';

            const pagamentoRealizado = servico.realizarPagamento(codigoBarras, nomeEmpresa, valorPagamentoPadrao);

            assert.strictEqual(pagamentoRealizado.codigoBarras, codigoBarras);
            assert.strictEqual(pagamentoRealizado.nomeEmpresa, nomeEmpresa);
            assert.strictEqual(pagamentoRealizado.valor, valorPagamentoPadrao);
            assert.strictEqual(pagamentoRealizado.categoria, categoriaEsperada);

        });

        it('Deve realizar um pagamento caro (valor > 100)', () => {
            const codigoBarras = '987654322';
            const nomeEmpresa = 'Empresa C';
            const valorPagamentoCaro = 150.00;
            const categoriaEsperada = 'Cara';

            const pagamentoRealizado = servico.realizarPagamento(codigoBarras, nomeEmpresa, valorPagamentoCaro);

            assert.strictEqual(pagamentoRealizado.categoria, categoriaEsperada);
        });

        it('Deve classificar pagamento de exatamente 100 como Padrao', () => {
            const codigoBarras = '100';
            const nomeEmpresa = 'Empresa 100';
            const valorLimiteCategoriaPadrao = 100.00;
            const categoriaEsperada = 'Padrao';

            const pagamentoRealizado = servico.realizarPagamento(codigoBarras, nomeEmpresa, valorLimiteCategoriaPadrao);

            assert.strictEqual(pagamentoRealizado.categoria, categoriaEsperada);
        });

        it('Deve classificar pagamento de 100.01 como Cara', () => {
            const codigoBarras = '101';
            const nomeEmpresa = 'Empresa 101';
            const valorAcimaDoLimite = 100.01;
            const categoriaEsperada = 'Cara';

            const pagamentoRealizado = servico.realizarPagamento(codigoBarras, nomeEmpresa, valorAcimaDoLimite);

            assert.strictEqual(pagamentoRealizado.categoria, categoriaEsperada);
        });

        it('Deve adicionar o pagamento ao histórico', () => {
            const codigoBarras = '808';
            const nomeEmpresa = 'Empresa histórico';
            const valor = 10;
            const quantidadeInicialDePagamentos = servico.listarPagamentos().length;

            servico.realizarPagamento(codigoBarras, nomeEmpresa, valor);

            const quantidadeEsperadaAposInsercao = quantidadeInicialDePagamentos + 1;
            assert.strictEqual(servico.listarPagamentos().length, quantidadeEsperadaAposInsercao);
        });

        it('Deve preservar a ordem de inserção no histórico', () => {
            const codigoBarrasPrimeiro = '101';
            const codigoBarrasSegundo = '102';
            const codigoBarrasTerceiro = '103';
            const valorPrimeiro = 10;
            const valorSegundo = 20;
            const valorTerceiro = 30;

            const primeiroPagamento = servico.realizarPagamento(codigoBarrasPrimeiro, 'Empresa 1', valorPrimeiro);
            const segundoPagamento = servico.realizarPagamento(codigoBarrasSegundo, 'Empresa 2', valorSegundo);
            const terceiroPagamento = servico.realizarPagamento(codigoBarrasTerceiro, 'Empresa 3', valorTerceiro);

            const historico = servico.listarPagamentos();
            assert.deepStrictEqual(historico.at(-3), primeiroPagamento);
            assert.deepStrictEqual(historico.at(-2), segundoPagamento);
            assert.deepStrictEqual(historico.at(-1), terceiroPagamento);
        });

        it('Deve retornar uma data próxima do instante atual', () => {
            const codigoBarras = '104';
            const nomeEmpresa = 'Empresa';
            const valor = 10;

            const instanteAntesDoPagamento = Date.now();
            const pagamentoRealizado = servico.realizarPagamento(codigoBarras, nomeEmpresa, valor);
            const instanteDepoisDoPagamento = Date.now();

            assert.ok(pagamentoRealizado.data.getTime() >= instanteAntesDoPagamento);
            assert.ok(pagamentoRealizado.data.getTime() <= instanteDepoisDoPagamento);
        });

        it('Deve aceitar código de barras com letras/caracteres especiais', () => {
            const codigoBarrasComCaracteresEspeciais = 'ABC-"123/"456';
            const nomeEmpresa = 'Empresa 105';
            const valor = 10;

            const pagamentoRealizado = servico.realizarPagamento(codigoBarrasComCaracteresEspeciais, nomeEmpresa, valor);

            assert.strictEqual(pagamentoRealizado.codigoBarras, codigoBarrasComCaracteresEspeciais);
        });

        it('Deve aceitar valores decimais pequenos', () => {
            const codigoBarras = '1';
            const nomeEmpresa = 'Empresa';
            const valorMinimoAceito = 0.01;
            const categoriaEsperada = 'Padrao';

            const pagamentoRealizado = servico.realizarPagamento(codigoBarras, nomeEmpresa, valorMinimoAceito);

            assert.strictEqual(pagamentoRealizado.valor, valorMinimoAceito);
            assert.strictEqual(pagamentoRealizado.categoria, categoriaEsperada);
        });

        it('Deve aceitar valores muito grandes', () => {
            const codigoBarras = '1';
            const nomeEmpresa = 'Empresa';
            const valorMuitoAlto = 1_000_000;
            const categoriaEsperada = 'Cara';

            const pagamentoRealizado = servico.realizarPagamento(codigoBarras, nomeEmpresa, valorMuitoAlto);

            assert.strictEqual(pagamentoRealizado.valor, valorMuitoAlto);
            assert.strictEqual(pagamentoRealizado.categoria, categoriaEsperada);
        });
    });

    describe('realizarPagamento - validações (erros)', () => {
        const mensagemErroCampoObrigatorio = /Todos os campos são obrigatórios/;
        const mensagemErroValorInvalido = /Valor deve ser um número positivo/;

        it('Deve lançar erro quando codigoBarras for undefined', () => {
            const codigoBarrasUndefined = undefined;
            const nomeEmpresa = 'Empresa';
            const valor = 10;

            assert.throws(
                () => servico.realizarPagamento(codigoBarrasUndefined, nomeEmpresa, valor),
                mensagemErroCampoObrigatorio
            );
        });

        it('Deve lançar erro quando codigoBarras for string vazia', () => {
            const codigoBarrasVazio = '';
            const nomeEmpresa = 'Empresa';
            const valor = 10;

            assert.throws(
                () => servico.realizarPagamento(codigoBarrasVazio, nomeEmpresa, valor),
                mensagemErroCampoObrigatorio
            );
        });

        it('Deve lançar erro quando codigoBarras for null', () => {
            const codigoBarrasNulo = null;
            const nomeEmpresa = 'Empresa';
            const valor = 10;

            assert.throws(
                () => servico.realizarPagamento(codigoBarrasNulo, nomeEmpresa, valor),
                mensagemErroCampoObrigatorio
            );
        });

        it('Deve lançar erro quando nomeEmpresa for undefined', () => {
            const codigoBarras = '1';
            const nomeEmpresaUndefined = undefined;
            const valor = 10;

            assert.throws(
                () => servico.realizarPagamento(codigoBarras, nomeEmpresaUndefined, valor),
                mensagemErroCampoObrigatorio
            );
        });

        it('Deve lançar erro quando nomeEmpresa for string vazia', () => {
            const codigoBarras = '1';
            const nomeEmpresaVazio = '';
            const valor = 10;

            assert.throws(
                () => servico.realizarPagamento(codigoBarras, nomeEmpresaVazio, valor),
                mensagemErroCampoObrigatorio
            );
        });

        it('Deve lançar erro quando valor for undefined', () => {
            const codigoBarras = '1';
            const nomeEmpresa = 'Empresa';
            const valorUndefined = undefined;

            assert.throws(
                () => servico.realizarPagamento(codigoBarras, nomeEmpresa, valorUndefined),
                mensagemErroCampoObrigatorio
            );
        });

        it('Deve lançar erro quando valor for zero', () => {
            const codigoBarras = '1';
            const nomeEmpresa = 'Empresa';
            const valorZero = 0;

            assert.throws(
                () => servico.realizarPagamento(codigoBarras, nomeEmpresa, valorZero),
                mensagemErroValorInvalido
            );
        });

        it('Deve lançar erro quando valor for negativo', () => {
            const codigoBarras = '1';
            const nomeEmpresa = 'Empresa';
            const valorNegativo = -10;

            assert.throws(
                () => servico.realizarPagamento(codigoBarras, nomeEmpresa, valorNegativo),
                mensagemErroValorInvalido
            );
        });

        it('Deve lançar erro quando valor for string', () => {
            const codigoBarras = '1';
            const nomeEmpresa = 'Empresa';
            const valorComoString = '10';

            assert.throws(
                () => servico.realizarPagamento(codigoBarras, nomeEmpresa, valorComoString),
                mensagemErroValorInvalido
            );
        });

        it('Deve lançar erro quando valor for NaN', () => {
            const codigoBarras = '1';
            const nomeEmpresa = 'Empresa';
            const valorNaN = NaN;

            assert.throws(
                () => servico.realizarPagamento(codigoBarras, nomeEmpresa, valorNaN),
                mensagemErroValorInvalido
            );
        });

    });

    describe('consultarUltimoPagamento', () => {
        it('Deve retornar o pagamento pré-carregado quando construído com pagamentosIniciais', () => {
            const nomeEmpresaPreCarregada = 'Empresa A';
            const servicoComHistorico = new ServicoDePagamentos({
                pagamentosIniciais: [{
                    codigoBarras: '123456789',
                    nomeEmpresa: nomeEmpresaPreCarregada,
                    valor: 50.00,
                    categoria: 'Padrao',
                    data: new Date('2024-06-01')
                }]
            });

            const ultimoPagamento = servicoComHistorico.consultarUltimoPagamento();

            assert.strictEqual(ultimoPagamento.nomeEmpresa, nomeEmpresaPreCarregada);
        });

        it('Deve retornar o último pagamento realizado', () => {
            const codigoBarras = '111222333';
            const nomeEmpresa = 'Empresa D';
            const valor = 200.00;

            const pagamentoRealizado = servico.realizarPagamento(codigoBarras, nomeEmpresa, valor);
            const ultimoPagamento = servico.consultarUltimoPagamento();

            assert.deepStrictEqual(ultimoPagamento, pagamentoRealizado);
        });

        it('Deve lançar erro quando o histórico estiver vazio', () => {
            const mensagemErroHistoricoVazio = /Nenhum pagamento encontrado/;
            const servicoVazio = new ServicoDePagamentos();

            assert.throws(
                () => servicoVazio.consultarUltimoPagamento(),
                mensagemErroHistoricoVazio
            );
        });
    });
});
