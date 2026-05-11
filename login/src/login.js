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
            status: false,
            mensagem: "Usuário não encontrado"
        };
    }
    if (usuarioEncontrado.senha !== senha) {
        return { 
            status: false, 
            mensagem: "Email ou senha incorretos" 
        };
    }
    if (usuarioEncontrado.expirado) {
        return { 
            status: false, 
            mensagem: "Credenciais expiradas" 
        };
    }
    return { 
        status: true, 
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
        status: true, 
        mensagem: "Usuário cadastrado com sucesso" 
    };
}

export function atualizarCredenciais(id, status) {
    const usuario = usuarios.find(user => user.id === id);
    if (!usuario) {
        throw new Error("Usuário não encontrado");
    }
    usuario.expirado = status;
    return { 
        status: true, 
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
        status: true, 
        mensagem: "Senha atualizada com sucesso" 
    };
}

// listar todos os usuários retornar nome  email e status de expiração
export function listarUsuarios() {
    return usuarios.map(user => ({ id: user.id, nome: user.nome, email: user.email, expirado: user.expirado }));
}
