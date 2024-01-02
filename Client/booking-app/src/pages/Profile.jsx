import "./profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  return (
    <div className="full">
      <div className="card">
        <div>
          <img
            className="avatar"
            src="https://placekitten.com/150/150"
            alt="User Avatar"
          />
          <div className="userdetails">
            <h2>User Name</h2>
            <p>Email: user@example.com</p>
          </div>
          <div>
            <h2>Your Recent Bookings:</h2>
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
      <div className="cardtwo"></div>
    </div>
  );
};

export default Profile;
