const html = document.querySelector("html");

const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const title = document.querySelector(".app__title");
const btns = document.querySelectorAll(".app__card-button");
const musicaInput = document.getElementById("alternar-musica");
const musica = new Audio("/sons/luna-rise-part-one.mp3");
const pauseAudio = new Audio("/sons/pause.mp3");
const playAudio = new Audio("/sons/play.wav");
const doneAudio = new Audio("/sons/beep.mp3");
const startPause = document.querySelector("#start-pause");
const iniciarOuPausar = document.querySelector("#start-pause span");
const imgPause = document.querySelector(".app__card-primary-butto-icon");

let tempoDecorridoSegundos = 5;
let intervaloID = null;

focoBt.addEventListener("click", () => {
  alterarContexto("foco");
  focoBt.classList.add("active");
});

curtoBt.addEventListener("click", () => {
  alterarContexto("descanso-curto");
  curtoBt.classList.add("active");
});

longoBt.addEventListener("click", () => {
  alterarContexto("descanso-longo");
  longoBt.classList.add("active");
});

function alterarContexto(contexto) {
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `/imagens/${contexto}.png`);
  btns.forEach(function (contexto) {
    contexto.classList.remove("active");
  });

  switch (contexto) {
    case "foco":
      title.innerHTML = `Otimize sua produtividade,<br />
          <strong class="app__title-strong">mergulhe no que importa.</strong>`;
      console.log("foco");
      break;
    case "descanso-curto":
      title.innerHTML = `Que tal dar uma respirada?, <br />
          <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
      break;
    case "descanso-longo":
      title.innerHTML = `Hora de voltar à superficie ,<br />
          <strong class="app__title-strong">Faça um descanso longo!</strong>`;
      break;
    default:
      break;
  }
}
musica.loop = true;
musicaInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

const contagemRegressiva = () => {
  if (tempoDecorridoSegundos <= 0) {
    doneAudio.play();
    zerar();
    return;
  }
  tempoDecorridoSegundos -= 1;
  console.log("temporizador: " + tempoDecorridoSegundos);
};

startPause.addEventListener("click", iniciar);

function iniciar() {
  if (intervaloID) {
    imgPause.setAttribute("src", "/imagens/play_arrow.png");
    pauseAudio.play();
    zerar();
    return;
  } else playAudio.play();
  imgPause.setAttribute("src", "/imagens/pause.png");
  intervaloID = setInterval(contagemRegressiva, 1000);
  iniciarOuPausar.textContent = "Pausar";
}

function zerar() {
  clearInterval(intervaloID);
  iniciarOuPausar.textContent = "começar";
  intervaloID = null;
}
