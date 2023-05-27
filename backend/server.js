require("dotenv").config();
const express = require("express")
const mysql = require("mysql")
const cors = require("cors")
const userRouter = require("./command/router");
const path = require("path");
const bodyParser = require('body-parser');
const exp = require("constants");

const app = express()

// app.use(express.json({limit: '50mbS'}))
app.use(express())
app.use(cors())
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({extended: true }));
// app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.json());
app.use('', userRouter);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

/*
const db = mysql.createConnection({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
    connectionLimit: 50,
})


app.post("/login", (req, res) => {
    const sql = "SELECT * FROM login WHERE username = ? AND password = ?";
    const values = req.body;

    db.connect();
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Login Failed");
        return res.json(data);
    });
    db.end();

    res.send(200, { message: "Success"});
})

app.post("/signup", (req, res) => {
    const sql = "INSERT INTO user (username, password) VALUES (?, ?)";
    const values = req.body;

    db.connect();
    db.query(sql, [values], (err, data) => {
        if(err) return res.json(400, { message: "Signup Failed"});
        return res.json(data);
    });
    db.end();

    res.send(200, { message: "Success"});
})

app.get("/", (req, res) => {
    res.send("Test")
})
*/