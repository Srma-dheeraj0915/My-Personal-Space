 document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const titleInput = document.getElementById('titleInput');
    const file = fileInput.files[0];
    const title = titleInput.value;

    if (file && title) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            const image = { url: imageUrl, title: title };
            saveImage(image);
            displayImage(image);
        };
        reader.readAsDataURL(file);
    }
});

function saveImage(image) {
    let images = JSON.parse(localStorage.getItem('images')) || [];
    images.push(image);
    localStorage.setItem('images', JSON.stringify(images));
}

function displayImage(image) {
    const imageContainer = document.getElementById('imageContainer');
    const imageItem = document.createElement('div');
    imageItem.classList.add('imageItem');

    const img = document.createElement('img');
    img.src = image.url;

    const titleOverlay = document.createElement('div');
    titleOverlay.classList.add('titleOverlay');
    titleOverlay.textContent = image.title;

    imageItem.appendChild(img);
    imageItem.appendChild(titleOverlay);
    imageContainer.appendChild(imageItem);
}

function loadImages() {
    const images = JSON.parse(localStorage.getItem('images')) || [];
    images.forEach(displayImage);
}

// Load images on page load
document.addEventListener('DOMContentLoaded', loadImages);

    