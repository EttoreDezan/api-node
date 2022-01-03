const Sequelize = require('sequelize')
const conexaoBancoSql = require('../conexao-banco')

const colunas = {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    preco: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    estoque: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    fornecedor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: require('./ModeloTabelaFornecedor'),
            key: 'id'
        }
    }
}
const opcoes = {
    freezeTableName: true,
    lastName: 'produtos',
    timestamps: true,
    createdAt: 'dataCriacao',
    updadedAt: 'dataAtualizacao',
    version: 'versao'
}

module.exports = conexaoBancoSql.define('produtos', colunas, opcoes)