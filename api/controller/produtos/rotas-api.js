// mergeParams junta os paramentros com o Roteador da camada de cima
const roteador = require('express').Router({mergeParams: true})
const TabelaProdutos = require('../../banco-de-dados/DAO/TabelaProdutos')
const Produto = require('./Produto')


roteador.get('/', async (req, res) => {
    const produtos = await TabelaProdutos.listar(req.params.idFornecedor)
    res.send(
        JSON.stringify(produtos)
    )
})

roteador.get('/:idProduto', async (req, res) => {
    const idProduto = parseInt(req.params.idProduto)
    const produto = new Produto({id: idProduto})
    try {
        await produto.listarPorId()
        res.status(200)
        res.send(
            JSON.stringify(produto)
        )
    } catch (error) {
        console.error(error)
    }

})

roteador.post('/', async (req, res, next) => {
    const idFornecedor = req.params.idFornecedor
    const corpo = req.body
    const dados = Object.assign({}, corpo, {fornecedor: idFornecedor})
    const produto = new Produto(dados)

    try {
        await produto.criar()
        res.status(201)
        res.send(
            JSON.stringify(produto)
        )
    }catch (error) {
        next(error)
    }


})

roteador.put('/:idProduto', async (req, res) => {
    const idProduto = req.params.idProduto
    const novosDados = req.body
    const dados = Object.assign({}, novosDados, {id: idProduto})
    const produto = new Produto(dados)
    try {
        await produto.listarPorId()
        await produto.atualizar()
        res.status(204)
        res.end()
    } catch (error) {
        console.log(error)
    }
})

roteador.delete('/:idProduto', async (req, res) => {
    const dados = {
        id: req.params.idProduto,
        fornecedor: req.params.idFornecedor
    }
    const produto = new Produto(dados)

    try {
        await produto.listarPorId()
        await produto.deletar()
        res.status(204)
        res.end()
    } catch (error) {
        console.log(error)
    }
})


module.exports = roteador