const usuarios = [
    {
        id: 1,
        nome: "João",
        email: "joao@example.com",
        senha: "SenhaCorreta123",
        expirado: false
    },
    {
        id: 2,
        nome: "Maria",
        email: "maria@example.com",
        senha: "SenhaExpirada123",
        expirado: true
    }
]

export function realizarLogin(email, senha) {
    const usuarioEncontrado = usuarios.find(user => user.email === email);
    if (!usuarioEncontrado) {
        return {
            sucesso: false,
            mensagem: "Usuário não encontrado"
        };
    }
    if (usuarioEncontrado.senha !== senha) {
        return { 
            sucesso: false, 
            mensagem: "Email ou senha incorretos" 
        };
    }
    if (usuarioEncontrado.expirado) {
        return { 
            sucesso: false, 
            mensagem: "Credenciais expiradas" 
        };
    }
    return { 
        sucesso: true, 
        mensagem: "Login realizado com sucesso" 
    };
}

export function cadastrarUsuario(nome, email, senha) {
    if (!nome || !email || !senha) {
        throw new Error("Todos os campos são obrigatórios");
    }
    const emailExistente = usuarios.some(user => user.email === email);
    if (emailExistente) {
        throw new Error("Email já cadastrado");
    }
    const novoUsuario = {
        id: usuarios.length + 1,
        nome,
        email,
        senha,
        expirado: false
    };
    usuarios.push(novoUsuario);
    return { 
        sucesso: true, 
        mensagem: "Usuário cadastrado com sucesso" 
    };
}

export function atualizarCredenciais(id, expirado) {
    const usuario = usuarios.find(user => user.id === id);
    if (!usuario) {
        throw new Error("Usuário não encontrado");
    }
    usuario.expirado = expirado;
    return { 
        sucesso: true, 
        mensagem: "Credenciais atualizadas com sucesso" 
    };
}

export function atualizarSenha(id, novaSenha) {
    const usuario = usuarios.find(user => user.id === id);
    if (!usuario) {
        throw new Error("Usuário não encontrado");
    }
    usuario.senha = novaSenha;
    return { 
        sucesso: true, 
        mensagem: "Senha atualizada com sucesso" 
    };
}