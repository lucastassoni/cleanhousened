
const express = require('express');
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors());


function connect() {
    console.log("entrou em connect()");
    if (global.connection && global.connection.state !== "disconnected")
        return global.connection;
    const mysql = require("mysql2");
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'cleanhouse'
    });

    global.connection = connection;
    console.log("Conectado!");
    return connection;
}




app.get("/listarCadastro", (req, res) => {
    console.log("Entrou na rota /cadastro para pegar todos os cadastros");
    const conn = connect();

    const sql = 'SELECT * FROM usuario;';


    conn.query(sql, (err, rows, fields) => {
        res.send(rows);
    });

});


app.post("/inserirCadastro", (req, res) => {
    console.log("Entrou na rota /inserirCadastro para inserir o cadastro digitado");
    const conn = connect();

    const sql = "INSERT INTO usuario (nome, sobrenome, email, senha, telefone, cpf, tipo_usuario) VALUES (?,?,?,?,?,?,?)";

    const recebido = req.body;

    const valores = [recebido.nome, recebido.sobrenome, recebido.email, recebido.senha, recebido.telefone, recebido.cpf, recebido.tipo_usuario];

    if (recebido.nome != "" && recebido.sobrenome != "" && recebido.email != "" && recebido.senha != "" && recebido.telefone != "" && recebido.cpf != "" && recebido.tipo_usuario != "")
        conn.query(sql, valores, function (err, result) {
            if (err) throw err;
            console.log(result);
        });
});


app.post("/login", (req, res) => {
    console.log("Entrou na rota /login para verificar o login do usuário");
    const conn = connect();

    const email = req.body.email;
    const senha = req.body.senha;

    if (!email.trim() || !senha.trim()) {
        res.status(400).send({ autenticado: false, mensagem: "Por favor, preencha o email e a senha." });
        return;
    }

    const sql = 'SELECT * FROM usuario WHERE email = ? AND senha = ?';

    conn.query(sql, [email, senha], (err, rows, fields) => {
        if (err) {
            console.error(err);
            res.status(500).send({ autenticado: false, mensagem: "Erro interno do servidor" });
        } else {
            if (rows.length === 0) {
                res.status(401).send({ autenticado: false, mensagem: "Email ou senha incorretos" });
            } else {
                res.status(200).send({ autenticado: true, mensagem: "Login bem-sucedido" });
            }
        }
    });
});






app.listen(3000, () => console.log('SERVIDOR RODANDO'));

