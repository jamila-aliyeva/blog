import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";

import Cookies from "js-cookie";
import request from "../../../server";

import "./index.scss";
import { TOKEN } from "../../../constants";

const Login = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const user = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    try {
      let res = await request.post("auth/login", user);
      console.log(res);
      Cookies.set(TOKEN, res.data.token);
      setIsAuthenticated(true);
      navigate("/my-posts");
      console.log(res);
      console.log(user);
    } catch (err) {
      toast.error("Username or password is incorrect");
    }
  };

  return (
    <section className="loginPage">
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={submit}>
          <input name="username" type="text" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />
          <button>Login</button>
        </form>
      </div>
    </section>
  );
};

export default Login;
