const knex = require('../bancodedados/conexao');

const status = async function (req, res) {
    try {
        const resposta = await knex('usuarios').select('*');
        return res.status(200).json({ mensagem: "Tudo pronto!" });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
}

module.exports = {
    status
}