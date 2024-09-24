const planilha = require('./planilha.json');


function contar(arr_objeto,questao,opcao){ //Retorna um Objeto com a quantidade de da opcao e a opcao
  var c = 0;
  for(x of arr_objeto){
    if(x[questao]==opcao){
      c++;
    }
  }
  return {y:parseInt(c),label:opcao}
}

function checar(arr,opcao){// Checa se existe a opcao dentro do grafico
  let check = true;
  for(x of arr){
    if(x['label']==opcao){
      check = false;
    }
  }
  return check;
}


function grafico(arr_objeto,questao){ // O array de Objetos para a leitura no Canvas
  let graf = [];
  for(x of arr_objeto){
    switch (x[questao]) {
      case 'Option 1':
        if(checar(graf,'Option 1')){
          graf.push(contar(arr_objeto,questao,'Option 1'));
        }
        break;
      case 'Option 2':
        if(checar(graf,'Option 2')){
          graf.push(contar(arr_objeto,questao,'Option 2'));
        }
        break;
      case 'Option 3':
        if(checar(graf,'Option 3')){
          graf.push(contar(arr_objeto,questao,'Option 3'));
        }
        break;
      case 'Option 4':
        if(checar(graf,'Option 4')){
            graf.push(contar(arr_objeto,questao,'Option 4'));
        }
        break;

    }
  }

  return graf;
}
module.exports = {grafico};
