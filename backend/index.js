require("dotenv").config();
const express = require("express")
const mysql = require("mysql")
const cors = require("cors")
const userRouter = require("./command/router");
const path = require("path");
const bodyParser = require('body-parser');
const exp = require("constants");
const { uploadTeam } = require("./command/scheduler");

const app = express()

// app.use(express.json({limit: '50mbS'}))
app.use(express())
app.use(cors({
    origin:[
        "http://localhost:3000",
        "https://footycouch.vercel.app"
    ]
}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({extended: true }));
// app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.json());
app.use('', userRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

uploadTeam();

// Checking time zone
const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

console.log('Current backend timezone:', currentTimezone);