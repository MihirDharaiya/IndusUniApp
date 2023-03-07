import React from "react";
import "./styles/AddFaculty.css";
function AllPastEvents(props) {
  return (
    <div className="backgroundimage">
      <div className="main-div">
        <div className="box">
          <table>
            <tr>
              <th>Theme of the Event</th>
              <th>Held on</th>
              <th>Faculty Name</th>
            </tr>
            <br />
            <tr className="list-row">
              <td>Workshop on PCB Design - ESYNC</td>
              <td>
                <strong>12/02/2022</strong>
              </td>
              <td style={{ width: "35%" }}>Jainish Patel</td>
            </tr>
            <br />
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllPastEvents;
