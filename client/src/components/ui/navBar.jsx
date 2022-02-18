import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import NavProfile from "./navProfile";

// enableDarkMode({
//   brightness: 100,
//   contrast: 100,
//   sepia: 0,
// });

const Navbar = () => {
  const { currentUser } = useAuth();

  return (
    <div className="navbar bg-light">
      <div className="container-fluid justify-content-center">
        <ul className="nav">
          <li className="nav-item mt-2">
            <Link className="nav-link" aria-current="page" to="/">
              Главная
            </Link>
          </li>
          {currentUser && (
            <li className="nav-item mt-2">
              <Link className="nav-link" aria-current="page" to="/notes">
                Заметки
              </Link>
            </li>
          )}
          {currentUser ? (
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
