const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const requireDir = require('require-dir');


//Inicio app
const app = express();
app.use(express.json());
app.use(cors());

//Inicia banco
mongoose.connect('mongodb://localhost:27017/Node',
    {useUnifiedTopology: true, useNewUrlParser: true });

requireDir('./src/models');

//Primeira rota
app.use('/api', require('./src/routes'));

app.listen(3001);