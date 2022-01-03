const Modelo = require('../modelos-tabelas/ModeloTabelaFornecedor')
module.exports = {
    listar () {
        return Modelo.findAll({raw: true})
    },
    async listarPorID(id) {
        return Modelo.findOne({where: {id: id}})
    },
    cadastrar(fornecedor) {
       return Modelo.create(fornecedor)
    },
    async editarPorId(id, dados) {
      return  Modelo.update(dados, {where: {id: id}})
    },
    deletar(id) {
      return Modelo.destroy({where: {id: id}})
    }
}