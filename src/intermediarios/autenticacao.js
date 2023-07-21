const senhaJwt = require('../senhaJwt');
const jsToken = require('jsonwebtoken');
const knex = require('../bancodedados/conexao');

const filtro = async (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];
    if (!token) { return res.status(401).json({ mensagem: "Usuario não autorizado" }); }
    try {
        const { id } = jsToken.verify(token, senhaJwt);
        const resposta = await knex('usuarios').select('*').where({ id: id });
        if (resposta.length === 0) { return res.status(401).json({ mensagem: "Usuario não encontrado" }); }
        const { senha: _, ...dadosUsuario } = resposta[0];
        req.usuario = dadosUsuario;
        next();
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

module.exports = {
    filtro
}