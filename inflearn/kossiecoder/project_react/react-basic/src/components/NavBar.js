import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { login, logout } from "../store/authSlice";

const NavBar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <ul className="navbar-nav flex-row">
          <li className="nav-item me-2">
            <button
              className="text-white btn btn-link text-decoration-none"
              onClick={() => {
                if (isLoggedIn) {
                  dispatch(logout());
                } else {
                  dispatch(login());
                }
              }}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>
          </li>
          {isLoggedIn && (
            <li className="nav-item me-2">
              <NavLink
                className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                aria-current="page"
                to="/admin"
              >
                Admin
              </NavLink>
            </li>
          )}
          <li className="nav-item">
            <NavLink
              className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
              aria-current="page"
              to="/blogs"
            >
              Blogs
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
