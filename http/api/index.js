const http = require('http')
const URL = require('url')
const fs = require('fs')
const path = require('path')
// Módulos Node
const data = require("./urls.json")

function writeFile(cb){
    fs.writeFile(
        path.join(__dirname, "urls.json"),
        JSON.stringify(data, null, 2),
        err => {
            if(err) throw err
            
            cb(JSON.stringify( {message: "ok"} ))
        }
    )
    // Escrever no arquivo "urls.json" no formato JSON e com 2 espaçamentos.
    // "cb" = callback
}

http.createServer((req, res) => {
// Cria um servidor escutando a porta 3000
    const { name, url, del } = URL.parse(req.url, true).query
    // Pega do navegador o GET convertendo em objeto Json
    // Ex: localhost:3000?name=Goggle&url=http://google.com&del=1

    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*'
    })
    // Permite ao navegador acessar outras portas (do 5000 para o 3000)
    // No navegador/console digite "fetch("http://localhost:3000").then((data) => data.json()).then((data) => console.log(data))"

    // Mostrar todos
    if(!name || !url)
        return res.end(JSON.stringify(data))
    
    // Deletar
    if(del) {
        data.urls = data.urls.filter(item => String(item.url) !== String(url))
        // Atualiza o array com todos os itens menos a url passada, deletando ela.
        return writeFile((message) => res.end(message))
        // Chama função e recupera a mensagem.
    }

    // Criar
    data.urls.push( {name, url} )
    return writeFile((message) => res.end(message))
    // Chama função e recupera a mensagem.

}).listen(3000, () => console.log('Api is running'))
// Pelo navegador podemos acessar o "localhost:3000".
// Ao sair do Node no terminal, encerra-se o servidor. Se não usar nodemon.
// Alterando "package.json" e adicionando "api": "nodemon api/index.js", podemos
// rodar o servidor pelo comando "npm run api"