// Função para recuperar os nomes das páginas armazenadas no localStorage
function getPageNamesFromLocalStorage() {
    const pages = JSON.parse(localStorage.getItem("pages")) || [];
    return pages.map(page => page.name); // Retorna os nomes das páginas
}

// Função para aplicar os filtros
function applyFilters() {
    const nameFilter = document.getElementById("search-input").value.toLowerCase();
    const pageFilter = document.getElementById("filter-pages").value.toLowerCase();
    const idFilter = document.getElementById("id-input").value.toLowerCase();
    const platformFilter = document.getElementById("filter-platform").value.toLowerCase();

    displayProductsFromPages(nameFilter, pageFilter, idFilter, platformFilter);
}

// Função para exibir os produtos, considerando os filtros
function displayProductsFromPages(nameFilter = "", pageFilter = "", idFilter = "", platformFilter = "") {
    const pageNames = getPageNamesFromLocalStorage();

    let allProducts = [];

    // Para cada nome de página, busca os produtos no localStorage
    pageNames.forEach(pageName => {
        const products = JSON.parse(localStorage.getItem(pageName)) || [];
        allProducts = allProducts.concat(products); // Adiciona os produtos ao array total
    });

    const productList = document.getElementById("product-list");
    productList.innerHTML = ''; // Limpa a lista antes de adicionar novos itens

    // Filtra os produtos com base nos filtros
    const filteredProducts = allProducts.filter(product => {
        const nameMatch = product.name.toLowerCase().includes(nameFilter);
        const pageMatch = pageFilter ? product.page.toLowerCase().includes(pageFilter) : true;
        const idMatch = idFilter ? product.id.toString().toLowerCase().includes(idFilter) : true;
        const platformMatch = platformFilter ? product.salesPlatform.toLowerCase().includes(platformFilter) : true;

        return nameMatch && pageMatch && idMatch && platformMatch;
    });

    // Exibe os produtos filtrados ou uma mensagem de 'sem produtos'
    if (filteredProducts.length === 0) {
        productList.innerHTML = '<p>Não há produtos disponíveis.</p>';
    } else {
        filteredProducts.forEach(product => {
            const listItem = document.createElement("li");
            listItem.classList.add("product-item");

            const price = product.price ? parseFloat(product.price).toFixed(2) : "Preço não disponível";
            const compareAtPrice = product.compareAtPrice ? parseFloat(product.compareAtPrice).toFixed(2) : "Preço não disponível";

            listItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" width="100">
            
            <div class="info-product">
                <div class="product-id" id="product-name">
                    <h1>${product.name}</h1>
                </div>
                <div class="product-id">
                    <p># ${product.id}</p>
                </div>
                <div class="product-id">
                    <h2>${product.category}</h2>
                </div>
                <div class="product-id">
                    <h2>R$ ${price}</h2>
                </div>
                <div class="product-id">
                    <a href="${product.link}" target="_blank"><button>Ver produto</button></a>
                </div>
            </div>

            <div class="icons-list" id="icon-list">
                <span class="material-symbols-outlined delete-icon" data-id="${product.id}">delete</span>
            </div>
            `;

            productList.appendChild(listItem);

            // Evento de deleção
            const deleteIcon = listItem.querySelector(".delete-icon");
            deleteIcon.addEventListener('click', function() {
                const productId = deleteIcon.getAttribute("data-id");
                deleteProduct(productId); // Deleta o produto
            });
        });
    }
}

// Função para deletar o produto do localStorage
function deleteProduct(productId) {
    const pageNames = getPageNamesFromLocalStorage();

    pageNames.forEach(pageName => {
        const products = JSON.parse(localStorage.getItem(pageName)) || [];
        const updatedProducts = products.filter(product => product.id !== productId);

        if (updatedProducts.length !== products.length) {
            localStorage.setItem(pageName, JSON.stringify(updatedProducts));
            console.log(`Produto com ID ${productId} deletado da página ${pageName}`);
        }
    });

    displayProductsFromPages(); // Atualiza a lista após a remoção
}

// Função para popular o filtro de páginas
function populatePageFilter() {
    const pageNames = getPageNamesFromLocalStorage();
    const filterPagesSelect = document.getElementById("filter-pages");

    pageNames.forEach(pageName => {
        const option = document.createElement("option");
        option.value = pageName;
        option.textContent = pageName;
        filterPagesSelect.appendChild(option);
    });
}

// Chama a função para preencher o filtro de páginas
populatePageFilter();

// Adiciona os eventos para aplicar os filtros
document.getElementById("search-input").addEventListener("input", applyFilters);
document.getElementById("id-input").addEventListener("input", applyFilters);
document.getElementById("filter-pages").addEventListener("change", applyFilters);
document.getElementById("filter-platform").addEventListener("change", applyFilters);

// Exemplo de uso
displayProductsFromPages();
