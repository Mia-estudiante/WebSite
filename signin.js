"use strict";

const signUpBtn = document.querySelector("#signup");
signUpBtn.addEventListener("click", () => {
  location.href = "signup.html";
});

function checkEmail() {}

const input1 = document.querySelector("#email");
const input2 = document.querySelector("#pw");

const okStyle = "3px solid #9cff57";
const noStyle = "3px solid #e91e63";

const signInBtn = document.querySelector("#signinBtn");
signInBtn.addEventListener("click", () => {
  if (!input1.value) {
    input1.style.border = noStyle;
  } else {
    input1.style.border = okStyle;
  }
  if (!input2.value) {
    input2.style.border = noStyle;
  } else {
    input2.style.border = okStyle;
  }

  if (input1.value && input2.value) {
    const obj = {
      id: input1.value,
      pw: input2.value,
    };

    fetch("http://localhost:8080/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.result) {
          window.location.href = "main.html";
        } else {
          alert("로그인 실패!");
        }
      });
  }
});
