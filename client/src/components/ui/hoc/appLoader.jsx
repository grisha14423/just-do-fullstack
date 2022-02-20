import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useEffect } from "react";
import {
  getIsLoggedIn,
  getUsersLoadingStatus,
  loadUsersList,
} from "../../../store/users";
import { loadimportancesList } from "../../../store/importances";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());
  const loadingUsersStatus = useSelector(getUsersLoadingStatus());
  useEffect(() => {
    dispatch(loadimportancesList());
    if (isLoggedIn) dispatch(loadUsersList());
  }, [isLoggedIn]);
  if (loadingUsersStatus) return "Loadind";
  return children;
};

AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
export default AppLoader;
