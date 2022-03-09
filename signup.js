"use strict";

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
const emailAuthBtn = document.querySelector("#emailAuth");
const emailBtn = document.querySelector("#nextBtn");

const email = document.querySelector("#emailComp");

const okStyle = "3px solid #9cff57";
const noStyle = "3px solid #e91e63";

let isEmail = false; //이메일을 입력했는가
let isEmailinDB = false; //중복확인 여부
let isEmailValid = false; //이메일 인증했는가
let activeTimer = 0; //인증요청을 클릭했는가

//모달창 닫기 버튼
const modal1 = document.querySelector(".modalContainer1");
const closeBtn1 = document.querySelector("#closeBtn1");
closeBtn1.addEventListener("click", () => {
  modal1.classList.remove("showModal");
});

const emailRule =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const minute = document.querySelector("#min");
const second = document.querySelector("#sec");
// let timeInterval = 0;

function timerPrint(sec, min) {
  // if (!(sec == 0 && min == 0)) {
  minute.innerText = min;
  // }
  sec == 0 ? (second.innerText = "00") : (second.innerText = sec);
  console.log("초 프린트");
}

function timerStart() {
  let sec = 0;
  let min = 3;

  setTimeout(function repeat() {
    if (sec == 0 && min == 0) {
      activeTimer = 0;
      timerPrint(0, 3);
      clearInterval(timeInterval);
    }
    if (sec != 0) {
      sec--;
    } else {
      min--;
      if (min >= 0) {
        sec = 59;
      }
    }
    timerPrint(sec, min);
    if (min >= 0 && sec >= 0) {
      setTimeout(repeat, 1000);
    }
  }, 1000);
}

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
      break;
    case 6:
      text = "이미 존재하는 이메일입니다.";
      break;
    case 7:
      text = "이메일 중복 확인을 먼저 수행해주세요.";
      break;
    default:
      console.log("default");
  }
  span.innerText = text;
  parent.append(span);
  input.style.border = noStyle;
}

function removeAlert(input, id) {
  document.querySelector(id).remove();
  input.style.border = okStyle;
}

/**
 * 다음 버튼 클릭
 */
emailBtn.addEventListener("click", () => {
  //1) 이메일 형식 확인
  if (emailRule.test(emailInput1.value) && isEmailValid) {
    isEmail = true;
    if (document.querySelector("#alert1")) {
      removeAlert(emailInput1, "#alert1");
    }
    emailInput1.style.border = okStyle;
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

  //3) 이메일 형식 및 인증 완료
  if (isEmail && isEmailValid) {
    article1.style.display = "none";
    article2.style.display = "";
    console.log("다음으로 이동");

    email.value = emailInput1.value;
    email.style.border = okStyle;
  } else {
    console.log("이동 못해");
  }
});

/**
 * 중복 확인 버튼 클릭
 */
emailCheckBtn.addEventListener("click", () => {
  console.log("중복확인");
  emailInput1.value ? (isEmail = true) : (isEmail = false);

  if (isEmail) {
    if (emailRule.test(emailInput1.value)) {
      fetch("http://localhost:8080/emailCheck", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: emailInput1.value,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          isEmailinDB = json.result;
          console.log(isEmailinDB);
          if (isEmailinDB) {
            if (document.querySelector("#alert1")) {
              removeAlert(emailInput1, "#alert1");
            }
            // if (document.querySelector("#alert2")) {
            //   removeAlert(emailInput2, "#alert2");
            // }
            emailInput1.style.border = okStyle;
            // emailInput2.style.border = okStyle;
          } else {
            if (!document.querySelector("#alert1")) {
              createAlert(alertParent1, emailInput1, "alert1", 6);
            } else {
              // emailInput1.style.border = noStyle;
              document.querySelector("#alert1").innerText =
                "이미 존재하는 이메일입니다.";
            }
          }
        });
    } else {
      isEmail = false;
      if (!document.querySelector("#alert1")) {
        createAlert(alertParent1, emailInput1, "alert1", 1);
      } else {
        document.querySelector("#alert1").innerText =
          "잘못된 형식의 이메일 주소입니다. 정확한 이메일 주소를 입력해 주세요.";
      }
    }
  } else {
    if (!document.querySelector("#alert1")) {
      createAlert(alertParent1, emailInput1, "alert1", 3);
    } else {
      document.querySelector("#alert1").innerText =
        "인증번호를 전송할 이메일 주소를 입력해 주세요.";
    }
  }
});

emailAuthBtn.addEventListener("click", () => {
  if (isEmail && isEmailinDB) {
    ++activeTimer == 1 ? timerStart() : modal1.classList.add("showModal");
  } else {
    if (!document.querySelector("#alert1")) {
      createAlert(alertParent1, emailInput1, "alert1", 7);
    } else {
      document.querySelector("#alert1").innerText =
        "이메일 중복 확인을 먼저 수행해주세요.";
    }
  }
  //       if (isEmailValid) {
  //         if (document.querySelector("#alert1")) {
  //           removeAlert(emailInput1, "#alert1");
  //         }
  //         if (document.querySelector("#alert2")) {
  //           removeAlert(emailInput2, "#alert2");
  //         }
  //         emailInput1.style.border = okStyle;
  //         emailInput2.style.border = okStyle;
  //         ///////////////////////////////////////////////인증번호 구현
  //         /////////////////////////////////////////////////////타이머 시작
  //         timerStart();
  //       } else {
  //         if (!document.querySelector("#alert1")) {
  //           createAlert(alertParent1, emailInput1, "alert1", 6);
  //         }
  //       }
  //     });
  // } else {
  //   isEmail = false;
  //   if (!document.querySelector("#alert2")) {
  //     createAlert(alertParent2, emailInput2, "alert2", 3);
  //   } else {
  //     document.querySelector("#alert2").innerText =
  //       "인증번호를 전송할 이메일 주소를 입력해 주세요.";
  //   }
  // }
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
const modal2 = document.querySelector(".modalContainer2");
const closeBtn2 = document.querySelector("#closeBtn2");
closeBtn2.addEventListener("click", () => {
  modal2.classList.remove("showModal");
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
    pwInput.style.border = okStyle;
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
    pwdoubleInput.style.border = okStyle;
  } else {
    doubleCheck = false;
    if (!document.querySelector("#alert4")) {
      createAlert(alertParent4, pwdoubleInput, "alert4", 5);
    }
  }

  //3) 이름
  if (!nameInput.value) {
    nameCheck = false;
    nameInput.style.border = noStyle;
  } else {
    nameCheck = true;
    nameInput.style.border = okStyle;
  }

  //4) 생년월일
  if (year.value === "none") {
    birthCheck = false;
    year.style.border = noStyle;
  } else {
    birthCheck = true;
    year.style.border = okStyle;
  }
  if (month.value === "none") {
    birthCheck = false;
    month.style.border = noStyle;
  } else {
    birthCheck = true;
    month.style.border = okStyle;
  }
  if (date.value === "none") {
    birthCheck = false;
    date.style.border = noStyle;
  } else {
    birthCheck = true;
    date.style.border = okStyle;
  }

  if (ispwValid && doubleCheck && nameCheck && birthCheck) {
    //////////////////////////////////////////////////////////////////////////////이때 정보 저장

    const obj = {
      id: email.value,
      pw: pwInput.value,
      name: nameInput.value,
      birth: `${year.value}-${month.value}-${date.value}`,
    };
    // console.log(obj);
    fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.result) {
          //가입완료 modal
          modal2.classList.add("showModal");
        }
      });

    // window.location.href = "index.html";   //가입 완료 후, 메인 페이지로 이동
  }
});
