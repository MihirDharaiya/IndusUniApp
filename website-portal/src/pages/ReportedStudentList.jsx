import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/ReportedStudentList.css";
import { getFirestore, getDocs, collection, query } from "firebase/firestore";
import app from "../firebase";
function ReportedStudentList(props) {
  const db = getFirestore(app);
  const [data, setData] = useState([]);
  const getReportedStudetns = async () => {
    const docRef = query(collection(db, "reportedstudents"));
    const docSnap = await getDocs(docRef);
    var arr = [];
    var arrId = [];
    docSnap.forEach((doc) => {
      arr.push(doc.data());
      arrId.push(doc.id);
    });
    for (let i = 0; i < arr.length; i++) {
      arr[i]["docId"] = arrId[i];
    }
    setData(arr);
  };
  useEffect(() => {
    getReportedStudetns();
  }, [1]);
  return (
    <div className="backgroundimage">
      <div className="main-div">
        <div className="box">
          <table>
            <tr>
              <th>Name</th>
              <th>Enroll No.</th>
              <th>Branch</th>
              <th>Action</th>
            </tr>
            <br />
            {data.map((data) => (
              <>
                <br />
                <tr className="list-row">
                  <td style={{ width: "35%" }}>{data.name}</td>
                  <td>{data.enrollnmentNumber}</td>
                  <td>{data.branch}</td>
                  <td style={{ width: "25%" }}>
                    {data.raised === "faculty" ? (
                      <Link
                        className="btn btn-danger"
                        id="student-btn"
                        to="/Reported-Student-List/More-Details"
                        state={{
                          data: data,
                        }}
                      >
                        View Deatils
                      </Link>
                    ) : (
                      <Link
                        className="btn btn-warning"
                        id="student-btn"
                        to="/Reported-Student-List/More-Details"
                        state={{
                          data: data,
                        }}
                      >
                        View Deatils
                      </Link>
                    )}
                  </td>
                </tr>
              </>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}
export default ReportedStudentList;
