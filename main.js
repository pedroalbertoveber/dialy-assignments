const formulario = document.querySelector("#formulario");
const exibicaoDeTarefas = document.querySelector("#exibicaoDeTarefas")
const listaDeTarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
const botaoLimparTarefas = document.querySelector("#btnLimparTarefas");

listaDeTarefas.forEach(tarefa => criarNovaTarefa(tarefa));

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const tarefa = e.target.elements['tarefa'];
    const corretor = e.target.elements['corretor'];

    if (tarefa.value === '' || corretor.value === '') {
        alert('Você precisa preencher todos os dados do formulário');
        return;
    }
    
    const tarefaCompleta = {
        "corretor": corretor.value,
        "tarefa": tarefa.value,
        "id": listaDeTarefas.length,
    };

    listaDeTarefas.push(tarefaCompleta);    
    localStorage.setItem("tarefas", JSON.stringify(listaDeTarefas));

    console.log(listaDeTarefas);

    tarefa.value = '';
    corretor.value = '';

    criarNovaTarefa(tarefaCompleta);
})

function criarNovaTarefa(item) {
    const novaTarefa = document.createElement('li');
    novaTarefa.classList.add('item-adicionado');
    
    const corretorTarefa = document.createElement('strong');
    corretorTarefa.innerHTML = item.corretor;

    const tarefaTarefa = document.createElement('span');
    tarefaTarefa.innerHTML = item.tarefa;

    novaTarefa.appendChild(corretorTarefa);
    novaTarefa.appendChild(tarefaTarefa);
    novaTarefa.appendChild(criarBotaoExcluir(item.id));
    
    exibicaoDeTarefas.appendChild(novaTarefa);
}

function criarBotaoExcluir(id) {
    const botaoExcluir = document.createElement('button');
    botaoExcluir.classList.add('botao-excluir');

    botaoExcluir.innerText = "Excluir Tarefa";
    botaoExcluir.addEventListener('click', function(){
        excluirTarefa(this.parentNode, id);
    })

    return botaoExcluir;
} 

function excluirTarefa(tag, id) {
    listaDeTarefas.splice(listaDeTarefas.findIndex(tarefa => tarefa.id === id), 1);
    localStorage.setItem("tarefas", JSON.stringify(listaDeTarefas));

    tag.remove();
}

botaoLimparTarefas.addEventListener('click', () => {
    if (listaDeTarefas.length === 0) {
        alert('Você não possui tarefas cadastradas!');
        return;
    }

    localStorage.clear();
    alert('Tarefas excluídas com sucesso! Favor atualizar a página');
})