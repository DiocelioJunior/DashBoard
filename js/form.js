// Função para preencher o select de páginas
function selectPageInner() {
    const pageSelect = document.getElementById("page-select-product-form");

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
    const selectedPageId = document.getElementById("page-select-product-form").value;

    // Valida se uma página foi selecionada
    if (!selectedPageId) {
        alert("Please select a page before adding the product.");
        return;
    }

    // Recupera os produtos da página selecionada no localStorage
    let pageProducts;
    try {
        pageProducts = JSON.parse(localStorage.getItem(selectedPageId)) || [];
        if (!Array.isArray(pageProducts)) {
            pageProducts = []; // Garante que seja um array
        }
    } catch (error) {
        console.error("Erro ao parsear produtos:", error);
        pageProducts = []; // Garante um array vazio em caso de erro
    }

    // Cria o produto com um ID exclusivo
    const product = {
        id: Date.now(), // Gera um ID único usando a data e hora atual em milissegundos
        name: document.getElementById("name-form-product").value.trim(),
        description: document.getElementById("text-form-product").value.trim(),
        category: document.getElementById("category-form-product").value.trim(),
        link: document.getElementById("link-form-product").value.trim(),
        salesPlatform: document.getElementById("sales-platform").value.trim(),
        sku: document.getElementById("sku-form-product").value.trim(),
        image: document.getElementById("preview-image").src,
        price: parseFloat(document.getElementById("price-form-product").value),
        compareAtPrice: parseFloat(document.getElementById("price-compare-form-product").value),
        page: selectedPageId, // Página selecionada
        status: true
    };

    // Adiciona o novo produto ao array de produtos da página
    pageProducts.push(product);

    // Salva os produtos da página de volta no localStorage
    localStorage.setItem(selectedPageId, JSON.stringify(pageProducts));

    // Log para verificação
    console.log("Produto adicionado:", product);

    // Limpa o formulário e a imagem de pré-visualização
    document.getElementById("form-product").reset();
    document.getElementById("preview-image").src = "";

    // Atualiza a lista de produtos na interface
    displayProductsFromPages();
});

// Função para exibir produtos das páginas selecionadas (opcional, ajuste conforme necessário)
function displayProductsFromPages() {
    const selectedPageId = document.getElementById("page-select-product-form").value;
    const productList = document.getElementById("product-list");

    // Recupera os produtos da página selecionada no localStorage
    const pageProducts = JSON.parse(localStorage.getItem(selectedPageId)) || [];

    productList.innerHTML = ""; // Limpa a lista de produtos

    if (pageProducts.length === 0) {
        productList.innerHTML = "<p>No products available for this page.</p>";
        return;
    }

    // Exibe os produtos recuperados
    pageProducts.forEach(product => {
        const productItem = document.createElement("div");
        productItem.classList.add("product-item");
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>Categoria: ${product.category}</p>
            <p>Preço: R$ ${parseFloat(product.price).toFixed(2)}</p>
            <a href="${product.link}" target="_blank">Ver Produto</a>
        `;
        productList.appendChild(productItem);
    });
}
