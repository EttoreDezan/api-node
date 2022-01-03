const TabelaFornecedor = require('../../banco-de-dados/DAO/TabelaFornecedores')
const CampoInvalido = require('../../tratamento-de-erros/CampoInvalido')
const NaoEncontrado = require('../../tratamento-de-erros/NaoEncontrado')
const DadosNaoFornecidos = require('../../tratamento-de-erros/DadosNaoFornecidos')
class Fornecedor {
    constructor({id, empresa, email, categoria, dataCriacao, dataAtualizacao, versao}) {
        this.id = id
        this.empresa = empresa
        this.email = email
        this.categoria = categoria
        this.dataCriacao = dataCriacao
        this.dataAtualizacao = dataAtualizacao
        this.versao = versao
    }
    async criar(){
        this.validar()
        const resultado = await TabelaFornecedor.cadastrar({
            empresa: this.empresa,
            email: this.email,
            categoria: this.categoria
        })
        this.id = resultado.id
        this.dataCriacao = resultado.dataCriacao
        this.dataAtualizacao = resultado.dataAtualizacao
        this.versao = resultado.versao
    }
    async buscarPorId() {
        try {
            const busca = await TabelaFornecedor.listarPorID(this.id)
            this.empresa = busca.empresa
            this.email = busca.email
            this.categoria = busca.categoria
            this.dataCriacao = busca.dataCriacao
            this.dataAtualizacao = busca.dataAtualizacao
            this.versao = busca.versao
        }catch (erro) {
            throw new NaoEncontrado()
        }
    }
    async editarPorId() {
        await TabelaFornecedor.listarPorID(this.id)
        const campos = ['empresa', 'email', 'categoria']
        const dadosParaAtualizar = {}
        campos.forEach((campo) => {
            const valor = this[campo]
            if(typeof valor === 'string' && valor.length > 0) {
                dadosParaAtualizar[campo] = valor
            }
        })
        if(Object.keys(dadosParaAtualizar).length === 0) {
            throw new DadosNaoFornecidos()
        }
        return await TabelaFornecedor.editarPorId(this.id, dadosParaAtualizar)

    }

    async removerPorId() {
        return await TabelaFornecedor.deletar(this.id)
    }

    validar() {
        const campos = ['empresa', 'email', 'categoria']
        campos.forEach((campo) => {
            const valor = this[campo]
            if(typeof valor !== 'string' || valor.length === 0) {
                throw new CampoInvalido(campo)
            }
        })
    }
}

module.exports = Fornecedor