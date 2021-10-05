const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');


// background
const planoDeFundo = {
  spriteX: 390,
  spriteY: 0,
  largura: 275,
  altura: 204,
  x: 0,
  y: canvas.height - 204,
  desenha() {
    ctx.fillStyle = '#70c5ce';
    ctx.fillRect(0,0, canvas.width, canvas.height);

    ctx.drawImage(
      sprites,
      planoDeFundo.spriteX, planoDeFundo.spriteY,
      planoDeFundo.largura, planoDeFundo.altura,
      planoDeFundo.x, planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura,
    );

    ctx.drawImage(
      sprites,
      planoDeFundo.spriteX, planoDeFundo.spriteY,
      planoDeFundo.largura, planoDeFundo.altura,
      (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura,
    );
  },
};

// Chão
const chao = {
  spriteX: 0,
  spriteY: 610,
  largura: 224,
  altura: 112,
  x: 0,
  y: canvas.height - 112,
  desenha() {
    ctx.drawImage(
      sprites,
      chao.spriteX, chao.spriteY,
      chao.largura, chao.altura,
      chao.x, chao.y,
      chao.largura, chao.altura,
    );

    ctx.drawImage(
      sprites,
      chao.spriteX, chao.spriteY,
      chao.largura, chao.altura,
      (chao.x + chao.largura), chao.y,
      chao.largura, chao.altura,
    );
  },
};

function fazColisao(fb, chao) {
  const fbY = fb.y + fb.altura;
  const chaoY = chao.y;

  if (fbY >=  chaoY) {
    return true;
  };

  return false;
};


function criaFB() {

};
const fb = {
  spriteX: 0,
  spriteY: 0,
  largura: 33,
  altura: 24,
  x: 10,
  y: 50,
  vel: 0,
  gravidade: 0.13,
  pulo: 4.6,
  atualiza() {
    if(fazColisao(fb, chao)) {
      console.log('fez colisão');

      mudartela(telas.INICIO);
      return;
    };


    fb.vel += fb.gravidade;
    fb.y += fb.vel;
  },
  pula() {
    console.log('pulo!');
    fb.vel = - fb.pulo;
  },
  desenha() {
    ctx.drawImage(
      sprites,
      fb.spriteX, fb.spriteY, 
      fb.largura, fb.altura, 
      fb.x, fb.y,
      fb.largura, fb.altura,
    );
  },
};

/// tela inicial
const mgr = {
  spriteX: 134,
  spriteY: 0,
  largura: 174,
  altura: 152,
  x: (canvas.width / 2) - 174 / 2,
  y: 50,
  desenha() {
    ctx.drawImage(
      sprites,
      mgr.spriteX, mgr.spriteY, 
      mgr.largura, mgr.altura, 
      mgr.x, mgr.y,
      mgr.largura, mgr.altura,
    );
  },
};

// telas
let telaAtiva = {};
function mudartela(novatela) {
  telaAtiva = novatela;
};

const telas = {
  INICIO: {
    desenha() {
      planoDeFundo.desenha();
      chao.desenha();
      fb.desenha();
      mgr.desenha();
    },
    atualiza() {

    },
    click() {
      mudartela(telas.JOGO);
    },
  },
};

telas.JOGO = {
  desenha(){
    planoDeFundo.desenha();
    chao.desenha();
    fb.desenha();
  },
  click() {
    fb.pula();
  },
  atualiza(){
    fb.atualiza();
  },
};

function loop() {

  telaAtiva.desenha();
  telaAtiva.atualiza();

  requestAnimationFrame(loop);
};

window.addEventListener('click', function(){
  if (telaAtiva.click) {
    telaAtiva.click();
  };
});

mudartela(telas.INICIO);
loop();
