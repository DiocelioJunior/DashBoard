// Interações da lista lateral
const pageManager = document.getElementById("page-manager");
const myShop = document.getElementById("my-shop");
const dropPageManager = document.getElementById("drop-pageManager");
const dropMyShop = document.getElementById("drop-myShop");
const iconPageManager = document.getElementById("icon-pageManager");
const iconMyShop = document.getElementById("icon-myShop");
const settings = document.getElementById("settings");
const iconSettings = document.getElementById("icon-settings");

const productsPage = document.getElementById("products");
const newProductPage = document.getElementById("form-product");

const navBar = document.getElementById("navbar");
const pageTxt = document.getElementById("page-tx");

const listProductPage = document.getElementById("list-products");

const arrowBack = document.getElementById("arrow-back");
const iconsList = document.getElementById("icon-list")

const newPage = document.getElementById("page-form")

const pageCustom = document.getElementById("container-form-custom")

// Define o estilo inicial para garantir que os elementos estejam ocultos
dropPageManager.style.display = "none";
dropMyShop.style.display = "none";
newProductPage.style.display = "none";
listProductPage.style.display = "none";
newPage.style.display = "none";
pageCustom.style.display = "none"

// Função para alternar a visibilidade de um menu dropdown e resetar as cores dos ícones
function toggleDropdown(dropdown, icon) {
    // Reseta as cores de todos os ícones
    iconPageManager.style.color = "";
    iconMyShop.style.color = "";
    iconSettings.style.color = "";

    const isHidden = dropdown.style.display === "none";
    // Alterna a exibição do dropdown
    dropdown.style.display = isHidden ? "flex" : "none";
    // Altera a cor do ícone somente se o dropdown for exibido
    icon.style.color = isHidden ? "#007bff" : "";
}

function toggleIconsList() {
    const iconsList = document.getElementById("icon-list");
    iconsList.style.display = "flex";
}

// Gerenciar o clique no "Page Manager"
pageManager.addEventListener('click', function() {
    toggleDropdown(dropPageManager, iconPageManager);
    dropMyShop.style.display = "none"; // Fecha o outro dropdown se estiver aberto
});

// Gerenciar o clique no "My Shop"
myShop.addEventListener('click', function() {
    toggleDropdown(dropMyShop, iconMyShop);
    dropPageManager.style.display = "none"; // Fecha o outro dropdown se estiver aberto
});

// Gerenciar o clique nas configurações
settings.addEventListener('click', function() {
    // Reseta as cores dos outros ícones e aplica ao ícone de configurações
    iconPageManager.style.color = "";
    iconMyShop.style.color = "";
    iconSettings.style.color = "#007bff";
});

// Interações de navegação entre as páginas
const pages = document.querySelectorAll('#new-page, #my-pages, #custom-pages, #products, #order, #customers');

pages.forEach(page => {
    page.addEventListener('click', () => {
        pages.forEach(pageItem => pageItem.classList.remove('activated')); // Remove 'activated' de todos os itens
        page.classList.add('activated'); // Adiciona 'activated' ao item clicado

        console.log(page)
        if (page.id === "products") {
            const displayStyle = newProductPage.style.display === "none" ? "flex" : "none";
            newProductPage.style.display = displayStyle;
            navBar.style.display = displayStyle;
             pageTxt.innerText = "Add New Product"
        } else {
            newProductPage.style.display = "none";
            navBar.style.display = "none"; // Esconde a `navBar` e `newProductPage` quando não está na página "products"
        }

        if (page.id === "order") {
            const displayStyle = listProductPage.style.display === "none" ? "flex" : "none";
            listProductPage.style.display = displayStyle;
            navBar.style.display = displayStyle;
            pageTxt.innerText = "Products List"
        } else {
            listProductPage.style.display = "none";
        }

        if (page.id === "new-page") {
            const displayStyle = newPage.style.display === "none" ? "flex" : "none";
            newPage.style.display = displayStyle;
            navBar.style.display = displayStyle;
            pageTxt.innerText = "New Page"
        } else {
            newPage.style.display = "none";
        }

        if (page.id === "custom-pages") {
            const displayStyle = pageCustom.style.display === "none" ? "flex" : "none";
            pageCustom.style.display = displayStyle;
            navBar.style.display = displayStyle;
            pageTxt.innerText = "Custom Page"
        } else {
            pageCustom.style.display = "none";
        }


    });
});

// Upload de Imagem
// Abre o seletor de arquivos ao clicar na div
document.getElementById('customButton').addEventListener('click', function() {
    document.getElementById('image-form-product').click();
});

// Exibe a imagem selecionada
document.getElementById('image-form-product').addEventListener('change', function() {
    const file = this.files[0];
    const previewImage = document.getElementById('preview-image');
    
    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            previewImage.src = e.target.result;
            previewImage.style.display = 'block'; // Torna a imagem visível
        };

        reader.readAsDataURL(file); // Converte a imagem em uma URL para exibição
    }
});



