import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";
import { getIsLoggedIn } from "../../store/users";
import NavProfile from "./navProfile";

// enableDarkMode({
//   brightness: 100,
//   contrast: 100,
//   sepia: 0,
// });

const Navbar = () => {
  // const { currentUser } = useAuth();
  const isLoggedIn = useSelector(getIsLoggedIn());

  return (
    <div className="navbar bg-light">
      <div className="container-fluid justify-content-center">
        <ul className="nav">
          <li className="nav-item mt-2">
            <Link className="nav-link" aria-current="page" to="/">
              Главная
            </Link>
          </li>
          {isLoggedIn && (
            <li className="nav-item mt-2">
              <Link className="nav-link" aria-current="page" to="/notes">
                Заметки
              </Link>
            </li>
          )}
          {isLoggedIn ? (
            <NavProfile />
          ) : (
            <li className="nav-item mt-2">
              <Link className="nav-link" aria-current="page" to="/login">
                Войти
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
