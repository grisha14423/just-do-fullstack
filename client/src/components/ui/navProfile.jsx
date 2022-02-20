import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";
import {
  enable as enableDarkMode,
  disable as disableDarkMode,
} from "darkreader";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../store/users";

const NavProfile = () => {
  // const { currentUser } = useAuth();
  const currentUser = useSelector(getCurrentUserData());
  const [isOpen, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen((prevState) => !prevState);
  };

  const enableDark = () => {
    enableDarkMode({
      brightness: 100,
      contrast: 100,
      sepia: 0,
    });
  };

  const disableDark = () => {
    disableDarkMode();
  };

  if (!currentUser) return "Loading";
  return (
    <div className="dropdown" onClick={toggleMenu}>
      <div className="btn dropdown-toggle d-flex align-items-center">
        <div className="me-2">{currentUser.name}</div>
        <img
          src={currentUser.image}
          alt=""
          height="40"
          className="img-responsive rounded-circle"
        />
      </div>
      <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
        <Link to="/users" className="dropdown-item">
          Все пользователи
        </Link>
        <Link to="/logout" className="dropdown-item">
          Выход
        </Link>
        <button className="dropdown-item" onClick={enableDark}>
          Dark mode
        </button>
        <button className="dropdown-item" onClick={disableDark}>
          Light mode
        </button>
      </div>
    </div>
  );
};

export default NavProfile;
