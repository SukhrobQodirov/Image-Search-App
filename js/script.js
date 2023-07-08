const accessKey = "8_wZpuiL7iKXcAUrhTiOVsSjpVFCIqc_BInIvJF3ABU";

const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".search-input");
const imagesList = document.querySelector(".images-list");
const showMore = document.querySelector(".show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url)
    const data = await response.json()

    const results = data.results;

    if (page === 1) {
        imagesList.innerHTML = ""
    }

    results.map((result) => {
        const imageWrapper = document.createElement("li");
        imageWrapper.classList.add("image-item");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.classList.add("image-item-link");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result
        .alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        imagesList.appendChild(imageWrapper);
    })

    page++;
    if(page > 1) {
        showMore.style.display = "block";
    }
}

formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
})

showMore.addEventListener("click", () => {
    searchImages();
})