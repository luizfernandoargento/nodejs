const EventEmitter = require('events')
// Importa a função do Node que "escuta" algo e executa uma função.
const fs = require('fs')
// Importa função do Node que trabalha com arquivos do sistema
const path = require('path')
// Importa função do Node que seleciona melhor caminho de acordo com sistema usado

const emitter = new EventEmitter()

emitter.on('log', (message) => {
    fs.appendFile(path.join(__dirname, 'log.txt'), message, err => {
        if (err) throw err
    })
    // "appendFile" escreve no arquivo a mensagem passada e executa função "err" no final.
    // "join" procura o melhor caminho do "__dirname" para o arquivo informado.
    // "__dirname" é uma constante informando o nome do diretório do sistema.
})
// Liga a escuta


function log(message){
    emitter.emit('log', message)
}
// Cria função para chamar a escuta e enviar a mensagem

module.exports = log
// Exporta a função "log" para outros arquivos acessarem