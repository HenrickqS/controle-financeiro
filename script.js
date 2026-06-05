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
let ultimasTransacoes = [];


const transacoesSalvas = localStorage.getItem('transacoes');

if (transacoesSalvas) {
    ultimasTransacoes = JSON.parse(transacoesSalvas);

    ultimasTransacoes.forEach(function(transacao) {
        adicionarAoHistorico(transacao.descricao, transacao.valor, transacao.tipo);
        
        const valorLimpo = transacao.valor.replace(/\D/g, '');
        const valorNumero = Number(valorLimpo) / 100;
        
        if (transacao.tipo === 'entrada') {
            saldoTotal += valorNumero;
            saldoEntrada += valorNumero;
        } else {
            saldoTotal -= valorNumero;
            saldoSaida += valorNumero;
        }
    });
    

    elementoSaldo.innerText = saldoTotal.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    elementoEntrada.innerText = saldoEntrada.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    elementoSaida.innerText = saldoSaida.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
}


btnEntrada.addEventListener('click', function(){
  const valorLimpo = valor.value.replace(/\D/g, '');
  const adicionarSaldo = Number(valorLimpo) / 100;

  if (descricao.value.trim() === '' || valor.value.trim() === '') {
    alert('Por favor, preencha a descrição e o valor!');
    return;
  }

  saldoTotal = saldoTotal + adicionarSaldo;
  saldoEntrada = saldoEntrada + adicionarSaldo;

  elementoSaldo.innerText = saldoTotal.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
  elementoEntrada.innerText = saldoEntrada.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});


  ultimasTransacoes.push({
    id: Date.now(),
    descricao: descricao.value,
    valor: valor.value,
    tipo: 'entrada'
  });
  localStorage.setItem('transacoes', JSON.stringify(ultimasTransacoes));

  adicionarAoHistorico(descricao.value, valor.value, 'entrada');

  descricao.value = '';
  valor.value = '';
  descricao.focus();
});


btnSaida.addEventListener('click', function(){
  const valorLimpo = valor.value.replace(/\D/g, '');
  const DiminuirSaldo = Number(valorLimpo) / 100;

  if (descricao.value.trim() === '' || valor.value.trim() === '') {
    alert('Por favor, preencha a descrição e o valor!');
    return;
  }

  saldoTotal = saldoTotal - DiminuirSaldo;
  saldoSaida = saldoSaida + DiminuirSaldo;

  elementoSaldo.innerText = saldoTotal.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
  elementoSaida.innerText = saldoSaida.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
  

  ultimasTransacoes.push({
    id: Date.now(),
    descricao: descricao.value,
    valor: valor.value,
    tipo: 'saida'
  });
  localStorage.setItem('transacoes', JSON.stringify(ultimasTransacoes));

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

    let seta = tipo === 'entrada' ? '<i data-lucide="arrow-up-right"></i>' : '<i data-lucide="arrow-down-left"></i>';
    let tipoFormatado = tipo === 'entrada' ? 'Entrada' : 'Saída';
    let sinal = tipo === 'entrada' ? '+' : '-';

    novoItem.innerHTML = 
      `<div class="coluna-esquerda">
      <div class = "circulo-seta">${seta}</div>
      <span class='descricao-texto'>${textoDescricao}</span>
      </div>
      <span class='tipo-texto'>${tipoFormatado}</span>
      <div class='coluna-direita'>
      <span class=valor-texto>${sinal} ${textoValor}</span>
      <button class="btn-deletar"><i data-lucide="trash-2"></i></button>
      </div>`;
      
    novoItem.classList.add('item-transacao');

    if (tipo === 'entrada') {
      novoItem.classList.add('cor-entrada');
    } else {
      novoItem.classList.add('cor-saida');
    }

    historico.appendChild(novoItem);
    lucide.createIcons();
  
    const btndeletar = novoItem.querySelector('.btn-deletar');

    btndeletar.addEventListener('click', function() {
        novoItem.remove();

        const valorNumerico = Number(textoValor.replace(/\D/g, '')) / 100;

        if (tipo === 'entrada') {
          saldoTotal = saldoTotal - valorNumerico;
          saldoEntrada = saldoEntrada - valorNumerico;
        } else {
          saldoTotal = saldoTotal + valorNumerico;
          saldoSaida = saldoSaida - valorNumerico;
        }

        elementoSaldo.innerText = saldoTotal.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
        elementoEntrada.innerText = saldoEntrada.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
        elementoSaida.innerText = saldoSaida.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});

        ultimasTransacoes = ultimasTransacoes.filter(function(transacao) {
            return transacao.descricao !== textoDescricao || transacao.valor !== textoValor;
        });
        localStorage.setItem('transacoes', JSON.stringify(ultimasTransacoes));
    });
}