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
let movies;
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
      movies = json.movies;

      movies.forEach((movie, idx) => {
        //movie.title, movie.link, movie.imgSrc
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
const modal = document.querySelector(".modal");
const body = document.querySelector("body");
const closeBtn = document.querySelector("#close-btn");
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

imgContainer.addEventListener("click", (e) => {
  const regex = /[^0-9]/g; //id에 속한 idx를 추출하기 위한 정규식
  const targetId = e.target.id;
  console.log(targetId);
  const movieIdx = parseInt(targetId.replace(regex, ""));
  const title = movies[movieIdx].title;
  const imgSrc = movies[movieIdx].imgSrc;
  const link = movies[movieIdx].link;

  //영화 정보 페이지 link를 주고 해당 영화 관련 정보들 받아오기
  fetch("http://localhost:8080/modal", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ link: link }),
  })
    .then((res) => res.json())
    .then((json) => {
      const content = json.content;
      //해당 영화에 대한 link를 주고 json을 통해 받은
      //영화 관련 정보들 받아서 모달 생성
      //제목 + 이미지
      //1. 장르 (filter)
      //2. 국적(filter)
      //3. 개봉일(filter)
      //4. 러닝타임
      //5. 줄거리
      modal.style.display = "block";
    });
});
