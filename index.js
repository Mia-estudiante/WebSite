"use restrict";

const introText = document.querySelector(".text");
const signUpBtn = document.querySelector("#signup");
const signInBtn = document.querySelector("#signin");

function loadIntroText() {
  return fetch("data/intro.json")
    .then((texts) => texts.json())
    .then((json) => json.intro);
}

let idx = 0;
loadIntroText().then((texts) => {
  showIntro(texts, idx);
});

function showIntro(texts, idx) {
  const keys = Object.keys(texts);
  let key = keys[idx];
  introText.innerText = texts[key];
  // idx++;
  // setTimeout(showIntro(texts,idx), 2000);
}

signUpBtn.addEventListener("click", () => {
  location.href = "signup.html";
});

signInBtn.addEventListener("click", () => {
  location.href = "signin.html";
});
