import { useState } from "react";
import "./Login.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/Authslice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/users/login", {
        usernameOrEmail,
        password,
      })
      .then((res) => {
        toast.success("user loged succefuly");
        dispatch(login(res.data.user));
        localStorage.setItem("token", res.data.token);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast("error happend");
      });
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <ToastContainer />
        <br />
        <input
          type="text"
          placeholder="enter your email or username"
          onChange={(e) => setUsernameOrEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default Login;
