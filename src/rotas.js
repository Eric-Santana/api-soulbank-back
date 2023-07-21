const express = require('express');
const rotas = express();
const { cadastraUsuario, login } = require('./controladores/usuarios');
const { status } = require('./controladores/status');
const { adicionarTransacoes, editarTransacoes, listarTransacoes, extrato, categorias, excluirTransacoes, excluirTudo } = require('./controladores/transacoes')
const { filtro } = require('./intermediarios/autenticacao');

rotas.get('/status/', status);
rotas.post('/cadastro', cadastraUsuario);
rotas.post('/login', login);
rotas.use(filtro);
rotas.post('/transacoes', adicionarTransacoes);
rotas.put('/transacoes', editarTransacoes);
rotas.get('/transacoes', listarTransacoes);
rotas.get('/extrato', extrato);
rotas.get('/categorias', categorias);
rotas.delete('/transacoes/:id_transacao', excluirTransacoes);
rotas.delete('/excluirTudo/', excluirTudo);

module.exports = rotas