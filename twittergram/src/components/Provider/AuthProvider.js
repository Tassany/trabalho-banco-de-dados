import React, { useContext, useState, Children } from "react";

export const AuthContex = React.createContext(false, () => {});

export const AuthProvider = ({ children }) => {
  const [user2, setUser2] = useState({
    id_user: -1,
    name: "",
    url_pic_perfil: "",
    email: "",
    password: "",
    description: "",
    create_date: "",
  });

  return (
    <AuthContex.Provider value={[user2, setUser2]}>
      {children}
    </AuthContex.Provider>
  );
};
