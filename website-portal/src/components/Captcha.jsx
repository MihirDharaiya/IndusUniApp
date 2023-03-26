import React from "react";
import "./styles/captcha.css";
import Image from "../images/captcha-bg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
const Captcha = () => {
  const captcha = document.querySelector(".captcha"),
    reloadBtn = document.querySelector(".reload-btn"),
    inputField = document.querySelector(".input-area input"),
    checkBtn = document.querySelector(".check-btn"),
    statusTxt = document.querySelector(".status-text");
  let allCharacters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
  ];
  function getCaptcha() {
    for (let i = 0; i < 6; i++) {
      let randomCharacter =
        allCharacters[Math.floor(Math.random() * allCharacters.length)];
      captcha.innerText += ` ${randomCharacter}`;
    }
  }
  getCaptcha();
  reloadBtn.addEventListener("click", () => {
    removeContent();
    getCaptcha();
  });
  checkBtn.addEventListener("click", (e) => {
    e.preventDefault();
    statusTxt.style.display = "block";
    let inputVal = inputField.value.split("").join(" ");
    if (inputVal == captcha.innerText) {
      statusTxt.style.color = "#4db2ec";
      statusTxt.innerText = "Nice! You don't appear to be a robot.";
      setTimeout(() => {
        removeContent();
        getCaptcha();
      }, 2000);
    } else {
      statusTxt.style.color = "#ff0000";
      statusTxt.innerText = "Captcha not matched. Please try again!";
    }
  });
  function removeContent() {
    inputField.value = "";
    captcha.innerText = "";
    statusTxt.style.display = "none";
  }
  return (
    <>
      <div className="wrapper">
        <header>Captcha in JavaScript</header>
        <div className="captcha-area">
          <div className="captcha-img">
            <img src={Image} alt="Captch Background" />
            <span className="captcha"></span>
          </div>
          <button className="reload-btn">
            <FontAwesomeIcon icon={faRotateLeft} id="login-icon" size="xl" />
          </button>
        </div>
        <form action="#" className="input-area">
          <input
            type="text"
            placeholder="Enter captcha"
            maxlength="6"
            spellcheck="false"
            required
          />
          <button className="check-btn">Check</button>
        </form>
        <div className="status-text"></div>
      </div>
    </>
  );
};

export default Captcha;
