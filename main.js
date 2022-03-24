const filterBtn = document.querySelector("#filter");
const searchBtn = document.querySelector("#direct");

const searchText = document.querySelector(".change1");
const searchFilters = document.querySelector(".change2");

filterBtn.addEventListener("click", () => {
  if (searchText.classList.contains("show")) {
    searchText.classList.remove("show");
  }
  if (searchFilters.classList.contains("noshow")) {
    searchFilters.classList.remove("noshow");
  }

  searchText.classList.add("noshow");
  searchFilters.classList.add("show");
});

searchBtn.addEventListener("click", () => {
  if (searchText.classList.contains("noshow")) {
    searchText.classList.remove("noshow");
  }
  if (searchFilters.classList.contains("show")) {
    searchFilters.classList.remove("show");
  }

  searchFilters.classList.add("noshow");
  searchText.classList.add("show");
});

//////////////////////////////////////////////////////////

const searchClickBtn = document.querySelector("#click1");
let imgContainer = document.querySelector(".screen .row");
searchClickBtn.addEventListener("click", () => {
  const word = document.querySelector("#searchText").value;
  fetch("http://localhost:8080/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ word: word }),
  })
    .then((res) => res.json())
    .then((json) => {
      const images = json.images;
      console.log(images);
      // imgContainer.innerHTML = "";
      for (let i = 0; i < images.length; i++) {
        const new_pTag1 = document.createElement("div");
        new_pTag1.setAttribute("class", "movie1");
        const new_pTag2 = document.createElement("img");
        new_pTag2.setAttribute("class", "imgs");
        new_pTag2.setAttribute("src", `${images[i]}`);
        new_pTag2.setAttribute("alt", "movie1");
        new_pTag1.appendChild(new_pTag2);
        imgContainer.appendChild(new_pTag1);
      }
    });
});

const filterClickBtn = document.querySelector("#click2");
