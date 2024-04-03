import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const schema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
});

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:5000/users/register",
        data
      );
      console.log("success");
      navigate("/");
    } catch (error) {
      setError(error.response.data.error || "An error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} placeholder="Username" />
      {errors.username && <p>{errors.username.message}</p>}

      <input {...register("email")} placeholder="Email" />
      {errors.email && <p>{errors.email.message}</p>}

      <input type="password" {...register("password")} placeholder="Password" />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit">Register</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Register;
