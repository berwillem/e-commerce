import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
const Admin = () => {
  const isauth = useSelector((state) => state.auth.isAuthenticated);
  const isadmin = useSelector((state) => state.auth.user?.role);
  const userid = useSelector((state) => state.auth.user?._id);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const handlesubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/products", { name, description, userid })
      .then((res) => {
        console.log("product created succefuly");
      });
  };

  return (
    <>
      {isadmin === "admin" && isauth ? (
        <form onSubmit={(e) => handlesubmit(e)}>
          <input
            type="text"
            placeholder="add a name for your product"
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="add a name for your description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <button type="submit">create product</button>
        </form>
      ) : (
        <h1>you dont have the necessary permission to access</h1>
      )}
    </>
  );
};

export default Admin;
