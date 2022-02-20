import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { useAuth } from "../../hooks/useAuth";
import { logOut } from "../../store/users";

const LogOut = () => {
  // const { logOut } = useAuth();

  // useEffect(() => {
  //   logOut();
  // }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logOut());
  }, []);

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="spinner-border text-info " role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LogOut;
