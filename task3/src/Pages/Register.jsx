import "../assets/styles/Register.css";
import { logInAndRegisterSchema } from "@/forms/schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerAPI } from "@/api/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(logInAndRegisterSchema),
  });

  const onSubmit = async (data) => {
    try {
      await registerAPI(data);
      navigate("/login");
    } catch (e) {
      console.error(e);
    } finally {
      reset();
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="name-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" name="firstName" />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" name="lastName" />
            </div>
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" {...register("email")} />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" {...register("password")} />
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone">Phone</label>
            <input id="phone" type="text" {...register("phone")} />
            {errors.phone && (
              <p className="error-message">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="jobTitle">Job Title</label>
            <input id="jobTitle" {...register("jobTitle")} />
            {errors.jobTitle && (
              <p className="error-message">{errors.jobTitle.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="address">Address</label>
            <input id="address" {...register("address")} />
            {errors.address && (
              <p className="error-message">{errors.address.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input id="dateOfBirth" type="date" {...register("dateOfBirth")} />
            {errors.dateOfBirth && (
              <p className="error-message">{errors.dateOfBirth.message}</p>
            )}
          </div>

          <input type="submit" value="Create My User" />
        </form>
      </div>
    </div>
  );
}
