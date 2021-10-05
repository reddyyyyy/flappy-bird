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

const fb = {
  spriteX: 0,
  spriteY: 0,
  largura: 33,
  altura: 24,
  x: 10,
  y: 50,
  vel: 0,
  gravidade: 0.13,
  atualiza() {
    fb.vel += fb.gravidade;
    fb.y += fb.vel;
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

/// menssagem inicial
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

function loop() {
  planoDeFundo.desenha();
  chao.desenha();
  fb.desenha();
  fb.atualiza();
  mgr.desenha();
  requestAnimationFrame(loop);
};

loop();