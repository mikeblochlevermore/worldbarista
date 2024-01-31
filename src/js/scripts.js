window.onload = function () {

    // Create headline images and tag lines
    displayHeadines()

    // Load articles for first page (page 0)
    displayArticles(0)

    // Loads the page count for articles
    updatePage(0)

    // Loads images from the sponsors
    displaySponsors()

    // Loads images from insta
    displayInstas()
}


// Number of articles displayed on each page
const articlesperpage = 4;


// Creates a structure for articles
class Article {
    constructor(imgSrc, title, publishedDate, text) {
        this.imgSrc = imgSrc;
        this.title = title;
        this.publishedDate = publishedDate;
        this.text = text;
    }

    // Creates display cards for articles on the index page
    displayArticle() {

        const articleDiv = document.getElementById("articles");

        var articleCard = document.createElement("a");
        articleCard.className = 'article_card';
        // Note: This should be improved so that the entire article contents doesn't show up in the html
        articleCard.setAttribute("onclick", `toggleOverlay(${JSON.stringify(this)})`);

        articleCard.innerHTML = `
            <img src="${this.imgSrc}">
            <div>
                <h2>${this.title}</h2>
                <h6>Published ${this.publishedDate}</h6>
                <p>${this.text.slice(0, 250)}...<p>
                <button>Read more</button>
            </div>
        `;
        articleDiv.append(articleCard);
    }
}

function displayHeadines() {
    var container = document.createElement("div");
    container.className = 'image-container';

    var image = document.createElement("img");
    image.className = 'headline-image';
    var text = document.createElement("h3");
    text.className = 'headline-text';

    var imageCount = 1;

    var nextButton = document.createElement("div");
    nextButton.innerHTML = `<img src="src/assets/icons/arrow-right.svg" alt="next_image" height="20px"/>`;
    nextButton.onclick = function() {
        imageCount = (imageCount % 3) + 1;
        selectImage();
    };
    nextButton.className = 'next_button';

    var previousButton = document.createElement("div");
    previousButton.innerHTML = `<img src="src/assets/icons/arrow-left.svg" alt="previous_image" height="20px"/>`;
    previousButton.onclick = function() {
        imageCount = ((imageCount + 1) % 3) + 1;
        selectImage();
    };
    previousButton.className = 'prev_button';

    container.appendChild(image);
    container.appendChild(text);
    container.appendChild(previousButton);
    container.appendChild(nextButton);

    var headline = document.getElementById("headline");
    selectImage();
    headline.append(container);

    /* FUNCTIONS */
    function selectImage() {
        if (imageCount === 1) {
            image.src = "src/assets/images/main/pexels-chevanon-photography-302897.jpg";
            image.alt = "headline-image-1";
            text.innerHTML = `"To create an environment in which knowledge about coffee and its sphere can be obtained"`;
        } else if (imageCount === 2) {
            image.src = "src/assets/images/main/pexels-juan-pablo-serrano-arenas-894695.jpg";
            image.alt = "headline-image-2";
            text.innerHTML = `"This is a great introduction to the coffee industry's best beans on the planet"`;
        } else if (imageCount === 3) {
            image.src = "src/assets/images/main/pexels-chevanon-photography-323503.jpg";
            image.alt = "headline-image-3";
            text.innerHTML = `"Coffee in, code out, this is the way of eternal life and empowerment of the soul"`;
        }
    }

    // Inserts newNode after referenceNode
    function insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
};


// Toggles article overlay
function toggleOverlay(article) {
    var overlay = document.getElementById('overlay');
    overlay.style.display = (overlay.style.display === 'none' || overlay.style.display === '') ? 'flex' : 'none';

    if (article) {
        var overlayContent = document.createElement("div")
        overlayContent.className = "overlay_content";
        overlayContent.innerHTML = `
            <div>
                <img class="overlay_image" src="${article.imgSrc}" alt="${article.title}">
                <div class="article_text">
                    <h2>${article.title}</h2>
                    <h4>Published ${article.publishedDate}</h4>
                    <p>${article.text}</p>
                </div>
            </div>
            <div>
                <img class="close_button" src="src/assets/icons/close.svg" alt="close" onclick="toggleOverlay()"/>
            </div>
        `;
        overlay.innerHTML = ""; // Clear previous content
        overlay.append(overlayContent);
    }
}


function displaySponsors() {

    // Loops through potential filenames for sponsor images
    for (let i = 1; i <= 41; i++) {
         displaySponsor(i)
    }

    // Note: I realise isn't the ideal way to loop through all the sponsor image files.
    // It could be potentially solved with PHP/jQuery, but I'd need to learn how.
    // Alternatively, I could though do this using Django/Python, or parse data from an API if that were the case.

    function displaySponsor(i) {
        var sponsorDiv = document.getElementById('sponsors_grid')
        var sponsor = document.createElement("img")
        try {
            sponsor.src = `src/assets/images/sponsors/sponsor-${i}.png`;
            sponsor.onload = () => {
                sponsorDiv.append(sponsor)
            }
        } catch (error) {
            // Log the error to the console
            console.error("Error displaying image");
        }
    }
}


function displayInstas() {

    // Loops through filenames for intsa images
    // This should be improved by sourcing latest images directly from Instagram
    for (let i = 1; i <= 9; i++) {
        displayInsta(i)
    }

    function displayInsta(i) {
        var instaDiv = document.getElementById('insta_grid')
        var insta = document.createElement("img")
        insta.src = `src/assets/images/instagram-feed/instagram-image-${i}.png`;
        // If the file exists, display the image
        insta.onload = () => {
            instaDiv.append(insta)
        }
    }
}


function displayArticles(page) {

    // Loops through articles for that page and displays them
    // articlesperpage is defined globally at the top of this page
    for (let i = page * articlesperpage; i < Math.min((page + 1) * articlesperpage, articles.length); i++) {
        articles[i].displayArticle();
    }
}


function scrollUp() {
    window.scrollTo({
        top: 400,
        behavior: "smooth"
    })
}


function nextPage(page) {

    scrollUp()

    // Check the page number is less than the maximum number of pages:
    if (Math.ceil(articles.length / articlesperpage) > (page + 1)) {

        page = page + 1;

        // Clear articles and display for the next page
        const articleDiv = document.getElementById("articles");
        articleDiv.innerHTML = ''
        displayArticles(page)

        var next_button = document.getElementById("next_button")
        next_button.setAttribute("onclick", `nextPage(${page})`)

        var prev_button = document.getElementById("prev_button")
        prev_button.setAttribute("onclick", `prevPage(${page})`)
        updatePage(page)
    }
}


function prevPage(page) {

    scrollUp()

    // Check the page number is greater than 0:
    if (page > 0 ) {

        page = page - 1;

        const articleDiv = document.getElementById("articles");
        // Clear articles and display for the prev page
        articleDiv.innerHTML = ''

        displayArticles(page)
        updatePage(page)

        // Update the buttons
        var next_button = document.getElementById("next_button")
        next_button.setAttribute("onclick", `nextPage(${page})`)

        var prev_button = document.getElementById("prev_button")
        prev_button.setAttribute("onclick", `prevPage(${page})`)
    }
}


function updatePage(page) {
    var pages = document.getElementById("pages")
    // Displays correct pagination e.g Page 1 of 2
    pages.textContent = `${page + 1} of ${Math.ceil(articles.length / articlesperpage)}`
}


function handleSearch(input, resolution) {

    resultsDiv = document.getElementById(`search_results_${resolution}`);
    resultsDiv.innerHTML = '';

    if (input != '') {
        let resultCounter = 0;

        for (const article of articles) {
            // Ignore capitalization in search results
            if (article.title.toLowerCase().includes(input.toLowerCase())) {
                var result = document.createElement("a");
                result.className = "result";
                result.setAttribute("onclick", `toggleOverlay(${JSON.stringify(article)})`);
                result.innerHTML =
                    `
                        <h3>${article.title}</h3>
                        <h6>Published ${article.publishedDate}</h6>
                        <p>${article.text.slice(0, 80)}...</p>
                    `;

                var hr = document.createElement("hr");
                resultsDiv.append(result);
                resultsDiv.append(hr);

                resultCounter++;

                // Limits results to 4 entries
                if (resultCounter === 4) {
                    // Break out of the loop when four results are reached
                    break;
                }
            }
        }
    }

    document.addEventListener("click", () => {
        resultsDiv.innerHTML = '';
    });
}


function toggleMenu() {
    menuDiv = document.getElementById("mobile_menu")
    menuButton = document.getElementById("menu_button")
    // Display the menu
    menuDiv.style.display = (menuDiv.style.display === 'none' || menuDiv.style.display === '') ? 'block' : 'none';

    // Toggle the button icon (filter used to make coffee beans logo white)
    if (menuButton.src.endsWith('coffee-beans-svgrepo-com.svg')) {
        menuButton.classList.toggle('spin');
        menuButton.src = 'src/assets/icons/close.svg';
        menuButton.style.filter = "none";
    } else {
        menuButton.src = 'src/assets/icons/coffee-beans-svgrepo-com.svg';
        menuButton.style.filter = "invert(100%)"
    }
}


function toggleMobileSearch() {
    searchDiv = document.getElementById("mobile_search")
    icon = document.getElementById("mobile_search_icon")
    // Display the menu
    searchDiv.style.display = (searchDiv.style.display === 'none' || searchDiv.style.display === '') ? 'block' : 'none';
    icon.classList.toggle('rotate');
}