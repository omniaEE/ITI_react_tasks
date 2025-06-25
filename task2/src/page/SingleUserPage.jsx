import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import useUserStore from "../store/users";
import UserCard from "../components/UserCard";
import Profile from "../components/Profile";

const SingleUserPage = () => {
  const { userID } = useParams();
  const store = useUserStore();
  const user = store.user;
  const hasErrors = store.hasErrors;

  const fetchUser = useCallback(() => {
    if (userID) {
      store.getUser({ id: userID });
    }
  }, [userID, store]);

  useEffect(() => {
    fetchUser();
  }, []);

  if (hasErrors) {
    return <p style={{ color: "red" }}>{hasErrors.message}</p>;
  }

  if (!user) {
    return <p>Loading user...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Details</h2>
      <Profile {...user} />
    </div>
  );
};

export default SingleUserPage;
