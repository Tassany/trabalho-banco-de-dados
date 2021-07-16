import React, { Component, useState } from "react";

// this is the equivalent to the createStore method of Redux
// https://redux.js.org/api/createstore

const MyContext = React.createContext();

const AuthProvider = (props) => {
  const [user, setState] = useState({
    id_user: -1,
    name: "",
    url_pic_perfil: "",
    email: "",
    password: "",
    description: "",
    create_date: "",
  });

  return (
    <MyContext.Provider
      value={{
        user: user,
        userUpdate: (user) => {
          setState(user);
        },
      }}
    >
      {props.children}
    </MyContext.Provider>
  );

}

export {AuthProvider, MyContext};