import React from "react";
import "./styles/RemoveFaculty.css";
function RemoveFaculty(props) {
  return (
    <div className="backgroundimage">
      <div className="main-div">
        <div className="box">
          <table>
            <tr>
              <th>Name</th>
              <th>ID No.</th>
              <th>Branch</th>
              <th>Position</th>
            </tr>
            <br />
            <tr className="list-row">
              <td style={{ width: "45%" }}>Jainish Patel</td>
              <td>Maria Anders</td>
              <td>Germany</td>
              <td>Germany</td>
              <td>
                <button type="button" class="btn btn-danger">
                  Remove
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

export default RemoveFaculty;
