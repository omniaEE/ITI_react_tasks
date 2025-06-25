import "../assets/styles/Login.css";
import { logInAPI } from "@/api/auth";
import { logInAndRegisterSchema } from "@/forms/schema";
import { useAuthStore } from "@/store/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import qs from "qs";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const { search } = useLocation();
  const { redirectTo } = qs.parse(search, { ignoreQueryPrefix: true });
  const navigate = useNavigate();
  const { setTokens } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(logInAndRegisterSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await logInAPI(data);
      setTokens(res.data);
      navigate(redirectTo ?? "/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
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

          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
}
