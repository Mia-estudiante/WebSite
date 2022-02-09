"use restrict";

const signInBtn = document.querySelector("#signin");
signInBtn.addEventListener("click", () => {
  location.href = "signin.html";
});

//////////////////////////////////////////////////////////////////////////////이메일 인증 페이지

const article1 = document.querySelector(".containerItem1");
const article2 = document.querySelector(".containerItem2");

const alertParent1 = document.querySelector(".emailContainer1");
const alertParent2 = document.querySelector(".emailContainer2");
const emailInput1 = document.querySelector("#email");
const emailInput2 = document.querySelector("#emailVerifi");

const emailCheckBtn = document.querySelector("#emailCheck");
const emailBtn = document.querySelector("#nextBtn");

const email = document.querySelector("#emailComp");

let isEmail = false; //이메일을 입력했는가
let isEmailValid = false; //이메일 인증했는가

const emailRule =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function createAlert(parent, input, id, opt) {
  const span = document.createElement("span");
  span.setAttribute("id", id);

  let text;
  switch (opt) {
    case 1:
      text =
        "잘못된 형식의 이메일 주소입니다. 정확한 이메일 주소를 입력해 주세요.";
      break;
    case 2:
      text = "이메일 인증을 수행해주세요.";
      break;
    case 3:
      text = "인증번호를 전송할 이메일 주소를 입력해 주세요.";
      break;
    case 4:
      text = "8~16자 영문, 숫자, 특수문자를 사용하세요.";
      break;
    case 5:
      text = "비밀번호가 일치하지 않습니다.";
  }
  span.innerText = text;
  parent.append(span);
  input.style.border = "3px solid #e91e63";
}

function removeAlert(input, id) {
  document.querySelector(id).remove();
  input.style.border = "3px solid #9cff57";
}

emailBtn.addEventListener("click", () => {
  //1) 이메일 형식 확인
  if (emailRule.test(emailInput1.value)) {
    isEmail = true;
    if (document.querySelector("#alert1")) {
      removeAlert(emailInput1, "#alert1");
    }
    emailInput1.style.border = "3px solid #9cff57";
  } else {
    isEmail = false;
    if (!document.querySelector("#alert1")) {
      createAlert(alertParent1, emailInput1, "alert1", 1);
    }
  }

  //2) 이메일 인증 확인
  if (!isEmailValid) {
    if (!document.querySelector("#alert2")) {
      createAlert(alertParent2, emailInput2, "alert2", 2);
    } else {
      document.querySelector("#alert2").innerText =
        "이메일 인증을 수행해주세요.";
    }
  }

  console.log("asdfasdf");
  //3) 이메일 형식 및 인증 완료
  if (isEmail && isEmailValid) {
    article1.style.display = "none";
    article2.style.display = "";
    console.log("다음으로 이동");

    email.value = emailInput1.value;
    email.style.border = "3px solid #9cff57";
  } else {
    console.log("이동 못해");
  }
});

emailCheckBtn.addEventListener("click", () => {
  if (emailRule.test(emailInput1.value)) {
    isEmail = true;
    isEmailValid = true;
    if (document.querySelector("#alert1")) {
      removeAlert(emailInput1, "#alert1");
    }
    if (document.querySelector("#alert2")) {
      removeAlert(emailInput2, "#alert2");
    }
    emailInput1.style.border = "3px solid #9cff57";
    emailInput2.style.border = "3px solid #9cff57";

    alert("인증번호 전송");

    /////////////////////////////////////////////////////타이머 시작
  } else {
    isEmail = false;
    if (!document.querySelector("#alert2")) {
      createAlert(alertParent2, emailInput2, "alert2", 3);
    } else {
      document.querySelector("#alert2").innerText =
        "인증번호를 전송할 이메일 주소를 입력해 주세요.";
    }
  }
});

//////////////////////////////////////////////////////////////////////////////다음 페이지
const selectYear = document.querySelector("#year");
const selectMonth = document.querySelector("#month");
const selectDate = document.querySelector("#date");
const thisYear = new Date().getFullYear();

for (let i = thisYear - 100; i <= thisYear; i++) {
  const element = document.createElement("option");
  element.innerText = `${i}`;
  selectYear.append(element);
}

for (let i = 1; i <= 12; i++) {
  const element = document.createElement("option");
  element.innerText = `${i}`;
  selectMonth.append(element);
}

for (let i = 1; i <= 31; i++) {
  const element = document.createElement("option");
  element.innerText = `${i}`;
  selectDate.append(element);
}

//모달창 닫기 버튼
const modal = document.querySelector(".modalContainer");
const closeBtn = document.querySelector("#closeBtn");
closeBtn.addEventListener("click", () => {
  modal.classList.remove("showModal");
});

//영문 숫자 특수문자 혼합해서 8자리~16자리
const pwRule =
  /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;

const signupBtn = document.querySelector("#signupBtn");

const pwInput = document.querySelector("#pw");
const pwdoubleInput = document.querySelector("#pwdouble");
const nameInput = document.querySelector("#name");

const alertParent3 = document.querySelector(".item2");
const alertParent4 = document.querySelector(".item3");

const year = document.querySelector("#year");
const month = document.querySelector("#month");
const date = document.querySelector("#date");

let ispwValid = false;
let doubleCheck = false;
let nameCheck = false;
let birthCheck = false;

signupBtn.addEventListener("click", () => {
  //1) 비밀번호 확인
  if (pwRule.test(pwInput.value)) {
    ispwValid = true;
    if (document.querySelector("#alert3")) {
      document.querySelector("#alert3").remove();
    }
    pwInput.style.border = "3px solid #9cff57";
  } else {
    ispwValid = false;
    if (!document.querySelector("#alert3")) {
      createAlert(alertParent3, pwInput, "alert3", 4);
    }
  }

  //2) 비밀번호 일치 여부
  if (pwInput.value === pwdoubleInput.value && ispwValid) {
    doubleCheck = true;
    if (document.querySelector("#alert4")) {
      document.querySelector("#alert4").remove();
    }
    pwdoubleInput.style.border = "3px solid #9cff57";
  } else {
    doubleCheck = false;
    if (!document.querySelector("#alert4")) {
      createAlert(alertParent4, pwdoubleInput, "alert4", 5);
    }
  }

  //3) 이름
  if (!nameInput.value) {
    nameCheck = false;
    nameInput.style.border = "3px solid #e91e63";
  } else {
    nameCheck = true;
    nameInput.style.border = "3px solid #9cff57";
  }

  //4) 생년월일
  if (year.value === "none") {
    birthCheck = false;
    year.style.border = "3px solid #e91e63";
  } else {
    birthCheck = true;
    year.style.border = "3px solid #9cff57";
  }
  if (month.value === "none") {
    birthCheck = false;
    month.style.border = "3px solid #e91e63";
  } else {
    birthCheck = true;
    month.style.border = "3px solid #9cff57";
  }
  if (date.value === "none") {
    birthCheck = false;
    date.style.border = "3px solid #e91e63";
  } else {
    birthCheck = true;
    date.style.border = "3px solid #9cff57";
  }

  if (ispwValid && doubleCheck && nameCheck && birthCheck) {
    //가입완료 modal
    modal.classList.add("showModal");

    //////////////////////////////////////////////////////////////////////////////이때 정보 저장

    const obj = {
      id: email.value,
      pw: pwInput.value,
      name: nameInput.value,
      birth: `${year.value}-${month.value}-${date.value}`,
    };

    fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: obj,
      }),
    });

    //     mysql
    // email 		        pw		            name   year    month	 date
    // 이메일 주소 / 비밀번호(by 암호화) / 이름 / 년도 /  월 /  일

    //////////////////////////////////////////////////////////////////////////////이때 정보 저장

    // window.location.href = "index.html";   //가입 완료 후, 메인 페이지로 이동
  }
});
