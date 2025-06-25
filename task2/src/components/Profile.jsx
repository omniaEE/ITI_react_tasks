import "../assets/styles/Profile.css";

const Profile = ({
  name,
  username,
  email,
  phone,
  website,
  address,
  company,
}) => {
  return (
    <div className="profile-card">
      <h3 className="profile-name">
        {name} <span className="profile-username">(@{username})</span>
      </h3>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Phone:</strong> {phone}
      </p>
      <p>
        <strong>Website:</strong>{" "}
        <a href={`http://${website}`} target="_blank" rel="noopener noreferrer">
          {website}
        </a>
      </p>

      <div className="profile-section">
        <h4>Address</h4>
        <p>
          {address?.suite}, {address?.street}
        </p>
        <p>
          {address?.city}, {address?.zipcode}
        </p>
      </div>

      <div className="profile-section">
        <h4>Company</h4>
        <p>
          <strong>Name:</strong> {company?.name}
        </p>
        <p>
          <strong>Catchphrase:</strong> "{company?.catchPhrase}"
        </p>
        <p>
          <strong>BS:</strong> {company?.bs}
        </p>
      </div>
    </div>
  );
};

export default Profile;
