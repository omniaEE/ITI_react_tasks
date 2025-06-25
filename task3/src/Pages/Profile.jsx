import { getMe } from "@/api/user";
import { useEffect, useState } from "react";
import "../assets/styles/Profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMe();
        setUser(res?.data);
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="profile-card">
      <div className="profile-header">User Profile</div>
      {user ? (
        <div className="profile-body">
          <p>
            <strong>Name:</strong> {user.firstName} {user.lastName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Job Title:</strong> {user.jobTitle}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
        </div>
      ) : (
        <div className="profile-body">Loading user info...</div>
      )}
    </div>
  );
}
