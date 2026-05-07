const livros = [
    {
        id: 1,
        titulo: "O Senhor dos Anéis",
        tema: "Fantasia",
        preco: 39.90
    },
    {
        id: 2,
        titulo: "1984",
        tema: "Distopia",
        preco: 29.90
    },
    {
        id: 3,
        titulo: "O Hobbit",
        tema: "Fantasia",
        preco: 34.90
    },
    {
        id: 4,
        titulo: "Fahrenheit 451",
        tema: "Distopia",
        preco: 31.90
    },
    {
        id: 5,
        titulo: "O Código Da Vinci",
        tema: "Mistério",
        preco: 37.90
    }
]

export function buscarTodosLivros() {
    return livros;
}

export function buscarLivroPorId(id) {
    const livroEncontrado = livros.find(livro => livro.id === id);
    if (!livroEncontrado || livroEncontrado.id < 1 || livroEncontrado.id > livros.length) {
        return "ID do livro inválido";
    }
    return livroEncontrado.titulo;

}

export function buscarLivrosPorTema(tema) {
    const livrosEncontrados = livros.filter(livro => livro.tema.toLowerCase() === tema.toLowerCase());
    if (livrosEncontrados.length === 0) {
        return `Nenhum livro com o tema: ${tema}, foi encontrado na biblioteca`;
    }
    return livrosEncontrados.map(livro => livro.titulo);
}

export function buscarPorTitulo(titulo) {
    const livroEncontrado = livros.find(livro => livro.titulo.toLowerCase() === titulo.toLowerCase());
    if (!livroEncontrado) {
        return "Livro não encontrado";
    }
    return livroEncontrado.titulo;
}

export function adicionarLivro(titulo, tema, preco) {
    if (typeof preco !== "number" ||preco <= 0 ||!Number.isFinite(preco) ||
        Math.round((preco + Number.EPSILON) * 100) / 100 !== preco
    ) {
        return "Preço do livro deve ser um número positivo com no máximo duas casas decimais";
    }
    if (titulo.length > 100) {
        return "Título do livro deve conter no máximo 100 caracteres";
    }
    if (tema.length > 50) {
        return "Tema do livro deve conter no máximo 50 caracteres";
    }
    const livroExistente = livros.find(livro => livro.titulo.toLowerCase() === titulo.toLowerCase());
    if (livroExistente) {
        return "Livro já existe";
    }
    const novoLivro = {
        id: livros.length + 1,
        titulo,
        tema,
        preco
    };

    if (!novoLivro.titulo || !novoLivro.tema || !novoLivro.preco) {
        return "Todos os campos são obrigatórios";
    }
    livros.push(novoLivro);
    return `Livro: ${novoLivro.titulo} adicionado com sucesso`;
}

export function atualizarPrecoLivro(id, novoPreco) {
    if (novoPreco <= 0 || Math.round(novoPreco * 100) !== novoPreco * 100) {
        return "Preço do livro deve ser um número positivo com no máximo duas casas decimais";
    }
    const livro = livros.find(livro => livro.id === id);
    if (!livro) {
        return "Livro não encontrado";
    }
    livro.preco = novoPreco;
    return 'Preço do livro atualizado com sucesso';
}

export function removerLivroPorId(id) {
    const index = livros.findIndex(livro => livro.id === id);
    if (index === -1) {
        return "Livro não encontrado";
    }
    livros.splice(index, 1);
    return 'Livro removido com sucesso';
}