var trapaca,nome,fichas;
let invisivel = document.getElementById('invi').style.display="none";
let visiFichas = document.getElementById('fichas').style.display="none";
fichas =0;
let fichasApostada;
function cadastrar(){
  nome  =  document.getElementById('nome').value;
  document.getElementById('nomeUsuario').innerHTML = nome;
  invisivel = document.getElementById('invi').style.display="block";
}
function atualiazarFichas(){
  document.getElementById('fichasDep').innerHTML = fichas;
}
function depositar(){
  if(document.getElementById('dep').value <=0){
    alert(`Deposite um valor maior que zero`);
  }else{

    fichas += parseInt(document.getElementById('dep').value);
    visiFichas = document.getElementById('fichas').style.display="block";
    document.getElementById('fichasDep').innerHTML = fichas;
  }
}
const imagens = [
  "./assets/img/slots-berry.png",
  "./assets/img/slots-grape.png",
  "./assets/img/slots-lime.png",
  "./assets/img/slots-seven.png"
]
function sortear(){
  return Math.floor(Math.random() * 4)+1;
}

function capRadioTrapaca(){
  const capTrapaca =  document.querySelector('input[name="trapaca"]:checked');
  trapaca = capTrapaca.value;
}
let limiteAposta = 0;
let inviTabela = document.getElementById('tabela').style.display="none";
let contagem=0;
function apostar(){
  limiteAposta++;
  contagem++;
  inviTabela = document.getElementById('tabela').style.display="block"
  let msg =  document.getElementById('msg');
  capRadioTrapaca();
  fichasApostada = document.getElementById('fichasApostada').value;
  let numSorteado1,numSorteado2,numSorteado3;
  let rolo1,rolo2,rolo3;
  let tbody = document.querySelector('tbody');
  let linha = document.createElement('tr');
  let nAposta = document.createElement('td');
  let valorApostado = document.createElement('td');
  let resultado = document.createElement('td');
  let valorGanho = document.createElement('td');
  nAposta.innerHTML = contagem;
  valorApostado.innerHTML = fichasApostada;
  if(limiteAposta>=7){
    tbody.innerHTML = "";
    limiteAposta=0;
  }
  if(trapaca =='sim'){
    const numSorteado = sortear();
     rolo1 = document.getElementById('rolo1').src = imagens[numSorteado -1];
     rolo2 = document.getElementById('rolo2').src = imagens[numSorteado -1];
     rolo3 = document.getElementById('rolo3').src = imagens[numSorteado -1];
     atualiazarFichas();
     msg.innerHTML = `Parabens ${nome} Você ganhou Usando Trapaça`
     resultado.innerHTML = "Trapaça"
     
     
  }else{
    if(fichas>=fichasApostada && fichasApostada !=0){
    
    numSorteado1 = sortear();
    rolo1 = document.getElementById('rolo1').src = imagens[numSorteado1 -1];
    
    
    numSorteado2 = sortear();
    rolo2 = document.getElementById('rolo2').src = imagens[numSorteado2 -1];    
    
    numSorteado3 = sortear();
    rolo3 = document.getElementById('rolo3').src = imagens[numSorteado3 -1];
      
      if(numSorteado1 == numSorteado2 && numSorteado1 == numSorteado3){
        fichasApostada *= 2;
        fichas +=fichasApostada;
        atualiazarFichas();
        msg.style.color="#23b505";
        msg.innerHTML = `${nome} Você Ganhou!!!`;
        resultado.innerHTML = "Ganhou"
        valorGanho.innerHTML = `+${fichasApostada}`;
        linha.classList.add("table-success")
        linha.appendChild(nAposta);
        linha.appendChild(valorApostado);
        linha.appendChild(resultado);
        linha.appendChild(valorGanho);
        tbody.appendChild(linha);
        if(nAposta<=6){
          linha.removeEventListener
        }
      }else{
        fichas -=fichasApostada;
        atualiazarFichas();
        msg.style.color="#fa0000";
        msg.innerHTML = `${nome} Você Perdeu!!!`;
        resultado.innerHTML = "Perdeu"
        valorGanho.innerHTML = `-${fichasApostada}`;
        linha.classList.add("table-danger")
        linha.appendChild(nAposta);
        linha.appendChild(valorApostado);
        linha.appendChild(resultado);
        linha.appendChild(valorGanho);
        tbody.appendChild(linha);
      }
      
    }else{
      atualiazarFichas();
        alert("Aposte algumas fichas!!!\nSaldo de fichas insuficiente!!!\nDeposite mais Fichas");
      }
  }
}

//TODO: fazer uma um H2 que sinalize que o jogador ganhou com a trapaça ativa
//TODO: fazer uma tabela que sinaliza os ganhos e perda so jogador com o textos vermrlho ou verde dependendo se ganhou ou nao