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
import Navbar from "../components/Navbar";
import Header from "../components/Header";


const Profile = () => {
  const { user ,loading, dispatch} = useContext(AuthContext)
  return (
   <>
   <Navbar />
   <Header type="list" />
    <div className="full">
      <div className="div-card">
      <div className="card">
        <div>
          <img
            className="avatar"
            src= {user.avatar}
            alt="User Avatar"
          />
          <div className="userdetails">
            <h2 className="change-c">{user?.rest?.username|| user.username}</h2>
            <p>{user?.rest?.email|| user.email}</p>
          </div>
          <div>
            <h2 className="change-c">Your Recent Bookings:</h2>
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
            <span className="wrote">Username </span>
             <input  type="username" placeholder={user.username}disabled  />
             
          </label>
          <label>
            <span className="wrote">email</span>
            <input type="email" placeholder= {user.email} disabled />
          </label>
          <label>
            <span className="wrote">user Joined</span>
            <input type="text" placeholder="" disabled />
          </label>
        </div>
      </div>
      </div>
    </div>
    </>
  );
};

export default Profile;
