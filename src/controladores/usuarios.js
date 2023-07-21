const knex = require('../bancodedados/conexao');
const bcrypt = require('bcrypt');
const senhaJwt = require('../senhaJwt');
const jsToken = require('jsonwebtoken');

const cadastraUsuario = async function (req, res) {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) { return res.status(400).json({ mensagem: "Por favor, informe todos os campos." }); }
    try {
        const verificarEmail = await knex('usuarios').select('email').where({ email: email });
        if (verificarEmail.length > 0) { return res.status(400).json({ mensagem: "Email invalido para cadastro." }); }
        const senhaCriptografada = await bcrypt.hash(senha, 10);
        await knex('usuarios').insert({
            nome,
            email,
            senha: senhaCriptografada
        });
        return res.status(200).json({ mensagem: "Usuario cadastrado!" });
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

const login = async function (req, res) {
    const { email, senha } = req.body;
    if (!email || !senha) { return res.status(400).json({ mensagem: "Por favor, informe todos os campos." }); }
    try {
        const verificarUsuario = await knex('usuarios').select('*').where({ email: email });
        if (verificarUsuario.length === 0) { return res.status(400).json({ mensagem: "Email ou senha incorretos." }); }
        const verificarSenha = await bcrypt.compare(senha, verificarUsuario[0].senha);
        if (!verificarSenha) { return res.status(400).json({ mensagem: "Email ou senha incorretos." }); }
        const usuarioLogin = verificarUsuario[0];
        const token = jsToken.sign({ id: usuarioLogin.id }, senhaJwt, { expiresIn: '2h' });
        const { senha: _, ...dadosUsuario } = usuarioLogin;
        return res.status(200).json({
            dadosUsuario, token
        });
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

module.exports = {
    cadastraUsuario, login
}