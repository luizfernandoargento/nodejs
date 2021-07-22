const http = require('http')
const fs = require('fs')
const path = require('path')
// Módulos do Node

http.createServer((req, res) => {
// Cria um servidor escutando a porta 5000
    /*
    res.write('Hi')
    // Escreve no navegador "Hi"
    
    if(req.url === '/')
        return res.end('<h1>HomePage</h1>')
    // Se a URL for '/' (página principal), retorna mensagem

    if(req.url === '/contato')
        return res.end('<h1>Contato</h1>')
    */

    const file = req.url === '/' ? 'index.html' : req.url
    const filePath = path.join(__dirname, 'public', file)
    // Bons modos para indicar caminho do arquivo usando "path"
    const extname = path.extname(filePath)
    // Retorna apenas a extensão dos arquivos do projeto.

    const allowedFileTypes = ['.html', '.css', '.js']
    // cria array com todos os tipos de arquivo permitidos
    const allowed = allowedFileTypes.find(item => item == extname)

    if (!allowed) return

    fs.readFile(
    // Carrega arquivo da página
        filePath,
        (err, content) => {
            if(err) throw err
            res.end(content)
        }
        // Une o endereço do diretório padrão + pasta "public" + arquivo index.html
        // Retorna erro caso houver
    )

}).listen(5000, () => console.log('Server is running'))
// Pelo navegador podemos acessar o "localhost:5000".
// Ao sair do Node no terminal, encerra-se o servidor.