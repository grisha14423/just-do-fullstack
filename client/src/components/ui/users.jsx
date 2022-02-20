import React from "react";
import { useSelector } from "react-redux";
import { getUsersList } from "../../store/users";

const Users = () => {
  const users = useSelector(getUsersList());
  if (users) {
    return (
      <div className="row">
        {users.map((user) => {
          return (
            <div className="col-md-3" key={user._id}>
              <div className="d-flex flex-column align-items-center text-center position-relative">
                <img
                  src={user.image}
                  className="rounded-circle"
                  width="150"
                  alt=""
                />
                <div className="mt-3">
                  <h4>{user.name}</h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-info " role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
};

export default Users;
