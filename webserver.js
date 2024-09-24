const express = require('express');
const bodyParser=require('body-parser');
const app=express();
const urlencoderParser=bodyParser.urlencoded({extended:false});
const exphbs=require('express-handlebars');
const graf=require('./graf.js');
const planilha = require('./planilha.json');
const integracao = require('./integ.js');

const PORT = process.env.PORT || 80;

app.engine("handlebars",exphbs.engine({defaultLayout:'main'}));
app.set('view engine','handlebars');

app.get('/', urlencoderParser, async function (req,res) {
  res.render('landingpage',{dados:graf.grafico(planilha,'Questao 1')});
});

app.get('/dados',urlencoderParser,async function (req,res) {
  res.send(graf.grafico(planilha,'Questao 1'));
});

app.listen(PORT);
console.log('Escutando na porta: ' + PORT);
