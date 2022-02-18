import React, { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

const LogOut = () => {
  const { logOut } = useAuth();

  useEffect(() => {
    logOut();
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
