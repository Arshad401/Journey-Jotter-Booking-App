import React, { useContext, useRef, useState } from "react";
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
import moment from "moment";
import { TbCameraPlus } from "react-icons/tb";
import { toast } from "react-toastify";
import AvatarUpload from "../components/AvatarUpload";
import axios from "axios";
import ReservationModal from "../components/ReservationModal";

const Profile = () => {
  const { user,error,dispatch } = useContext(AuthContext);
  const fileRef = useRef(null);
  const [avatar, setavatar] = useState(null);
  // console.log(user);

  const uploadavatar = async (e) => {
    setavatar(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    try {
   
      const url = await AvatarUpload(avatar);

      await axios.put(
        `/api/users/${user._id}/editavatar`,
        {
          Avatar: url,
        },
      );
      toast.success("Updated sucessfully");
      dispatch({ type: "UPDATE_USER_AVATAR", payload: url });

    } catch (error) {
      console.log("from upload", error.message);
      toast.error("updation failed:", error.message);
    }
  };

  return (
    <>
      <Navbar />
      <Header type="list" />
      <div className="full">
        <div className="div-card">
          <div className="card">
            <div>
              <input
                onChange={(e) => uploadavatar(e)}
                type="file"
                ref={fileRef}
                hidden
                accept="image/*"
              />
              <img className="avatar" src={user.avatar} alt="User Avatar" />
              <TbCameraPlus
                className="add-photo"
                onClick={() => fileRef.current.click()}
              />
              {avatar && (
                <button className="upload-button" onClick={handleFileUpload}>
                  Upload
                </button>
              )}

              <div className="userdetails">
                <h2 className="change-c">
                  {user?.rest?.username || user.username}
                </h2>
                <p>{user?.rest?.email || user.email}</p>
              </div>
              <div>
                <h2 className="change-c">Your Recent Bookings:</h2>
                <div className="cardicon">
                  <div className="cardListItem">
                    {/* <FontAwesomeIcon icon={faBed} /> */}
                    <ReservationModal/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cardtwo">
            <h2 className="prohead">Profile Page</h2>
            <div className="disabledFields">
              <label>
                <span className="wrote">Username </span>
                <input type="username" placeholder={user.username} disabled />
              </label>
              <label>
                <span className="wrote">email</span>
                <input type="email" placeholder={user.email} disabled />
              </label>
              <label>
                <span className="wrote">user Joined</span>
                <input
                  type="text"
                  placeholder={moment(user.createdAt).format("DD/MM/YY")}
                  disabled
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
