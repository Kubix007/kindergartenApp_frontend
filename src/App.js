import React, { useEffect, useState } from 'react';
import { Router } from './Router';
import { AuthContext } from './context/AuthContext';
import { UserContext } from './context/UserContext';
import { ClothesUsed } from './context/ClothesUsed';
import { ColoringBookContext } from './context/ColoringBookContext';
import 'react-toastify/dist/ReactToastify.css';
import Auth from './api/Auth';
import { useHistory } from 'react-router-dom';
import './App.css';
import { toast } from 'react-toastify';
import axios from "axios";

const App = () => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState();
  const [usedClothes, setUsedClothes] = useState();
  const [coloringBook, setColoringBook] = useState();
  const history = useHistory();


  useEffect(() => {
    setAuth(Auth.IsLogged());
  }, [])

  axios.interceptors.response.use(
    response => { return response },
    error => {
      if (error.response.status === 401 && error.response.data.message !== "Bad credentials") {
        history.go("/logowanie");
        toast.error(`Sesja wygasła. Zaloguj się ponownie`, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        Auth.reset();
      }
      return Promise.reject(error);

    }
  );

  return (
    <ClothesUsed.Provider value={{ usedClothes, setUsedClothes }}>
      <ColoringBookContext.Provider value={{ coloringBook, setColoringBook }}>
        <UserContext.Provider value={{ user, setUser }}>
          <AuthContext.Provider value={{ auth, setAuth }}>
            <div>
              <Router />
            </div>
          </AuthContext.Provider>
        </UserContext.Provider>
      </ColoringBookContext.Provider>
    </ClothesUsed.Provider>

  );
}

export default App;