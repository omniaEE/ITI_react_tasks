import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import "../assets/styles/UserCard.css";

const UserCard = ({ name, id, phone, email }) => {
  return (
    <div className="user-card">
      <div className="user-info">
        <p className="name">
          <FontAwesomeIcon icon={faUser} style={{ marginRight: "8px" }} />
          {name}
        </p>
        <p>
          <FontAwesomeIcon icon={faPhone} style={{ marginRight: "8px" }} />
          {phone}
        </p>
        <p>
          <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: "8px" }} />
          {email}
        </p>
      </div>
      {id && (
        <Link to={`/users/${id}`} className="user-card-link">
          Show More
        </Link>
      )}
    </div>
  );
};

export default UserCard;
