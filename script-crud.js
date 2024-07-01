const btnAdicionarTarefa = document.querySelector(".app__button--add-task");
const formAdicionarTarefa = document.querySelector(".app__form-add-task");
const textArea = document.querySelector(".app__form-textarea");
const ulTarefas = document.querySelector(".app__section-task-list");
const paragrafoDescTarefa = document.querySelector(
  ".app__section-active-task-description"
);

const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
let tarefaSelecionada = null;
let litarefaSelecionada = null;

function criarTarefa(tarefa) {
  const li = document.createElement("li");
  li.classList.add("app__section-task-list-item");

  function atualizarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }
  const svg = document.createElement("svg");
  svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `;

  const paragrafo = document.createElement("p");
  paragrafo.textContent = tarefa.descricao;
  paragrafo.classList.add("app__section-task-list-item-description");

  const botao = document.createElement("button");
  botao.classList.add("app_button-edit");

  botao.onclick = () => {
    const novaDesc = prompt("Qual é o novo nome da tarefa?");
    if (novaDesc) {
      paragrafo.textContent = novaDesc;
      tarefa.descricao = novaDesc;
      atualizarTarefas();
    }
  };

  const imagemBotao = document.createElement("img");

  imagemBotao.setAttribute("src", "/imagens/edit.png");

  botao.append(imagemBotao);
  li.append(svg);
  li.append(paragrafo);
  li.append(botao);

  li.onclick = () => {
    document
      .querySelectorAll(".app__section-task-list-item-active")
      .forEach((e) => {
        e.classList.remove("app__section-task-list-item-active");
      });
    if (tarefaSelecionada == tarefa) {
      paragrafoDescTarefa.textContent = "";
      tarefaSelecionada = null;
      litarefaSelecionada = null;
      return;
    }
    tarefaSelecionada = tarefa;
    litarefaSelecionada = li;
    paragrafoDescTarefa.textContent = tarefa.descricao;

    li.classList.add("app__section-task-list-item-active");
  };

  return li;
}

btnAdicionarTarefa.addEventListener("click", () => {
  formAdicionarTarefa.classList.toggle("hidden");
});

formAdicionarTarefa.addEventListener("submit", (e) => {
  e.preventDefault();
  const tarefa = { descricao: textArea.value };
  tarefas.push(tarefa);
  const elementTarefa = criarTarefa(tarefa);
  ulTarefas.append(elementTarefa);
  atualizarTarefas();
  textArea.value = "";
  formAdicionarTarefa.classList.add("hidden");
});

tarefas.forEach((tarefa) => {
  const elementTarefa = criarTarefa(tarefa);
  ulTarefas.append(elementTarefa);
});

document.addEventListener("focoFinalizado", () => {
  if (tarefaSelecionada && litarefaSelecionada) {
    litarefaSelecionada.classList.remove("app__section-task-list-item-active");
    litarefaSelecionada.classList.add(".app__section-task-list-item-complete");
    tarefaSelecionada
      .querySelector("button")
      .setAttribute("disabled", "disabled");
  }
});
