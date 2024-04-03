import { FaPhoneAlt } from "react-icons/fa";
import "./NavBar.css";
import Logo from "../../assets/logo.jpg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/Authslice";
const NavBar = () => {
  const isauth = useSelector((state) => state.auth.isAuthenticated);
  const username = useSelector((state) => state.auth.user?.username);
  const dispatch = useDispatch();
  return (
    <>
      <div className="top-nav">
        <div className="top-nav-phone">
          <FaPhoneAlt />
          <h1>+213541021883</h1>
        </div>
        <div className="top-nav-center">
          <h1> Get 50% off on selected Items | Shop now</h1>
        </div>
        <div className="top-nav-end">
          <h1>eng : </h1>
          <h1>location :</h1>
        </div>
      </div>
      <div className="container">
        <div className="navigation">
          <img className="logo" src={Logo} alt="logoimage" />
          <ul>
            <Link to="/">
              <li>Categories</li>
            </Link>
            <Link to="/">
              <li>Details</li>
            </Link>
            <Link to="/">
              <li>What's new</li>
            </Link>
            <Link to="/">
              <li>Delivry</li>
            </Link>
            {isauth ? (
              username
            ) : (
              <Link to="/login">
                <button>Login</button>
              </Link>
            )}
            {isauth && (
              <button onClick={() => dispatch(logout())}>Logout</button>
            )}
          </ul>
          <Link to="admin">admin</Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;
