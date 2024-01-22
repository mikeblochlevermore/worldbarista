window.onload = function () {

    var container = document.createElement("div");
    container.className = 'image-container';

    var image = document.createElement("img");
    image.className = 'headline-image';
    var text = document.createElement("div");
    text.className = 'overlay-text';

    var imageCount = 1;

    var nextButton = document.createElement("button");
    nextButton.innerHTML = "Next";
    nextButton.onclick = function() {
        imageCount = (imageCount % 3) + 1;
        selectImage();
    };
    nextButton.className = 'button';

    var previousButton = document.createElement("button");
    previousButton.innerHTML = "Previous";
    previousButton.onclick = function() {
        imageCount = ((imageCount + 1) % 3) + 1;
        selectImage();
    };
    previousButton.className = 'button';

    container.appendChild(image);
    container.appendChild(text);
    container.appendChild(previousButton);
    container.appendChild(nextButton);

    var div = document.getElementById("headline");
    selectImage();
    insertAfter(div, container);

    /* FUNCTIONS */
    function selectImage() {
        if (imageCount === 1) {
            image.src = "assets/images/instagram-feed/instagram-image-5.png";
            image.alt = "headline-image-1";
            text.innerHTML = "To create an environment in which knowledge about coffee and its sphere can be obtained";
        } else if (imageCount === 2) {
            image.src = "assets/images/instagram-feed/instagram-image-3.png";
            image.alt = "headline-image-2";
            text.innerHTML = "This is a great introduction to the coffee industry's best beans on the planet";
        } else if (imageCount === 3) {
            image.src = "assets/images/instagram-feed/instagram-image-4.png";
            image.alt = "headline-image-3";
            text.innerHTML = "Coffee in, code out, this is the way of eternal life and empowerment of the soul";
        }
    }

    // Inserts newNode after referenceNode
    function insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
};