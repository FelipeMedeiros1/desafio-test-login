# Executando os testes (Mocha)

Todos os comandos devem ser executados a partir da pasta `login/`:

```powershell
cd login
```

## Pré-requisitos

Instalar as dependências uma única vez:

```powershell
npm install
```

## Rodar todos os testes

Usando o script definido no `package.json` (`"test": "mocha"`):

```powershell
npm test
```

Ou diretamente:

```powershell
npx mocha
```

> Por padrão o Mocha procura por arquivos em `./test/*.{js,cjs,mjs}`.

## Rodar apenas um arquivo de teste

Passe o caminho do arquivo:

```powershell
npx mocha test/ServicoDePagamentos.test.js
```

## Rodar vários arquivos por padrão (glob)

Use aspas para evitar que o PowerShell expanda o glob:

```powershell
npx mocha "test/**/*Pagamentos*.test.js"
```

## Rodar apenas uma classe / `describe`

Filtre pelo nome do bloco `describe` com `--grep` (ou `-g`):

```powershell
npx mocha --grep "Teste do ServicoDePagamentos"
```

Combinando com um arquivo específico:

```powershell
npx mocha test/ServicoDePagamentos.test.js --grep "Teste do ServicoDePagamentos"
```

## Rodar apenas um teste (`it`) específico

`--grep` também casa contra o título do `it`:

```powershell
npx mocha --grep "Deve consultar o último pagamento"
```

Para rodar um teste cujo nome é prefixo/parte de outros, use uma regex mais estrita:

```powershell
npx mocha --grep "^Deve realizar um pagamento padrão$"
```

## Rodar tudo, exceto um conjunto

Inverte o filtro com `--invert`:

```powershell
npx mocha --grep "pagamento caro" --invert
```

## Focar / pular testes via código

Sem precisar de flag, dentro do arquivo de teste:

- `describe.only(...)` / `it.only(...)` — roda apenas esses blocos.
- `describe.skip(...)` / `it.skip(...)` — ignora esses blocos.

> Lembre-se de remover os `.only` antes do commit.

## Modo watch (re-roda ao salvar)

```powershell
npx mocha --watch
```

## Relatório bonito (mochawesome)

O projeto já tem `mochawesome` como dependência de dev. Para gerar o relatório HTML:

```powershell
npx mocha --reporter mochawesome
```

O relatório fica em `mochawesome-report/mochawesome.html`.
