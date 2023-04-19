import React, { useEffect, useState } from "react";
import "./styles/AddFaculty.css";
import {
  getFirestore,
  getDocs,
  collection,
  query,
  orderBy,
} from "firebase/firestore";
import app from "../firebase";

function AllPastEvents(props) {
  const db = getFirestore(app);
  const [events, setEvents] = useState([]);
  const getEvents = async () => {
    const docRef = query(collection(db, "events"), orderBy("date", "desc"));
    const docSnap = await getDocs(docRef);
    var arr = [];
    docSnap.forEach((doc) => {
      arr.push(doc.data());
    });

    setEvents(arr);
  };
  useEffect(() => {
    getEvents();
  }, [1]);
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
            {events.map((event) => (
              <>
                <br />
                <tr className="list-row">
                  <td>{event.title}</td>
                  <td>
                    <strong>{event.date}</strong>
                  </td>
                  <td style={{ width: "35%" }}>{event.fname}</td>
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

export default AllPastEvents;
