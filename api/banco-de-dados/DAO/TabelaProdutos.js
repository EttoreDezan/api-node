const Modelo = require('../modelos-tabelas/ModeloTabelaProduto')

module.exports = {
    listar(idFornecedor) {
        return Modelo.findAll({
            where: {fornecedor :idFornecedor}
        })
    },
    cadastrar(produto) {
      return Modelo.create(produto)
    },
    listarPorId(idProduto) {
        return Modelo.findOne({where: {id: idProduto}})
    },
    deletar(idProduto, idFornecedor) {
        return Modelo.destroy({where: {id: idProduto, fornecedor: idFornecedor}})
    },
    atualizar(id, produto) {
        return Modelo.update(produto, {where: {id: id}})
    }
}