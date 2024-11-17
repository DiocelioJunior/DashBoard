
function savePage() {
    // Recupera as páginas do localStorage
    const pages = JSON.parse(localStorage.getItem("pages")) || [];

    // Limita o número de páginas a 3
    if (pages.length >= 3) {
        alert("You can only save up to 3 pages.");
        return;
    }

    // Obter os valores dos campos do formulário
    const page = {
        id: Date.now(),
        name: document.getElementById("page-name").value,
        description: document.getElementById("page-description").value.trim(),
        category: document.getElementById("page-category").value,
    };

    // Adiciona a nova página à lista
    pages.push(page);

    // Atualiza o localStorage
    localStorage.setItem("pages", JSON.stringify(pages));

    // Limpa o formulário após o cadastro
    document.getElementById("page-form").reset();

    // Atualiza a lista de páginas exibida
    displayPages();

    alert("Page saved successfully!");
}

function displayPages() {
    // Recupera as páginas do localStorage
    const pages = JSON.parse(localStorage.getItem("pages")) || [];

    // Seleciona o elemento para exibir as páginas cadastradas
    const pageList = document.getElementById("page-list");
    pageList.innerHTML = ''; // Limpa a lista antes de adicionar novos itens

    // Verifica se há páginas cadastradas
    if (pages.length === 0) {
        pageList.innerHTML = '<li>No pages registered yet.</li>';
        return;
    }

    // Adiciona cada página à lista
    pages.forEach(page => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <div class="list-page-info">
                <p id="id-page">#${page.id}</p>
                <h3>${page.name}</h3>
                <p><span>Description:</span> ${page.description || "No description provided."}</p>
                <p><span>Category:</span> ${page.category}</p>
            </div>
            <div class="list-page-icons">
                <span class="material-symbols-outlined delete-icon" data-id="${page.id}">delete</span>
                <span class="material-symbols-outlined">edit</span>
                <span class="material-symbols-outlined">preview</span>
            </div>
        `;
        pageList.appendChild(listItem);
    });

    // Adicionar evento de clique para todos os ícones de deletar
    const deleteIcons = document.querySelectorAll('.delete-icon');
    deleteIcons.forEach(icon => {
        icon.addEventListener('click', function () {
            const pageId = parseInt(this.getAttribute('data-id'));
            deletePage(pageId);
        });
    });
}

function deletePage(pageId) {
    // Recupera as páginas do localStorage
    let pages = JSON.parse(localStorage.getItem("pages")) || [];

    // Filtra as páginas removendo a que corresponde ao ID fornecido
    pages = pages.filter(page => page.id !== pageId);

    // Atualiza o localStorage com a lista filtrada
    localStorage.setItem("pages", JSON.stringify(pages));

    // Atualiza a exibição das páginas
    displayPages();

    alert("Page deleted successfully!");
}


// Exibe as páginas cadastradas ao carregar a página
window.onload = displayPages;
