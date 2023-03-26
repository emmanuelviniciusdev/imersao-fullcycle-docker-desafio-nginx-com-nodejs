const express = require('express')
const mysql = require('mysql')

const app = express()

const databaseConfig = {
    host: 'node-database',
    user: 'root',
    password: 'root',
    database: 'node-database',
}

const databaseConnection = mysql.createConnection(databaseConfig)

databaseConnection.query(`CREATE TABLE IF NOT EXISTS people (id int primary key auto_increment, name varchar(255))`)

databaseConnection.query("INSERT INTO people (name) VALUES ('Elke Musek')")
databaseConnection.query("INSERT INTO people (name) VALUES ('Hayley Williams')")

app.get('/', (req, res) => {
    databaseConnection.query("SELECT * FROM people", (err, result, _) => {
        const nomesPessoas = !err ? result.map(row => row.name) : []
        
        const nomesPessoasHtml = nomesPessoas.length === 0
            ? "<b style='color: red'>Ocorreu um erro ao tentar obter os nomes das pessoas do banco de dados</b>"
            : `
                <ul>
                    ${nomesPessoas.map(name => `<li>${name}</li>`).join('')}
                </ul>
            `;

        res.send(`<h1>Full Cycle Rocks!</h1> ${nomesPessoasHtml}`)
    })
})

app.listen(3000, () => console.log("Running at port 3000"))
