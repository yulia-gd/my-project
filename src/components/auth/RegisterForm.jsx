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
  const [birthYear, setBirthYear] = useState("");
  const [gender, setGender] = useState("female");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    
    if (!name || !email || !password || !birthYear || !gender) {
      alert("Please fill in all required fields!");
      console.error("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }

    try {
      await register(name, email, password, birthYear, gender);
      navigate("/profile");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. This email is already in use");
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
        </select>
      </div>

      <button type="submit" className="form-button">
        Register
      </button>
    </form>
  );
}
