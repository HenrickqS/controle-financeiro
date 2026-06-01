const elementoSaldo = document.getElementById('saldo-atual');
const elementoEntrada = document.getElementById('saldo-entradas');
const elementoSaida = document.getElementById('saldo-saidas');
const descricao = document.getElementById('input-descricao');
const valor = document.getElementById('input-valor');
const btnEntrada = document.getElementById('btn-entrada');
const btnSaida = document.getElementById('btn-saida');
const historico = document.getElementById('lista-transacoes');

let saldoTotal = 0.00;
let saldoEntrada = 0.00;
let saldoSaida = 0.00;

btnEntrada.addEventListener('click', function(){
  
  const valorLimpo = valor.value.replace(/\D/g, '');
  const adicionarSaldo = Number(valorLimpo) / 100;

  saldoTotal = saldoTotal+adicionarSaldo;
  saldoEntrada = saldoEntrada+adicionarSaldo;

  elementoSaldo.innerText = saldoTotal.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
  elementoEntrada.innerText = saldoEntrada.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});

  adicionarAoHistorico(descricao.value, valor.value, 'entrada');

  descricao.value = '';
  valor.value = '';
  descricao.focus();


});

btnSaida.addEventListener('click', function(){
  
  const valorLimpo = valor.value.replace(/\D/g, '');
  const DiminuirSaldo = Number(valorLimpo) / 100;

  saldoTotal = saldoTotal-DiminuirSaldo;
  saldoSaida = saldoSaida+DiminuirSaldo;

  elementoSaldo.innerText = saldoTotal.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
  elementoSaida.innerText = saldoSaida.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
  
  adicionarAoHistorico(descricao.value, valor.value, 'saida');
  
  descricao.value = '';
  valor.value = '';
  descricao.focus();


});

valor.addEventListener('input', function() {
   
  let apenasNumeros = valor.value.replace(/\D/g, '');

  if (apenasNumeros === '') {
    valor.value = '';
    return;
  }

  let valorNumero = Number(apenasNumeros) / 100;

  let valorFormatado = valorNumero.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});

  valor.value = valorFormatado;

});

 function adicionarAoHistorico(textoDescricao, textoValor, tipo) {
    
    const novoItem = document.createElement('li');

    let seta = tipo === 'entrada' ? '↑ ' : '↓ ';

    novoItem.innerText = `${seta}${descricao.value}, ${valor.value}`;
    novoItem.classList.add('item-transacao');

    if (tipo === 'entrada') {
      novoItem.classList.add('cor-entrada');
    }
    else {
      novoItem.classList.add('cor-saida');
    }

    historico.appendChild(novoItem);
  
  }
