import React, { useState } from "react";
import "./styles/AddFaculty.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faAt,
  faBuilding,
  faIdCardClip,
  faGraduationCap,
  faSignature,
} from "@fortawesome/free-solid-svg-icons";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import app from "../firebase";
import { useUserAuth } from "../context/UserAuthContext";
import emailjs from "emailjs-com";
function AddFaculty(props) {
  const [email, setEmail] = useState("");
  const [branch, setBranch] = useState("");
  const [position, setPosition] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [id, setId] = useState("");
  const [password, setPasword] = useState("");
  const { signUp } = useUserAuth();
  const db = getFirestore(app);

  function generatePassword() {
    var chars =
      "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var passwordLength = 6;
    var password = "";
    for (var i = 0; i <= passwordLength; i++) {
      var randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }
    const pass = firstname.slice(0, 4) + password;
    setPasword(pass.trim());
  }
  const sendEmail = (e, fullname) => {
    e.preventDefault();
    var templateParams = {
      name: fullname,
      email: email,
      password: password,
    };
    emailjs
      .sendForm(
        "service_njnb2xo",
        "template_022czgd",
        templateParams,
        "Co8Ys7rNCdrgjoIJD"
      )
      .then((error) => {
        alert(error.text);
      });
  };
  function camelize(str) {
    return str.replace(/\W+(.)/g, function (match, chr) {
      return chr.toUpperCase();
    });
  }
  function reset(e) {
    e.preventDefault();
    setBranch("");
    setEmail("");
    setFirstname("");
    setLastname("");
    setPosition("");
    setPasword("");
    setId("");
    document.getElementById("faculty-form").reset();
  }

  const onSubmit = async (e) => {
    setFirstname(camelize(firstname));
    setLastname(camelize(lastname));

    generatePassword();
    const fullname = firstname + " " + lastname;
    e.preventDefault();

    await signUp(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User Added :", user);
        setDoc(doc(db, "faculty", user.uid), {
          email: email,
          name: fullname,
          branch: branch,
          position: position,
          id: id,
        });
      })
      .then(() => {
        alert("New faculty is added to the organisation.");
        console.log(email);
        console.log(password);
        reset();
        sendEmail(fullname);
      })
      .then((error) => {
        alert(error.text);
      });
  };
  const refresh = () => window.location.reload(true);
  return (
    <div className="backgroundimage">
      <div className="main-div">
        <div className="box">
          <div className="form-div">
            <form onSubmit={onSubmit} id="faculty-form">
              <div className="input-div mb-3">
                <label className="form-label" id="input-title">
                  {" "}
                  <FontAwesomeIcon icon={faUser} id="icon" size="l" />{" "}
                  Firstname:{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputField"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                />
              </div>

              <div className="input-div mb-3">
                <label className="form-label" id="input-title">
                  {" "}
                  <FontAwesomeIcon icon={faSignature} id="icon" size="l" />{" "}
                  Lastname:{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputField"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  required
                />
              </div>

              <div className="input-div mb-3">
                <label className="form-label" id="input-title">
                  <FontAwesomeIcon icon={faAt} id="icon" size="l" />
                  Email ID:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="inputField"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-div mb-3">
                <label className="form-label" id="input-title">
                  <FontAwesomeIcon icon={faBuilding} id="icon" size="l" />
                  Branch:
                </label>
                <select
                  class="form-control"
                  id="inputField"
                  value={branch}
                  placeholder="Select Option"
                  onChange={(e) => setBranch(e.target.value)}
                >
                  <option></option>
                  <option>CSE</option>
                  <option>CE</option>
                  <option>IT</option>
                  <option>EE</option>
                  <option>EC</option>
                  <option>ME</option>
                  <option>Civil</option>
                </select>
              </div>
              <div className="input-div mb-3">
                <label className="form-label" id="input-title">
                  <FontAwesomeIcon icon={faIdCardClip} id="icon" size="l" />
                  ID Number:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputField"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  required
                />
              </div>
              <div class="form-group input-div">
                <label className="form-label" id="input-title">
                  <FontAwesomeIcon icon={faGraduationCap} id="icon" size="l" />
                  Position:
                </label>
                <select
                  class="form-control"
                  id="inputField"
                  value={position}
                  placeholder="Select Option"
                  onChange={(e) => setPosition(e.target.value)}
                >
                  <option></option>
                  <option>Assistant Professor</option>
                  <option>Associate Professor</option>
                  <option>Professor</option>
                </select>
              </div>

              <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                <button type="submit" className="btn btn-lg " id="submit-btn">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddFaculty;
