// Função para preencher o select de páginas
function selectPageInner() {
    const pageSelect = document.getElementById("page-select");

    // Recupera as páginas do localStorage
    const pages = JSON.parse(localStorage.getItem("pages")) || [];

    // Limpa o conteúdo atual do select
    pageSelect.innerHTML = `
        <option value="" disabled selected>Select a page</option>
    `;

    // Adiciona as páginas ao select
    if (pages.length === 0) {
        const option = document.createElement("option");
        option.textContent = "No pages available";
        option.disabled = true;
        pageSelect.appendChild(option);
    } else {
        pages.forEach(page => {
            const option = document.createElement("option");
            option.value = page.name; // Usa o ID da página como valor
            option.textContent = page.name; // Exibe o nome da página
            pageSelect.appendChild(option);
        });
    }
}

// Garante que a função seja chamada ao carregar a página
window.addEventListener("DOMContentLoaded", selectPageInner);

// Função para adicionar o produto
document.getElementById("add-product").addEventListener("click", function() {
    // Recupera o valor da página selecionada
    const selectedPageId = document.getElementById("page-select").value;

    // Valida se uma página foi selecionada
    if (!selectedPageId) {
        alert("Please select a page before adding the product.");
        return;
    }

    // Cria o produto com um ID exclusivo
    const product = {
        id: Date.now(), // Gera um ID único usando a data e hora atual em milissegundos
        name: document.getElementById("name-form-product").value,
        description: document.getElementById("text-form-product").value.trim(),
        category: document.getElementById("category-form-product").value,
        link: document.getElementById("link-form-product").value,
        salesPlatform: document.getElementById("sales-platform").value,
        sku: document.getElementById("sku-form-product").value,
        image: document.getElementById("preview-image").src,
        price: parseFloat(document.getElementById("price-form-product").value),
        compareAtPrice: parseFloat(document.getElementById("price-compare-form-product").value),
        page: selectedPageId, // Página selecionada
        status: true
    };

    // Recupera os produtos já salvos na página selecionada
    let pageProducts = JSON.parse(localStorage.getItem(selectedPageId)) || [];

    // Adiciona o novo produto ao array de produtos da página
    pageProducts.push(product);

    // Salva os produtos da página de volta no localStorage
    localStorage.setItem(selectedPageId, JSON.stringify(pageProducts));

    // Log para verificação
    console.log("Produto adicionado:", product);

    // Limpa o formulário e a imagem de pré-visualização
    document.getElementById("form-product").reset();
    document.getElementById("preview-image").src = "";

    displayProductsFromPages()
});
