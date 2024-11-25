var trapaca, nome, fichas = 0;
let invisivel = document.getElementById('invi').style.display = "none";
let visiFichas = document.getElementById('fichas').style.display = "none";
let fichasApostada;
let limiteAposta = 0;
let contagem = 0;
let inviTabela = document.getElementById('tabela').style.display = "none";
const imagens = [
  "./assets/img/slots-berry.png",
  "./assets/img/slots-grape.png",
  "./assets/img/slots-lime.png",
  "./assets/img/slots-seven.png"
];

// Função para cadastrar usuário
function cadastrar() {
  nome = document.getElementById('nome').value;
  document.getElementById('nomeUsuario').innerHTML = nome;
  document.getElementById('invi').style.display = "block";
}

// Função para atualizar fichas na tela
function atualizarFichas() {
  document.getElementById('fichasDep').innerHTML = fichas;
}

// Função para depositar fichas
function depositar() {
  const valorDeposito = parseInt(document.getElementById('dep').value);
  if (valorDeposito > 0) {
    fichas += valorDeposito;
    document.getElementById('fichas').style.display = "block";
    atualizarFichas();
  } else {
    alert('Deposite um valor maior que zero');
  }
}

// Função para sortear números aleatórios
function sortear() {
  return Math.floor(Math.random() * 4);
}

// Função para capturar o valor do radio button de trapaça
function capRadioTrapaca() {
  const capTrapaca = document.querySelector('input[name="trapaca"]:checked');
  trapaca = capTrapaca ? capTrapaca.value : "não";
}

// Função para realizar uma aposta
function apostar() {
  limiteAposta++;
  contagem++;
  document.getElementById('tabela').style.display = "block";
  capRadioTrapaca();
  fichasApostada = parseInt(document.getElementById('fichasApostada').value);
  let msg = document.getElementById('msg');
  let tbody = document.querySelector('tbody');

  if (limiteAposta >= 7) {
    tbody.innerHTML = "";
    limiteAposta = 0;
  }

  if (trapaca === 'sim') {
    const numSorteado = sortear();
    exibirRolos(numSorteado, numSorteado, numSorteado);
    atualizarFichas();
    exibirResultado(tbody, contagem, fichasApostada, "Trapaça", fichasApostada, true);
    msg.innerHTML = `Parabéns ${nome}, Você ganhou Usando Trapaça!`;
    return;
  }

  if (fichas >= fichasApostada && fichasApostada > 0) {
    const numSorteado1 = sortear();
    const numSorteado2 = sortear();
    const numSorteado3 = sortear();
    exibirRolos(numSorteado1, numSorteado2, numSorteado3);

    if (numSorteado1 === numSorteado2 && numSorteado1 === numSorteado3) {
      fichas += fichasApostada;
      atualizarFichas();
      exibirResultado(tbody, contagem, fichasApostada, "Ganhou", fichasApostada, true);
      msg.style.color = "#23b505";
      msg.innerHTML = `${nome}, Você Ganhou!!!`;
    } else {
      fichas -= fichasApostada;
      atualizarFichas();
      exibirResultado(tbody, contagem, fichasApostada, "Perdeu", -fichasApostada, false);
      msg.style.color = "#fa0000";
      msg.innerHTML = `${nome}, Você Perdeu!!!`;
    }
  } else {
    atualizarFichas();
    alert("Aposte algumas fichas!!!\nSaldo de fichas insuficiente!!!\nDeposite mais Fichas");
  }
}

// Função para exibir os rolos
function exibirRolos(num1, num2, num3) {
  document.getElementById('rolo1').src = imagens[num1];
  document.getElementById('rolo2').src = imagens[num2];
  document.getElementById('rolo3').src = imagens[num3];
}

// Função para exibir resultado da aposta e atualizar fichas
function exibirResultado(tbody, contagem, valorApostado, resultadoTexto, valorGanho, ganhou) {
  const linha = document.createElement('tr');
  linha.classList.add(ganhou ? "table-success" : "table-danger");

  linha.appendChild(criarCelula(contagem));
  linha.appendChild(criarCelula(valorApostado));
  linha.appendChild(criarCelula(resultadoTexto));
  linha.appendChild(criarCelula(valorGanho > 0 ? `+${valorGanho}` : `${valorGanho}`));

  tbody.appendChild(linha);
}

// Função auxiliar para criar células de tabela
function criarCelula(conteudo) {
  const celula = document.createElement('td');
  celula.innerHTML = conteudo;
  return celula;
}