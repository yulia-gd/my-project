import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import "../style/UserProfile.css";

export function UserProfile() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  if (!user) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">My Profile</h1>
      <div className="profile-content">
        <div className="flex-shrink-0">
          <img
            src={user.profilePhotoUrl}
            alt={`${user.name}'s profile`}
            className="profile-photo"
          />
        </div>

        <div className="profile-info">
          <div className="space-y-4">
            <div className="info-block">
              <h2 className="info-title">Name</h2>
              <p className="info-text">{user.name}</p>
            </div>
            <div className="info-block">
              <h2 className="info-title">Email</h2>
              <p className="info-text">{user.email}</p>
            </div>
            <div className="info-block">
              <h2 className="info-title">Birth Year</h2>
              <p className="info-text">{user.birthYear}</p>
            </div>
            <div className="info-block">
              <h2 className="info-title">Gender</h2>
              <p className="info-text">{user.gender}</p>
            </div>
          </div>
          <button onClick={handleEditProfile} className="edit-button">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
