import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import "../style/EditProfilePage.css";

const profileSchema = z.object({
  name: z.string().nonempty("Name is required"),
  birthYear: z
    .number()
    .min(1900, "Year must be at least 1900")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
  gender: z.enum(["Male", "Female", "Other"], "Select a valid gender"),
});
export function EditProfilePage() {
  const { user, updateUser } = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      birthYear: user?.birthYear || "",
      gender: user?.gender || "Other",
    },
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = async (data) => {
    try {
      await updateUser(data);
      navigate("/profile");
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  return (
    <div className="edit-profile-container">
      <h1 className="edit-profile-title">Edit Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="edit-profile-form">
        <div>
          <label className="input-label">Name</label>
          <input
            {...register("name")}
            className={`input-field ${errors.name ? "input-error" : ""}`}
          />
          {errors.name && (
            <p className="error-message">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="input-label">Birth Year</label>
          <input
            type="number"
            {...register("birthYear", { valueAsNumber: true })}
            className={`input-field ${errors.birthYear ? "input-error" : ""}`}
          />
          {errors.birthYear && (
            <p className="error-message">{errors.birthYear.message}</p>
          )}
        </div>
        <div>
          <label className="input-label">Gender</label>
          <select
            {...register("gender")}
            className={`input-field ${errors.gender ? "input-error" : ""}`}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && (
            <p className="error-message">{errors.gender.message}</p>
          )}
        </div>
        <button type="submit" className="save-button">
          Save Changes
        </button>
      </form>
    </div>
  );
}
