import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Notes from "./layouts/notes";
import NavBar from "./components/ui/navBar";
import { ImportanceProvider } from "./hooks/useImportance";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoutes";
import LogOut from "./components/ui/logOut";
import Users from "./components/ui/users";
import AppLoader from "./components/ui/hoc/appLoader";
// import { useDispatch } from "react-redux";
// import { loadUsersList } from "./store/users";
// import { loadimportancesList } from "./store/importances";

function App() {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(loadUsersList());
  //   dispatch(loadimportancesList());
  // }, []);

  return (
    <div>
      <AppLoader>
        <AuthProvider>
          <NavBar />
          <ImportanceProvider>
            <Switch>
              <ProtectedRoute path="/notes/:noteId?/:edit?" component={Notes} />
              <Route path="/login/:type?" component={Login} />
              <Route path="/logout" component={LogOut} />
              <Route path="/users" component={Users} />
              <Route path="/" exact component={Main} />
              <Redirect to="/" />
            </Switch>
          </ImportanceProvider>
        </AuthProvider>
      </AppLoader>
      <ToastContainer />
    </div>
  );
}

export default App;
