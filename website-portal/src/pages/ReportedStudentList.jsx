import React from "react";
import "./styles/ReportedStudentList.css";
function ReportedStudentList(props) {
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
            <tr className="list-row">
              <td style={{ width: "35%" }}>Jainish Patel</td>
              <td>Maria Anders</td>
              <td>Germany</td>
              <td style={{ width: "25%" }}>
                <button
                  type="button"
                  className="btn btn-warning"
                  id="student-btn"
                >
                  Warn
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  id="student-btn"
                >
                  Callup
                </button>
              </td>
            </tr>
            <br />
          </table>
        </div>
      </div>
    </div>
  );
}
export default ReportedStudentList;
