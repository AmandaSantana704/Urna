let votoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.division-2');
let foto = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');

let listaAtual = 0;
let numero = '';
let votoBranco = false;

function exibirLista (){
     let lista = list[listaAtual];

     let numeroHtml = '';
     numero = '';
     votoBranco = false;
     

     for(let i=0;i<lista.numeros;i++) {
       if(i ===0) {
        numeroHtml += '<div class="number flash"></div>';
       } else {
        numeroHtml += '<div class="number"></div>';
       }
      
     }

     votoPara.style.display = 'none';
     cargo.innerHTML = lista.título;
     descricao.innerHTML =  '';
     aviso.style.display = 'none';
     foto.innerHTML = '';
     numeros.innerHTML = numeroHtml;
}

function atualizaInterface() {
   
  let lista = list[listaAtual];
  
  let candidato = lista.candidatos.filter((item) =>{
      if(item.numero === numero) {
        return true;
      } else {
        return false;
      }
   });
    if(candidato.length > 0){
      candidato = candidato[0];
      votoPara.style.display = 'block';
      aviso.style.display = 'block';
      descricao.innerHTML =  `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;

      let fotosHtml = '';
      for(let i in candidato.fotos) {
         if(candidato.fotos[i].small){
          fotosHtml += `<div class="photo small"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;

         } else{
          fotosHtml += `<div class="photo"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
         }
      }

      foto.innerHTML = fotosHtml;
    } else{
      votoPara.style.display = 'block';
      aviso.style.display = 'block';
      descricao.innerHTML = '<div class="voto-grande flash">VOTO NULO</div>';
    }
}

function clicou(n) {
  let elNumero = document.querySelector('.number.flash');
   if(elNumero !== null){
     elNumero.innerHTML = n;
     numero = `${numero}${n}`;

     elNumero.classList.remove('flash');
     if(elNumero.nextElementSibling !== null) {
     elNumero.nextElementSibling.classList.add('flash');
     } else {
       atualizaInterface();
     }

     

   }
}
 function branco(){
      numero = '';
      votoBranco = true;

      votoPara.style.display = 'block';
      aviso.style.display = 'block';
      numeros.innerHTML = '';
      descricao.innerHTML = '<div class="voto-grande flash">VOTO EM BRANCO</div>';
      foto.innerHTML = '';
 }

 function corrige() {
     exibirLista ();
 }

 function confirma(){
  let lista = list[listaAtual]; 

  let  votoConfirmado = false;

    if(votoBranco === true) {
      votoConfirmado = true;
      console.log("Confirmando voto em Branco");
    }else if(numero.length === lista.numeros) {
      votoConfirmado = true;
      console.log("Confirmando voto para "+numero);
    }
    if(votoConfirmado) {
      listaAtual++;
      if(list[listaAtual] !== undefined) {
        exibirLista();
      } else{
       document.querySelector('.screen').innerHTML = '<div class="voto-gigante flash">FIM</div>'
      }
    }
 }


 exibirLista();

