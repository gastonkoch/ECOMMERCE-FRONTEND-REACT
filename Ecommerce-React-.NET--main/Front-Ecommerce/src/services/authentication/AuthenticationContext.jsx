import { useState, createContext } from "react";
import React from "react";
import PropType from "prop-types";

export const AuthenticationContext = createContext({});

const userValueString = localStorage.getItem("user");
const userValue = userValueString ? JSON.parse(userValueString) : null;
const userValueNode = userValue ? userValue.userSession : null;
export const AuthenticationContextProvider = ({ children }) => {

  const [user, setUser] = useState(userValueNode);
  
  const handleLogin = (email) => {
    fetch(`https://localhost:7197/api/User/email/${email}`, { // Asegúrate de usar backticks aquí
      method: "GET",
      mode: "cors",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener el usuario");
        }
        return response.json();
      })
      .then((userDataFromAPI) => {
        let userSession = {
          id: userDataFromAPI.id,
          name: userDataFromAPI.name,
          lastName: userDataFromAPI.lastName,
          email: userDataFromAPI.email,
          userName: userDataFromAPI.userName,
          adress: userDataFromAPI.adress,
          userType : userDataFromAPI.userType
        }
        console.log("usuario:" ,userSession)
        localStorage.setItem("user", JSON.stringify({ userSession }));
        setUser( userSession );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = '/'
  };
  
  // userValue && setUser(userValue.userSession)
  return (
    <AuthenticationContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContextProvider;
AuthenticationContextProvider.propTypes = {
  children: PropType.object,
};
