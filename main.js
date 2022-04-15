const filterBtn = document.querySelector("#filter-search");
const searchBtn = document.querySelector("#direct-search");

const searchText = document.querySelector(".func-direct-search");
const searchFilters = document.querySelector(".func-filter-search");

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

const searchClickBtn = document.querySelector("#direct-search-btn");
const imgContainer = document.querySelector(".movies");
searchClickBtn.addEventListener("click", () => {
  const word = document.querySelector(".func-direct-search > input").value;
  fetch("http://localhost:8080/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ word: word }),
  })
    .then((res) => res.json())
    .then((json) => {
      imgContainer.innerHTML = "";
      const movies = json.movies;

      movies.forEach((movie, idx) => {
        const articleTag = document.createElement("article");
        if (!movie.imgSrc.includes("poster_default")) {
          articleTag.setAttribute("class", "movie");
          articleTag.style.backgroundImage = `url(${movie.imgSrc})`;
        } else {
          articleTag.setAttribute("class", "noimg");
        }
        const h1Tag = document.createElement("h1");
        h1Tag.innerText = movie.title;
        const btnTag = document.createElement("button");
        btnTag.setAttribute("id", `num${idx}`);
        articleTag.appendChild(h1Tag);
        articleTag.appendChild(btnTag);
        imgContainer.appendChild(articleTag);
      });
    });
});

//////////////////////////////////////////////////////////모달창 만들 것
imgContainer.addEventListener("click", (e) => {
  if (e.target.id === "num1") {
    console.log("모달창");
  }
});
