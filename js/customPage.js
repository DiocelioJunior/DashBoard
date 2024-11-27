// Objeto para armazenar as customizações
const pageCustomization = {
    header: {
        backgroundColor: "",
        textColor: "",
        fontSize: "",
        logo: ""
    }
};

// Elementos do DOM
const headerBgColors = document.getElementById("header-bg-colors");
const headerTextColors = document.getElementById("header-text-colors");
const headerFontSizeInput = document.getElementById("header-font-size");
const fileInput = document.getElementById("image-logo-form");
const uploadButton = document.getElementById("logo-custom-button");
const previewImage = document.getElementById("preview-image");
const form = document.getElementById("page-customization-form");
const pageSelect = document.getElementById("page-select-custom"); // Seletor de páginas

// Função para carregar as páginas dinamicamente no select
function loadPages() {
    const pages = JSON.parse(localStorage.getItem("pages")) || [];

    // Limpa o select antes de adicionar opções (evita duplicatas)
    pageSelect.innerHTML = '<option value="">Selecione uma página</option>';

    // Adiciona cada página como uma opção no select
    pages.forEach(page => {
        const option = document.createElement("option");
        option.value = page.name; // Nome da página
        option.textContent = page.name;
        pageSelect.appendChild(option);
    });
}

// Chama a função de carregamento quando a página for carregada
document.addEventListener("DOMContentLoaded", loadPages);

// Função para selecionar cor
function handleColorSelection(container, key) {
    const buttons = container.querySelectorAll(".color-option");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const selectedColor = button.dataset.color;
            pageCustomization.header[key] = selectedColor;

            // Destaque visual para a cor selecionada
            buttons.forEach(btn => btn.style.border = "none");
            button.style.border = "2px solid black";

            console.log(`Cor de ${key} selecionada:`, selectedColor);
        });
    });
}

// Configurando seleção de cores
handleColorSelection(headerBgColors, "backgroundColor");
handleColorSelection(headerTextColors, "textColor");

// Configurando o tamanho da fonte
headerFontSizeInput.addEventListener("input", () => {
    const fontSize = headerFontSizeInput.value;
    pageCustomization.header.fontSize = fontSize;
    console.log("Tamanho da fonte selecionado:", fontSize);
});

// Configurando o upload da logo
uploadButton.addEventListener("click", () => {
    fileInput.click();
});

fileInput.addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            previewImage.src = e.target.result;
            pageCustomization.header.logo = e.target.result;
            console.log("Logo salva no objeto:", pageCustomization.header.logo);
        };
        reader.readAsDataURL(file);
    }
});

// Submissão do formulário
form.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita o recarregamento da página

    // Verifica se uma página foi selecionada
    const selectedPage = pageSelect.value;
    if (selectedPage) {
        // Salva as customizações específicas para a página selecionada
        const customizationsKey = `${selectedPage}-customizations`;
        localStorage.setItem(customizationsKey, JSON.stringify(pageCustomization));

        console.log("Customizações salvas para a página:", selectedPage);
        alert("Customizações salvas com sucesso!");
    } else {
        alert("Por favor, selecione uma página para customizar.");
    }
});
