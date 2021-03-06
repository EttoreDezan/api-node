const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const NaoEncontrado = require('./tratamento-de-erros/NaoEncontrado')
const CampoInvalido = require('./tratamento-de-erros/CampoInvalido')
const DadosNaoFornecidos = require('./tratamento-de-erros/DadosNaoFornecidos')
const ValorNaoSuportado = require('./tratamento-de-erros/ValorNaoSuportado')
const formatosAceitos = require('./Serializador').formatosAceitos
const SerializadorErro = require('./Serializador').SerializadorErro

app.use(bodyParser.json())

app.use((req, res, next) => {
    let formatoRequisitado = req.header('Accept')
    if(formatoRequisitado === '*/*') {
        formatoRequisitado = 'application/json'
    }
    if(formatosAceitos.indexOf(formatoRequisitado) === -1){
        res.status(406)
        res.end()
        return
    }
    res.setHeader('Content-Type', formatoRequisitado)
    next()
})

const roteador = require('./controller/fornecedors/rotas-api')
app.use('/api/fornecedores', roteador)

app.use((erro, req, res, next) => {
    let status = 500
    if (erro instanceof NaoEncontrado) {
        status = 404
    }

    if(erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos) {
       status = 404
    }
    if(erro instanceof ValorNaoSuportado) {
        status = 406
    }

    const serializador = new SerializadorErro(
        res.getHeader('Content-Type')
    )
    res.status(status)
    res.send(serializador.serializar({mensagem: erro.message, id: erro.idErro}))
})

app.listen(config.get('api.porta'), () => console.log('Api em funcionamente na porta 3000'))