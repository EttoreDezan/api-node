const Tabela = require('../../banco-de-dados/DAO/TabelaProdutos')
class Produto {
    constructor({id, titulo, preco, estoque, fornecedor, dataCriacao, dataAtualizacao, versao}) {
        this.id = id
        this.titulo = titulo
        this.preco = preco
        this.estoque = estoque
        this.fornecedor = fornecedor
        this.dataCriacao = dataCriacao
        this.dataAtualizacao = dataAtualizacao
        this.versao = versao
    }
    validaCampos () {
        if(typeof this.titulo !== 'string' || this.titulo.length === 0) {
            throw new Error('O campo titulo está inválido!')
        }
        if(typeof this.preco !== 'number' || this.preco === 0) {
            throw new Error('O campo preço está inválido!')
        }
    }
    async criar () {
        this.validaCampos()
        const resultado = await Tabela.cadastrar({
            titulo: this.titulo,
            preco: this.preco,
            estoque: this.estoque,
            fornecedor: this.fornecedor
        })
        this.id = resultado.id
        this.dataCriacao = resultado.dataAtualizacao
        this.dataAtualizacao = resultado.dataAtualizacao
        this.versao = resultado.versao
    }

    async listarPorId () {
        const busca = await Tabela.listarPorId(this.id)
        this.titulo = busca.titulo
        this.preco = busca.preco
        this.estoque = busca.estoque
        this.fornecedor = busca.fornecedor
        this.dataCriacao = busca.dataAtualizacao
        this.dataAtualizacao = busca.dataAtualizacao
        this.versao = busca.versao
    }

    async atualizar() {
        this.validaCampos()
        const atualizar = await Tabela.atualizar(this.id, {
            titulo: this.titulo,
            preco: this.preco,
            estoque: this.estoque,
            fornecedor: this.fornecedor
        })
        this.titulo = atualizar.titulo
        this.preco = atualizar.preco
        this.estoque = atualizar.estoque
        this.fornecedor = atualizar.fornecedor
        this.dataCriacao = atualizar.dataAtualizacao
        this.dataAtualizacao = atualizar.dataAtualizacao
        this.versao = atualizar.versao
    }

    async deletar() {
        return await Tabela.deletar(this.id, this.fornecedor)
    }
}

module.exports = Produto