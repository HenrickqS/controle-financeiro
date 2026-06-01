const elementoSaldo = document.getElementById('saldo-atual');
const elementoEntrada = document.getElementById('saldo-entradas');
const elementoSaida = document.getElementById('saldo-saidas');
const descricao = document.getElementById('input-descricao');
const valor = document.getElementById('input-valor');
const btnEntrada = document.getElementById('btn-entrada');
const btnSaida = document.getElementById('btn-saida');

let saldoTotal = 0.00;
let saldoEntrada = 0.00;
let saldoSaida = 0.00;

btnEntrada.addEventListener('click', function(){
  
  const adicionarSaldo = Number(valor.value);

  saldoTotal = saldoTotal+adicionarSaldo;
  saldoEntrada = saldoEntrada+adicionarSaldo;

  elementoSaldo.innerText = saldoTotal.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
  elementoEntrada.innerText = saldoEntrada.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});

});

btnSaida.addEventListener('click', function(){
  
  const DiminuirSaldo = Number(valor.value);

  saldoTotal = saldoTotal-DiminuirSaldo;
  saldoSaida = saldoSaida+DiminuirSaldo;

  elementoSaldo.innerText = saldoTotal.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
  elementoSaida.innerText = saldoSaida.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});

});