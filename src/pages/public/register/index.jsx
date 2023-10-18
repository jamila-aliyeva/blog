import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

import { TOKEN } from "../../../constants";
import { AuthContext } from "../../../context/AuthContext";
import request from "../../../server";


import "./style.scss";

const Register = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    let user = {
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      username: e.target.username.value,
      password: e.target.password.value,
    };
    try {
      toast.success("Successfully registered!");
      let res = await request.post("auth/register", user);
      Cookies.set(TOKEN, res.token);
      setIsAuthenticated(true);
      navigate("/my-posts");
      console.log(res);
      console.log(user);
    } catch (err) {
      toast.error("Invalid");
    }
  };
  return (
    <section className="register">
      <div className="container">
        <h2>Register</h2>
        <form onSubmit={submit}>
          <input type="text" name="first_name" placeholder="Firstname" />
          <input type="text" name="last_name" placeholder="Firstname" />
          <input type="text" name="username" placeholder="Firstname" />
          <input type="password" name="password" placeholder="Password" />
          <input type="password" placeholder="Confirm password" />
          <button>Register</button>
        </form>
      </div>
    </section>
  );
};

export default Register;
