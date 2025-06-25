import { useState } from "react";
import { Link } from "react-router-dom";
import UserCard from "../components/UserCard";
import useUserStore from "../store/users";
import "../assets/styles/HomePage.css";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HomePage = () => {
  const [params, setParams] = useState([{ key: "name", value: "" }]);
  const { getUser, user, hasErrors } = useUserStore();

  const handleChange = (index, field, newValue) => {
    const updated = [...params];
    updated[index][field] = newValue;
    setParams(updated);
  };

  const handleSearch = async () => {
    const query = {};
    params.forEach((param) => {
      if (param.value.trim()) {
        query[param.key] = param.value;
      }
    });
    if (Object.keys(query).length) {
      await getUser(query);
    }
  };

  return (
    <div className="home-container">
      <Link to="/users" className="link">
        Go to all users &nbsp;
        <FontAwesomeIcon icon={faArrowRight} />
      </Link>
      <div className="search-title">Search for a user</div>

      {params.map((param, index) => (
        <div key={index} className="search-group">
          <select
            value={param.key}
            onChange={(e) => handleChange(index, "key", e.target.value)}
            className="search-select"
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="id">ID</option>
            <option value="phone">Phone</option>
          </select>
          <input
            type="search"
            value={param.value}
            onChange={(e) => handleChange(index, "value", e.target.value)}
            placeholder="Enter value"
            className="search-input"
          />
        </div>
      ))}

      <div className="button-group">
        <button
          onClick={() => setParams([...params, { key: "name", value: "" }])}
          className="btn add-btn"
        >
          Add Parameter
        </button>
        <button onClick={handleSearch} className="btn search-btn">
          Search
        </button>
      </div>

      {user && <UserCard {...user} />}
      {hasErrors && <p className="error">{hasErrors.message}</p>}
    </div>
  );
};

export default HomePage;
