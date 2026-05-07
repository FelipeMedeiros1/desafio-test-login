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


export function buscarLivroPorId(id) {
    const livroEncontrado = livros.find(livro => livro.id === id);
    if (!livroEncontrado || livroEncontrado.id < 1 || livroEncontrado.id > livros.length) {
        return "ID do livro inválido";
    }
    return livroEncontrado.titulo;

}