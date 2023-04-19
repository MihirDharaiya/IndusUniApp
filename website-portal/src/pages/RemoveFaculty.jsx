import React, { useEffect, useState } from "react";
import "./styles/RemoveFaculty.css";
import {
  getFirestore,
  getDocs,
  collection,
  query,
  orderBy,
} from "firebase/firestore";
import app from "../firebase";
function RemoveFaculty(props) {
  const db = getFirestore(app);
  const [faculty, setFaculty] = useState([]);

  const getFaculty = async () => {
    const docRef = query(collection(db, "faculty"), orderBy("fid"));
    const docSnap = await getDocs(docRef);
    var arr = [];
    var arrId = [];
    docSnap.forEach((doc) => {
      arr.push(doc.data());
      arrId.push(doc.id);
    });

    for (let i = 0; i < arr.length; i++) {
      arr[i]["facultyId"] = arrId[i];
    }
    setFaculty(arr);
  };
  const FacultyRemove = async (userId) => {
    console.log(userId);
    fetch(`https://wpbackend-6sx9.onrender.com/users/${userId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          getFaculty();
          alert("Faculty is deleted from the University Database.");
        } else {
          alert("Error deleting Faculty from the Database.");
        }
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    getFaculty();
  }, [1]);
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
                      onClick={(event) => FacultyRemove(faculty.facultyId)}
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
