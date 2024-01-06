import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import "./profile.css";
import { AuthContext } from "../context/AuthContext";


const Profile = () => {
  const { user ,loading, dispatch} = useContext(AuthContext)
  return (
    <div className="full">
      <div className="div-card">
      <div className="card">
        <div>
          <img
            className="avatar"
            src="https://placekitten.com/150/150"
            alt="User Avatar"
          />
          <div className="userdetails">
            <h2>{user?.rest?.username|| user.username}</h2>
            <p>{user?.rest?.email|| user.email}</p>
          </div>
          <div>
            <h2 className="">Your Recent Bookings:</h2>
            <div className="cardicon">
              <div className="cardListItem">
                <FontAwesomeIcon icon={faBed} />
              </div>
              <div className="cardListItem">
                <FontAwesomeIcon icon={faPlane} />
              </div>
              <div className="cardListItem">
                <FontAwesomeIcon icon={faCar} />
              </div>
              <div className="cardListItem">
                <FontAwesomeIcon icon={faBed} />
              </div>
              <div className="cardListItem">
                <FontAwesomeIcon icon={faTaxi} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cardtwo">
        <h2 className="prohead">Profile Page</h2>
        <div className="disabledFields">
          <label >
            <span >Username </span>
             <input  type="username" placeholder="" disabled  />
             
          </label>
          <label>
            <span>email</span>
            <input type="email" placeholder=""disabled />
          </label>
          <label>
            <span>user Joined</span>
            <input type="text" placeholder="Field 3" disabled />
          </label>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Profile;
