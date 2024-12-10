import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../../store/authStore";
import { useNavigate, Link } from "react-router-dom";
import "../../style/LoginForm.css";
import axios from "axios";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function LoginForm() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      navigate("/profile");
    } catch (error) {
      console.error("Login failed:", error);

    
        alert("User not found. Please check your email and password.");
      
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Log In</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email" className="input-label">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            className={`input-field ${errors.email ? "input-field-error" : ""}`}
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="input-label">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            className={`input-field ${
              errors.password ? "input-field-error" : ""
            }`}
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </div>

        <button type="submit" className="submit-button">
          Log In
        </button>
      </form>

      <div className="mt-4 text-center">
        <Link to="/forgot-password" className="forgot-password-link">
          Forgot password?
        </Link>
      </div>
    </div>
  );
}
