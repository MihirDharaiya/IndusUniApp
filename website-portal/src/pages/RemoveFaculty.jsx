import React, { useEffect, useState } from "react";
import "./styles/RemoveFaculty.css";
import { getFirestore, getDocs, collection, query } from "firebase/firestore";
import app from "../firebase";
function RemoveFaculty(props) {
  const db = getFirestore(app);
  const [faculty, setFaculty] = useState([]);

  const getFaculty = async () => {
    const docRef = query(collection(db, "faculty"));
    const docSnap = await getDocs(docRef);
    var arr = [];
    docSnap.forEach((doc) => {
      arr.push(doc.data());
    });

    setFaculty(arr);
  };
  useEffect(() => {
    getFaculty();
  }, [1]);

  const Remove = async (event, fid) => {};
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

            {faculty.map((faculty) => (
              <>
                <br />
                <tr className="list-row">
                  <td style={{ width: "40%" }}>{faculty.fname}</td>
                  <td>{faculty.fid}</td>
                  <td>{faculty.fbranch}</td>
                  <td>{faculty.fposition}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-danger"
                      onClick={(event) => Remove(event, faculty.fid)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              </>
            ))}
            <br />
          </table>
        </div>
      </div>
    </div>
  );
}

export default RemoveFaculty;
