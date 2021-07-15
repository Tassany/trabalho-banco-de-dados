import React, { Component } from "react";
import Contes from "./Contes";

class AuthProvider extends Component {
  state = {
    user: {
      id_user: -1,
      name: "",
      url_pic_perfil: "",
      email: "",
      password: "",
      description: "",
      create_date: "",
    },
  };

  render() {
    return (
      <Contes.Provider
        value={{
          user: this.state.user,
          userUpdate: (user) => {
            this.setState(user);
          },
        }}
      >
        {this.props.children}
      </Contes.Provider>
    );
  }
}

export default AuthProvider;
