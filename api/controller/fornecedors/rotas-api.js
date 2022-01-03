const roteador = require('express').Router()
const TabelaFornecedor = require('../../banco-de-dados/DAO/TabelaFornecedores')
const Fornecedor = require('./Fornecedor')
const SerializadorFornecedor = require('../../Serializador').SerializadorFornecedor

roteador.get('/', async (req, res) => {
    const resultados = await TabelaFornecedor.listar()
    res.status(200)
    const serializador = new SerializadorFornecedor(
        res.getHeader('Content-Type')
    )
    res.send(serializador.serializar(resultados))
})
roteador.get('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id)
    const fornecedor = new Fornecedor({id: id})
    try {
        await fornecedor.buscarPorId()
        res.status(200)
        const serializador = new SerializadorFornecedor(
            res.getHeader('Content-Type'), ['email', 'dataAtualizacao', 'versao']
        )
        res.send(serializador.serializar(fornecedor))
    } catch (erro) {
        next(erro)
    }
})

roteador.post('/', async (req, res,next) => {
    const dadosRecebidos = req.body
    const fornecedor = new Fornecedor(dadosRecebidos)
    try {
        await fornecedor.criar()
        res.send(JSON.stringify(fornecedor))
        res.status(201)
        const serializador = new SerializadorFornecedor(
            res.getHeader('Content-Type')
        )
        res.send(serializador.serializar(fornecedor))
    } catch (erro) {
        next(erro)
    }
})

roteador.put('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id)
    const dadosRecebidos = req.body
    const dadosCompletos = Object.assign({}, dadosRecebidos, {id: id})
    const fornecedor = new Fornecedor(dadosCompletos)

    try {
        await fornecedor.buscarPorId()
        await fornecedor.editarPorId()
        res.status(204)
        res.end()
    } catch (erro) {
        next(erro)
    }
})

roteador.delete('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id)
    const fornecedor = new Fornecedor({id: id})
    try {
        await fornecedor.buscarPorId()
        await fornecedor.removerPorId()
        res.status(204)
        res.end()
    } catch (erro) {
        next(erro)
    }
})
const roteadorProdutos = require ('../produtos/rotas-api')
roteador.use('/:idFornecedor/produtos', roteadorProdutos)

module.exports = roteador