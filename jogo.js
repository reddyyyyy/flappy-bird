let frames = 0;
const som_HIT = new Audio;
som_HIT.src = './efeitos/hit.wav';
const som_PULO = new Audio;
som_PULO.src = './efeitos/pulo.wav';
const som_CAIU = new Audio;
som_CAIU.src = './efeitos/caiu.wav';
const som_PONTO = new Audio;
som_PONTO.src = './efeitos/ponto.wav';

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
  atualiza() {
    const mc =1;
    const repete = chao.largura / 2;
    const movi = chao.x -= mc;

    //console.log('chao.x', chao.x);
    //console.log('repete', repete);
    //console.log('movimento', movi % repete);

    chao.x = movi % repete;
  },
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

      som_CAIU.play();
      console.log('Caiu!')
      fb.y = 50,
      fb.x = 0,
      fb.vel = 0,
      canos.pares.shift();
      mudartela(telas.INICIO);
      return;
    };
    if (fazColisaoCeu(fb)) {
      console.log('Foi pro céu!')
      som_CAIU.play();
      fb.y = 50,
      fb.x = 0,
      fb.vel = 0,
      canos.pares.shift();
      mudartela(telas.INICIO);
    };
    fb.vel += fb.gravidade;
    fb.y += fb.vel;
  },
  pula() {
    console.log('pulo!');
    som_PULO.play();
    fb.vel = - fb.pulo;
  },
  movimentos: [
    { sX: 0, sY: 0,},
    { sX: 0, sY: 26,},
    { sX: 0, sY: 52,},
  ],
  frameAtual: 0,
  atualizaFrame() {
    const intervalo = 10;
    const passouIntervalo = frames % intervalo === 0;

    if (passouIntervalo) {
      const baseIncremento = 1;
      const incremento = baseIncremento+ this.frameAtual;
      const baseRepetisao = fb.movimentos.length;
      this.frameAtual = incremento % baseRepetisao;
    };
  },
  desenha() {
    this.atualizaFrame();
    const { sX, sY } = this.movimentos[this.frameAtual];
    ctx.drawImage(
      sprites,
      sX, sY, 
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

//canos
const canos = {
    largura: 52,
    altura: 400,
    chao: {
      sX: 0,
      sY: 169,
    },
    ceu: {
      sX: 52,
      sY: 169,
    },
    espaco: 80,
    pares: [],
    desenha() {
      canos.pares.forEach(function(par) {
        const yRandom = par.y;
        const espacamento = 90;
  
        const canoCeuX = par.x;
        const canoCeuY = yRandom;
  
        // cano do céu
      ctx.drawImage(
        sprites,
        canos.ceu.sX, canos.ceu.sY,
        canos.largura, canos.altura,
        canoCeuX, canoCeuY,
        canos.largura, canos.altura,
     );

     const canoChaoX = par.x;
      const canoChaoY = canos.altura + espacamento + yRandom;
      // cano do chão
      ctx.drawImage(
        sprites,
        canos.chao.sX, canos.chao.sY,
        canos.largura, canos.altura,
        canoChaoX, canoChaoY,
        canos.largura, canos.altura,
     );

     par.canoCeu = {
        x: canoCeuX,
        y: canos.altura + canoCeuY,
     }
     par.canoChao = {
       x: canoChaoX,
       y: canoChaoY,
     }
      });
    },
    temColisaoComOFb(par) {
      const CFB = fb.y;
      const PFB = fb.y + fb.altura;
      if (fb.x >= par.x) {
        //console.log('o flappy entrou nos canos');
        if(CFB <= par.canoCeu.y) {
          return true;
        };

        if (PFB >= par.canoChao.y) {
          return true;
        };
      };

      return false
    },
    atualiza() {
      const p100f = frames % 100 === 0;
      if (p100f) {
        console.log('passou dos 100 frames');
        canos.pares.push({
          x: canvas.width,
          y: -150 * (Math.random() + 1),
        });
      };

      canos.pares.forEach(function(par) {
        par.x -= 2;

        if(canos.temColisaoComOFb(par)) {
          console.log('fez colisão');

          som_HIT.play();
          fb.x = 10;
          fb.y = 50;
          fb.vel = 0;
          canos.pares.shift();
          mudartela(telas.INICIO);
          return;
        };

        if(par.x + canos.largura <= 0) {
          canos.pares.shift();
        };
      });
    },
};


// telas
const globais = {}; // variavel inutil
let telaAtiva = {};
function mudartela(novatela) {
  telaAtiva = novatela;
};
const telas = {
  INICIO: {
    desenha() {
      planoDeFundo.desenha();
      fb.desenha();
      mgr.desenha();
      chao.desenha();
    },
    atualiza() {
      chao.atualiza();
    },
    click() {
      mudartela(telas.JOGO);
    },
  },
};
telas.JOGO = {
  desenha(){
    planoDeFundo.desenha();
    canos.desenha();
    chao.desenha();
    fb.desenha();
  },
  click() {
    fb.pula();
  },
  atualiza(){
    canos.atualiza();
    fb.atualiza();
    chao.atualiza();
  },
};

function fazColisaoCeu(fb) {
  if (fb.y <= 0) {
    return true;
  };
  return false;
};

function loop() {
  telaAtiva.desenha();
  telaAtiva.atualiza();

  frames++;
  requestAnimationFrame(loop);
};
window.addEventListener('click', function(){
  if (telaAtiva.click) {
    telaAtiva.click();
  };
});
mudartela(telas.INICIO);
loop();
