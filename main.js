const filterBtn = document.querySelector("#filter-search");
const searchBtn = document.querySelector("#direct-search");

const searchText = document.querySelector(".func-direct-search");
const searchFilters = document.querySelector(".func-filter-search");

const imgContainer = document.querySelector(".movies");

const modalFilter = document.querySelector(".modal-filter");
const modalFilterCloseBtn = document.getElementById("modal-filter-close-btn");

filterBtn.addEventListener("click", () => {
  imgContainer.innerHTML = "";
  if (searchText.classList.contains("show")) {
    searchText.classList.remove("show");
  }
  if (searchFilters.classList.contains("noshow")) {
    searchFilters.classList.remove("noshow");
  }

  searchText.classList.add("noshow");
  searchFilters.classList.add("show");

  modalFilter.style.display = "block";
});

modalFilterCloseBtn.addEventListener("click", () => {
  modalFilter.style.display = "none";
});

searchBtn.addEventListener("click", () => {
  imgContainer.innerHTML = "";
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
const loader = document.querySelector(".loader");
const searchClickBtn = document.querySelector("#direct-search-btn");
searchClickBtn.addEventListener("click", () => {
  const word = document.querySelector(".func-direct-search > input").value;
  loader.style.display = "block";
  fetch("http://localhost:8080/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ word: word }),
  })
    .then((res) => res.json())
    .then((json) => {
      loader.style.display = "none";
      imgContainer.innerHTML = "";
      movies = json.movies;

      movies.forEach((movie, idx) => {
        //movie.title, movie.link, movie.imgSrc
        const articleTag = document.createElement("article");
        if (
          !movie.imgSrc.includes("poster_default") &&
          !movie.imgSrc.includes("dft_img")
        ) {
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

const posterEle = document.querySelector(".modal-body .poster"); //1. 포스터 이미지
const titleEle = document.querySelector(".modal-body .info .title"); //2. 제목
const genreEle = document.querySelector(".modal-body .info .genre"); //3. 장르
const nationEle = document.querySelector(".modal-body .info .nation"); //4. 국가
const timeEle = document.querySelector(".modal-body .info .time"); //5. 러닝타임
const openEle = document.querySelector(".modal-body .info .open"); //6. 개봉일자
const storyEle = document.querySelector(".modal-body .info .story"); //7. 줄거리

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
  console.log(typeof movies[movieIdx], movies[movieIdx]); //undefined => modal X

  if (!movies[movieIdx]) {
    return;
  }

  const title =
    "title" in movies[movieIdx]
      ? movies[movieIdx].title
      : console.log(movies[movieIdx]);
  const imgSrc = movies[movieIdx].imgSrc;
  const link = movies[movieIdx].link;

  //fetch 작업이 끝나면 다시 클릭하도록
  console.log("user click !!!"); //사용자가 클릭하면 더 이상 클릭을 못 하도록
  //영화 정보 페이지 link를 주고 해당 영화 관련 정보들 받아오기
  loader.style.display = "block";
  fetch("http://localhost:8080/modal", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ link: link }),
  })
    .then((res) => res.json())
    .then((json) => {
      loader.style.display = "none";

      const content = json.content;
      //1. 포스터 이미지
      if (
        !imgSrc.includes("poster_default") &&
        !imgSrc.includes("dft_img") &&
        imgSrc !== ""
      ) {
        posterEle.style.backgroundImage = `url(${imgSrc})`;
      } else {
        posterEle.style.backgroundImage = `url(./img/noimg.jpg)`;
      }

      //2. 제목
      titleEle.innerText = `${title}`;

      //3. 장르
      if (content.genre) {
        genreEle.innerHTML = `
        <strong>장르</strong> ${content.genre}
        `;
      } else {
        genreEle.innerHTML = "";
      }

      //4. 국가
      if (content.nation) {
        nationEle.innerHTML = `
        <strong>국가</strong> ${content.nation}
        `;
      } else {
        nationEle.innerHTML = "";
      }

      //5. 러닝타임
      if (content.time) {
        timeEle.innerHTML = `
        <strong>러닝타임</strong> ${content.time}
        `;
      } else {
        timeEle.innerHTML = "";
      }

      //6. 개봉일
      const open = content.date;
      if (open) {
        const year = open.slice(0, 4);
        const month = open.slice(4, 6).replace("0", "");
        const day = open.slice(6).replace("0", "");
        openEle.innerHTML = ` 
        <strong>개봉일자</strong> ${year}년 ${month}월 ${day}일
        `;
      } else {
        openEle.innerHTML = "";
      }

      //7. 줄거리
      if (content.story) {
        storyEle.innerHTML = `
        <strong>줄거리</strong><br>
        ${content.story}
        `;
      } else {
        storyEle.innerHTML = "";
      }

      //해당 영화에 대한 link를 주고 json을 통해 받은
      //영화 관련 정보들 받아서 모달 생성
      modal.style.display = "block";
    });
});

//////////////////////////////////////////////////////////select bar

let filterJSON = {
  genre: 0,
  open: 0,
  nation: "",
};

let texts = {
  genre: "없음",
  open: "없음",
  nation: "없음",
};

// const element = document.querySelector(".filter");

const genreTitle = document.getElementById("genre-title");
const yearTitle = document.getElementById("year-title");
const countryTitle = document.getElementById("country-title");

const genreContent = document.querySelector(".genre-content");
const yearContent = document.querySelector(".year-content");
const countryContent = document.querySelector(".country-content");

genreTitle.addEventListener("click", () => {
  // console.log(genreContent.classList);
  console.log("genretitle");
  if (yearContent.classList.contains("show")) {
    console.log("yearcontent");
    yearContent.classList.remove("show");
    yearContent.classList.add("noshow");
  }
  if (countryContent.classList.contains("show")) {
    countryContent.classList.remove("show");
    countryContent.classList.add("noshow");
  }
  if (genreContent.classList.contains("noshow")) {
    console.log("genrecontent");

    genreContent.classList.remove("noshow");
    genreContent.classList.add("show");
  }

  if (yearTitle.classList.contains("emphasis")) {
    console.log("yearcontent");
    yearTitle.classList.remove("emphasis");
    // yearContent.classList.add("noshow");
  }
  if (countryTitle.classList.contains("emphasis")) {
    countryTitle.classList.remove("emphasis");
    // countryContent.classList.add("noshow");
  }
  if (!genreTitle.classList.contains("emphasis")) {
    // console.log("genrecontent");

    // genreContent.classList.remove("noshow");
    genreTitle.classList.add("emphasis");
  }
});

yearTitle.addEventListener("click", () => {
  if (genreContent.classList.contains("show")) {
    console.log("genecontent");
    genreContent.classList.remove("show");
    genreContent.classList.add("noshow");
    console.log(genreContent.classList);
  }
  if (countryContent.classList.contains("show")) {
    countryContent.classList.remove("show");
    countryContent.classList.add("noshow");
  }
  if (yearContent.classList.contains("noshow")) {
    console.log("yearcontent");
    yearContent.classList.remove("noshow");
    yearContent.classList.add("show");
  }

  if (genreTitle.classList.contains("emphasis")) {
    // console.log("yearcontent");
    genreTitle.classList.remove("emphasis");
    // yearContent.classList.add("noshow");
  }
  if (countryTitle.classList.contains("emphasis")) {
    countryTitle.classList.remove("emphasis");
    // countryContent.classList.add("noshow");
  }
  if (!yearTitle.classList.contains("emphasis")) {
    // console.log("genrecontent");

    // genreContent.classList.remove("noshow");
    yearTitle.classList.add("emphasis");
  }
});

countryTitle.addEventListener("click", () => {
  if (yearContent.classList.contains("show")) {
    yearContent.classList.remove("show");
    yearContent.classList.add("noshow");
  }
  if (genreContent.classList.contains("show")) {
    genreContent.classList.remove("show");
    genreContent.classList.add("noshow");
  }
  if (countryContent.classList.contains("noshow")) {
    countryContent.classList.remove("noshow");
    countryContent.classList.add("show");
  }

  if (genreTitle.classList.contains("emphasis")) {
    // console.log("yearcontent");
    genreTitle.classList.remove("emphasis");
    // yearContent.classList.add("noshow");
  }
  if (yearTitle.classList.contains("emphasis")) {
    yearTitle.classList.remove("emphasis");
    // countryContent.classList.add("noshow");
  }
  if (!countryTitle.classList.contains("emphasis")) {
    // console.log("genrecontent");

    // genreContent.classList.remove("noshow");
    countryTitle.classList.add("emphasis");
  }
});

// const element = document.querySelector(".filter");

// const genreTitle = document.getElementById("genre-title");
// const yearTitle = document.getElementById("year-title");

// const genreSelect = document.querySelector(".genre-select");
// const yearSelect = document.querySelector(".year-select");
// // const countrySelect = document.querySelector(".country-select");

const genreValue = document.querySelector("#genre-selected-value");
const yearValue = document.querySelector("#year-selected-value");
const countryValue = document.querySelector("#country-selected-value");

genreContent.addEventListener("click", (e) => {
  console.log(e.target.value);
  if (e.target.value === undefined || e.target.value === "0") {
    return;
  }

  genreValue.textContent = e.target.textContent;

  filterJSON.genre = e.target.value;
  texts.genre = e.target.innerText;
  if (genreContent.classList.contains("show")) {
    console.log("genrecontent");

    genreContent.classList.remove("show");
    genreContent.classList.add("noshow");
  }
});

yearContent.addEventListener("click", (e) => {
  console.log(e.target.value);

  if (e.target.value === undefined || e.target.value === "0") {
    return;
  }

  yearValue.textContent = e.target.textContent;

  filterJSON.open = e.target.value;
  texts.open = e.target.innerText;

  if (yearContent.classList.contains("show")) {
    console.log("yearcontent");

    yearContent.classList.remove("show");
    yearContent.classList.add("noshow");
  }
});

countryContent.addEventListener("click", (e) => {
  console.log(e.target.id);

  if (e.target.value === undefined || e.target.value === "0") {
    return;
  }

  countryValue.textContent = e.target.textContent;

  filterJSON.nation = e.target.id;
  texts.nation = e.target.innerText;

  // console.log(e.target.value);
  if (countryContent.classList.contains("show")) {
    console.log("yearcontent");

    countryContent.classList.remove("show");
    countryContent.classList.add("noshow");
  }
});

const filterSearchBtn = document.getElementById("filter-search-btn");
const filterContent = document.querySelector(".func-filter-search-content");
const warning = document.querySelector(".warning");
filterSearchBtn.addEventListener("click", () => {
  if (
    filterJSON.genre === 0 &&
    filterJSON.nation === "" &&
    filterJSON.open === 0
  ) {
    if (warning.classList.contains("hiddenClass")) {
      warning.classList.remove("hiddenClass");
      warning.classList.add("visibleClass");
    }
    return;
  }

  if (warning.classList.contains("visibleClass")) {
    warning.classList.remove("visibleClass");
    warning.classList.add("hiddenClass");
  }
  let txt = document.createTextNode(
    `장르: ${texts.genre}, 개봉년대: ${texts.open}, 국가: ${texts.nation}`
  );
  if (filterContent.firstChild) {
    filterContent.replaceChild(txt, filterContent.firstChild);
  } else {
    filterContent.appendChild(txt);
  }

  modalFilter.style.display = "none";
  loader.style.display = "block";

  fetch("http://localhost:8080/filterSearchModal", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ json: filterJSON }),
  })
    .then((res) => res.json())
    .then((json) => {
      loader.style.display = "none";
      imgContainer.innerHTML = "";
      movies = json.movies;
      // console.log(movies);
      movies.forEach((movie, idx) => {
        //movie.title, movie.link, movie.imgSrc
        const articleTag = document.createElement("article");
        if (
          !movie.imgSrc.includes("poster_default") &&
          !movie.imgSrc.includes("dft_img") &&
          movie.imgSrc !== ""
        ) {
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
