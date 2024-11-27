//http://127.0.0.1:3000/pages/pageView.html?page=Loujinha
// Objeto para armazenar as customizações
const pageCustomization = {
    header: {
        backgroundColor: "",
        textColor: "",
        fontSize: "",
        logo: ""
    }
};

// Função para obter parâmetros da URL
function getParameterByName(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Função para aplicar customizações salvas
function applyCustomizations() {
    const pageName = getParameterByName('page');
    const customizationData = localStorage.getItem(`${pageName}-customizations`);

    if (customizationData) {
        const customization = JSON.parse(customizationData);

        // Aplica cor de fundo do header
        if (customization.header.backgroundColor) {
            document.getElementById('header').style.backgroundColor = customization.header.backgroundColor;
        }

        // Aplica cor do texto do header
        if (customization.header.textColor) {
            document.querySelector('.header-title').style.color = customization.header.textColor;
            document.querySelector('.header-title').innerHTML = pageName;
        }

        // Aplica tamanho da fonte do título do header
        if (customization.header.fontSize) {
            document.querySelector('.header-title').style.fontSize = customization.header.fontSize + "px";
        }

        // Aplica a logo se existir
        if (customization.header.logo) {
            document.getElementById('header-logo').src = customization.header.logo;
        }
    }
}

// Função para carregar produtos de uma página específica
function loadPageProducts() {
    const pageName = getParameterByName('page'); // Captura o valor do parâmetro 'page' da URL

    if (!pageName) {
        document.getElementById("product-list").innerHTML = "<p>Nome da página não especificado na URL.</p>";
        return;
    }

    // Recupera os produtos da página selecionada no localStorage
    const products = JSON.parse(localStorage.getItem(pageName)) || [];

    // Carregar categorias
    const categories = [...new Set(products.map(product => product.category))];
    loadCategories(categories, products); // Chama a função para carregar categorias

    // Exibir todos os produtos inicialmente
    displayProducts(products);
}

// Função para carregar categorias no HTML
function loadCategories(categories, products) {
    const categoryList = document.getElementById("category-list");
    categoryList.innerHTML = ''; // Limpa a lista de categorias antes de adicionar novas

    // Adiciona o botão "All" para mostrar todos os produtos
    const allButton = document.createElement("li");
    allButton.textContent = "All";
    allButton.classList.add("category-item", "all-button");
    allButton.addEventListener("click", () => displayProducts(products)); // Mostra todos os produtos
    categoryList.appendChild(allButton);

    // Adiciona cada categoria individualmente
    categories.forEach(category => {
        const li = document.createElement("li");
        li.textContent = category;
        li.classList.add("category-item");
        li.addEventListener("click", () => filterProductsByCategory(category, products));
        categoryList.appendChild(li);
    });
}

// Função para exibir todos os produtos
function displayProducts(products) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ''; // Limpa a lista antes de adicionar novos itens

    if (products.length === 0) {
        productList.innerHTML = "<p>Não há produtos disponíveis.</p>";
        return;
    }

    // Exibe os produtos recuperados
    products.forEach(product => {
        const productItem = document.createElement("div");
        productItem.classList.add("product-item"); // Aplica a classe de estilo
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p id= "description"> ${product.description}</p>
            <p id= "more">Ver mais</p>
            <p>R$<span>${parseFloat(product.price).toFixed(2)}</span></p>
            <a href="${product.link}" target="_blank">Ver Produto</a>
        `;
        productList.appendChild(productItem);
    });
}

// Função para filtrar produtos por categoria
function filterProductsByCategory(category, products) {
    const filteredProducts = products.filter(product => product.category === category);
    displayProducts(filteredProducts); // Exibe apenas os produtos da categoria filtrada
}

// Chama as funções ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    applyCustomizations();  // Aplica as customizações salvas
    loadPageProducts();     // Carrega os produtos da página
});
