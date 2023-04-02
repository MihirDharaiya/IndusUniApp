import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles/MoreDetails.css";
import emailjs from "@emailjs/browser";
import {
  query,
  doc,
  deleteDoc,
  getFirestore,
  where,
  collection,
  getDocs,
} from "firebase/firestore";
import app from "../firebase";
import { useNavigate } from "react-router-dom";
const MoreDetails = (props) => {
  const navigate = useNavigate();
  const db = getFirestore(app);
  const location = useLocation();
  const data = location.state.data;
  const sendEmail = (templateParams) => {
    emailjs
      .send(
        "service_njnb2xo",
        "report_student_temp",
        templateParams,
        "Co8Ys7rNCdrgjoIJD"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  const deleteStudentData = async () => {
    const docRef = doc(db, "reportedstudents", data.docId);
    await deleteDoc(docRef);
  };
  const warnStudent = async () => {
    let email = "";
    const user = collection(db, "users");
    const q = query(
      user,
      where("enrollnmentNumber", "==", data.enrollnmentNumber)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      email = doc.data().email;
    });
    var templateParams = {
      name: data.name,
      email: email,
      reason: data.reason,
      date: data.date,
      subject: data.subject,
      description: data.description,
    };
    await sendEmail(templateParams);
    await deleteStudentData();
    navigate("/Reported-Student-List", { replace: true });
    alert("Student is being notified.");
    return true;
  };

  return (
    <div className="backgroundimage">
      <div className="main-div">
        <div className="box">
          <h1 className="main-title">Student Details</h1>
          <div className="details-main-div">
            <div className="details-inner-div">
              <div className="details-div">
                <h3>Name: </h3>
                <h3 className="red-detail">{data.name}</h3>
              </div>
              <div className="details-div">
                <h3>Reported on: </h3>
                <h3 className="green-detail">{data.date}</h3>
              </div>
            </div>
            <div className="details-inner-div">
              <div className="details-div">
                <h3>Branch: </h3>
                <h3 className="red-detail">{data.branch}</h3>
              </div>
              <div className="details-div">
                <h3>Enroll no: </h3>
                <h3 className="red-detail">{data.enrollnmentNumber}</h3>
              </div>
            </div>
            {data.raised === "faculty" ? (
              <div className="doubt-div">
                <div className="doubt-inner-div">
                  <h3>Subject: </h3>
                  <h3 className="red-detail">{data.subject}</h3>
                </div>
                <div className="doubt-inner-div">
                  <h3>Description: </h3>
                  <h3>{data.description}</h3>
                </div>
              </div>
            ) : null}
            <div className="doubt-div">
              <div className="doubt-inner-div">
                <h3>Reported By: </h3>
                <h3 className="red-detail">
                  {data.raised === "faculty" ? data.fname : data.reportedBy}
                </h3>
              </div>
              <div className="doubt-inner-div">
                <h3>Reason: </h3>
                <h3 id="reason">{data.reason}</h3>
              </div>
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
              <button
                type="submit"
                className="btn btn-danger mx-auto"
                id="doubt-btn"
                onClick={warnStudent}
                state={{
                  data: data,
                }}
              >
                Take Action
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreDetails;
