import React, { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import "../../style/RegisterForm.css";

export function RegisterForm() {
  const { register } = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [birthYear, setBirthYear] = useState("");
  const [gender, setGender] = useState("female");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!photo) {
      alert("Please upload a photo!");
      return;
    }

    if (birthYear === "") {
      alert("Please enter your birth year!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const photoPath = URL.createObjectURL(photo);

    try {
      await register(name, email, photoPath, birthYear, gender);
      navigate("/profile");
    } catch (error) {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleRegister} className="form-container">
      <h2 className="form-title">Register</h2>

      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="birthYear" className="form-label">
          Birth Year
        </label>
        <input
          type="number"
          id="birthYear"
          value={birthYear}
          onChange={(e) => setBirthYear(e.target.value)}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="gender" className="form-label">
          Gender
        </label>
        <select
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="form-select"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="photo" className="form-label">
          Profile Photo
        </label>
        <input
          type="file"
          id="photo"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files?.[0] || null)}
          className="form-input"
        />
      </div>

      <button type="submit" className="form-button">
        Register
      </button>
    </form>
  );
}
