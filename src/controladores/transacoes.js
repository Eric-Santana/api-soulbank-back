const knex = require('../bancodedados/conexao');

const adicionarTransacoes = async function (req, res) {
    const { descricao, valor, data, categoria_id, tipo } = req.body;
    const { id } = req.usuario;
    if (!descricao || !valor || !data || !categoria_id || !tipo) {
        return res.status(400).json({ mensagem: "Informe todos os campos." });
    }
    if (tipo !== 'entrada' && tipo !== 'saída') { return res.status(400).json({ mensagem: "O tipo só pode ser entrada ou saída!" }); }
    try {
        await knex('transacoes').insert({
            descricao,
            valor,
            data,
            categoria_id,
            usuario_id: id,
            tipo,
        });
        return res.status(200).json({ mensagem: "Transação adicionada com sucesso!" });
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

const editarTransacoes = async (req, res) => {
    const { descricao, valor, data, categoria_id, tipo, transacao_id } = req.body;
    const { id } = req.usuario;
    if (!descricao || !valor || !data || !categoria_id || !tipo) {
        return res.status(400).json({ mensagem: "Informe todos os campos." });
    }
    if (tipo !== 'entrada' && tipo !== 'saída') { return res.status(400).json({ mensagem: "O tipo só pode ser entrada ou saida!" }); }
    try {
        const verificarTransacao = await knex('transacoes').select('*').where({
            id: transacao_id,
            usuario_id: id
        });
        if (verificarTransacao.length === 0) { return res.status(400).json({ mensagem: "Transação não encontrada." }); }
        await knex('transacoes').update({
            descricao,
            valor,
            data,
            categoria_id,
            usuario_id: id,
            tipo
        }).where({
            id: transacao_id,
            usuario_id: id
        });
        return res.status(200).json({ mensagem: "Transação editada com sucesso!" });
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

const listarTransacoes = async (req, res) => {
    const { id } = req.usuario;
    try {
        const resposta = await knex(
            'transacoes').join('categorias', 'transacoes.categoria_id', '=', 'categorias.id').
            select([
                'transacoes.id',
                'transacoes.descricao',
                'categorias.descricao as categoria_nome',
                'transacoes.valor',
                'transacoes.data',
                'transacoes.categoria_id',
                'transacoes.usuario_id',
                'transacoes.tipo'])
            .where({
                usuario_id: id
            });
        return res.status(200).json(resposta);
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

const extrato = async (req, res) => {
    const { id } = req.usuario;
    try {
        let entrada = 0;
        let saida = 0;
        const resposta = await knex('transacoes').select('*').where({
            usuario_id: id
        });
        resposta.map((item) => {
            if (item.tipo === 'entrada') {
                entrada += item.valor
            } else {
                saida += item.valor
            }
        });
        const obj = {
            entrada,
            saida
        }
        return res.status(200).json(obj);
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

const categorias = async (req, res) => {
    try {
        const resposta = await knex('categorias').select('*');
        return res.status(200).json(resposta);
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

const excluirTransacoes = async (req, res) => {
    const { id_transacao } = req.params;
    const { id } = req.usuario;
    try {
        const verificarTransacao = await knex('transacoes').select('*').where({
            usuario_id: id,
            id: id_transacao
        });
        if (verificarTransacao.length === 0) { return res.status(400).json({ mensagem: "Erro ao deletar transação." }); }
        await knex('transacoes').delete().where({
            usuario_id: id,
            id: id_transacao
        });
        return res.status(200).json({ mensagem: "Transação excluida com sucesso!" });
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

const excluirTudo = async (req, res) => {
    const { id } = req.usuario;
    try {
        await knex('transacoes').delete().where({
            usuario_id: id
        });
        return res.status(200).json({ mensagem: "Todas as transações foram excluidas!" });
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

module.exports = {
    adicionarTransacoes, editarTransacoes, listarTransacoes, extrato, categorias, excluirTransacoes, excluirTudo
}