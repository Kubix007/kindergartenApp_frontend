import React, { useEffect, useState } from 'react';
import { Router } from './Router';
import { AuthContext } from './context/AuthContext';
import { UserContext } from './context/UserContext';
import { ClothesUsed } from './context/ClothesUsed';
import { ColoringBookContext } from './context/ColoringBookContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Auth from './api/Auth';
import './App.css';

const App = () => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState();
  const [usedClothes, setUsedClothes] = useState();
  const [coloringBook, setColoringBook] = useState();

  useEffect(() => {
    setAuth(Auth.IsLogged());
  }, [])

  return (
    <ClothesUsed.Provider value={{ usedClothes, setUsedClothes }}>
      <ColoringBookContext.Provider value={{ coloringBook, setColoringBook }}>
        <UserContext.Provider value={{ user, setUser }}>
          <AuthContext.Provider value={{ auth, setAuth }}>
            <div>
              <Router />
            </div>
            <ToastContainer />
          </AuthContext.Provider>
        </UserContext.Provider>
      </ColoringBookContext.Provider>
    </ClothesUsed.Provider>

  );
}

export default App;