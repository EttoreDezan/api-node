const Sequelize = require('sequelize')
const conexaoBancoSql = require('../conexao-banco')

const colunas = {
    empresa: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    categoria: {
        type: Sequelize.ENUM( 'ração', 'brinquedos'),
        allowNull: false
    }
}
const opcoes = {
    freezeTableName: true,
    lastName: 'fornecedores',
    timestamps: true,
    createdAt: 'dataCriacao',
    updadedAt: 'dataAtualizacao',
    version: 'versao'
}
module.exports =  conexaoBancoSql.define('fornecedor', colunas, opcoes)