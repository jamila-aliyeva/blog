import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";

import Cookies from "js-cookie";
import request from "../../../server";

import "./index.scss";
import { ROLE, TOKEN } from "../../../constants";
import { useFormik } from "formik";
import loginSchema from "../../../scheme/loginSchema";

const Login = () => {
  const { setSavedUsername, setIsAuthenticated, setRole, setPassword } =
    useContext(AuthContext);
  const navigate = useNavigate();

  // const submit = async (e) => {
  //   e.preventDefault();
  //   const user = {
  //     username: e.target.username.value,
  //     password: e.target.password.value,
  //   };
  //   try {
  //     let res = await request.post("auth/login", user);
  //     console.log(res);
  //     Cookies.set(TOKEN, res.data.token);
  //     setIsAuthenticated(true);
  //     navigate("/my-posts");
  //     console.log(res);
  //     console.log(user);
  //   } catch (err) {
  //     toast.error("Username or password is incorrect");
  //   }
  // };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const {
          data: { token, role },
        } = await request.post("auth/login", values);
        if (role === "user") {
          navigate("/my-posts");
        } else {
          navigate("/dashboard");
        }
        setIsAuthenticated(true);
        setRole(role);
        Cookies.set(TOKEN, token);
        request.defaults.headers.Authorization = "Bearer " + token;
        localStorage.setItem(ROLE, role);
        setSavedUsername(values.username);
        setPassword(values.password);
      } catch (err) {
        toast.error(err.response.data);
      }
    },
  });

  return (
    <section className="loginPage">
      <div className="container">
        <h2>Login</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}>
          <form onSubmit={formik.handleSubmit} style={{ width: "600px" }}>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              autoComplete="off"
              name="username"
              type="text"
              placeholder="Username"
            />
            {formik.touched.username && formik.errors.username ? (
              <p className="error-message">{formik.errors.username}</p>
            ) : null}
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              name="password"
              className="login__password"
              type="password"
              placeholder="Password"
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="error-message">{formik.errors.password}</p>
            ) : null}
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
