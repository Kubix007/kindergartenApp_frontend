import React, { useEffect, useState } from 'react';
import { Router } from './Router';
import { AuthContext } from './context/AuthContext';
import { RoleContext } from './context/RoleContext';
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Auth from './api/Auth';
import axios from "axios";
import './App.css';

const App = () => {
  const [auth, setAuth] = useState(false);
  const [role, setRole] = useState();
  const history = useHistory();

  useEffect(() => {
    setAuth(Auth.IsLogged());
    axios.interceptors.response.use(
      response => { return response },
      error => {
        if (error.response.status === 401 || error.response.status === 419) {
          Auth.reset();
          setAuth(Auth.IsLogged());
          history.push("/login");
          toast.error(`${error.response.statusText} ${error.response.status}`, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          console.log(error);
        }
        else if (error.response.status === 422) {
          toast.error(`${error.response.statusText} ${error.response.status}`, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          console.log(error);
        }
        return Promise.reject(error);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      <AuthContext.Provider value={{ auth, setAuth }}>
        <div>
          <Router />
        </div>
        <ToastContainer />
      </AuthContext.Provider>
    </RoleContext.Provider>
  );
}

export default App;