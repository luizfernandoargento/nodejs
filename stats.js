const os = require('os')
// Importar o comando "os" do NODE.
const log = require('./logger');
// Importa função do arquivo "logger.js"
// Nesse caso precisa usar no endereço "./", pois não é uma função nativa.

// console.log(os.platform())
// Quando executado no console, é o mesmo que usar no terminal "node os.platform()"

setInterval(() => {

    const { freemem, totalmem } = os
    // Extrai os comandos "freemem" e "totalmem" do "os", que são referentes a memória do sistema.
    // Mais fácil que usar: "const freemem = os.freemem

    //console.log( `${parseInt(freemem() / 1024 / 1024)} MB`, totalmem())
    // Converteu para inteiro e dividiu bytes em megabytes.
    // Usou template literals entre crase "`" (acento invertido) e $ para usar javascript em string.

    const total = parseInt(totalmem() / 1024 / 1024)
    const mem = parseInt(freemem() / 1024 / 1024)
    const percents = parseInt((mem / total) * 100)

    const stats = {
        free: `${mem} MB`,
        total: `${total} MB`,
        usage: `${percents}%`,
    }

    console.clear()
    // Limpa a tela
    console.log("   === PC STATS ===");
    console.table(stats);
    // Mostra no console em forma de tabela.

    log(`${JSON.stringify(stats)}\n`)
    // Converte o array "stats" em JSON, pulando uma linha em seguida

}, 1000)
// Arrow Function resume a função anônima "function() {...}" para "() => {...}"
// setInterval = função global que executa uma função a cada tempo, no caso 1 segundo (1000).


