// Objeto global para armazenar os dados
const customSettings = {
    header: {
        logo: ""
    }
};

// Elementos do DOM
const fileInput = document.getElementById('image-logo-form');
const uploadButton = document.getElementById('logo-custom-button');
const previewContainer = document.getElementById('image-logo-preview');
const previewImage = document.getElementById('preview-image');

// Evento para abrir o seletor de arquivos ao clicar no botão
uploadButton.addEventListener('click', () => {
    fileInput.click();
});

// Evento para lidar com o upload e gerar o preview
fileInput.addEventListener('change', function (event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        // Quando a imagem é carregada, atualiza o preview e salva no objeto
        reader.onload = function (e) {
            previewImage.src = e.target.result; // Define a imagem do preview
            previewContainer.style.display = 'block'; // Mostra o container de preview

            // Salva a imagem no objeto
            customSettings.header.logo = e.target.result;
            console.log("Imagem salva no objeto:", customSettings);
        };

        reader.readAsDataURL(file); // Lê a imagem como DataURL
    }
});
