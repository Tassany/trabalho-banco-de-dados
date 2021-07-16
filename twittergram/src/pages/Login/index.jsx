import React, { Component } from "react";
import axios from "axios";
import "./index.css";
import Home from "../../assets/images/home.png";
const API_URL = "http://localhost:5000";
const userBD = require("../../components/userBD/userBD");
const initialFormState = {
  user: {
    name: "",
    email: "",
    senha: "",
  },
  stageNew: false,
  label: false,
  label2: false,
};

export default class Login extends Component {
  state = { ...initialFormState };

  clear = () => {
    this.setState(...initialFormState);
  };

  auth = () => {
    console.log(this.state.user.email);
    console.log(this.state.user.senha);

    axios
      .post(`${API_URL}/signin`, {
        email: this.state.user.email,
        password: this.state.user.senha,
      })
      .then((res) => {
        console.log(res.data);
        console.log(userBD);
        userBD.id_user = res.data[0].id_user;
        userBD.name = res.data[0].name;
        userBD.email = res.data[0].email;
        userBD.password = res.data[0].password;
        userBD.description = res.data[0].description;
        userBD.create_date = res.data[0].create_date;
        userBD.url_pic_perfil = res.data[0].url_pic_perfil;
        console.log(userBD);
        if (res.data.length) {
          console.log(res.data[0]);
          return this.props.history.push({
            pathname: "/feed",
            state: { data: res.data[0] },
          });
        } else {
          this.setState({ label: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  register = () => {
    console.log(this.state.user.name);
    console.log(this.state.user.email);
    console.log(this.state.user.senha);

    axios
      .post(`${API_URL}/signup`, {
        name: this.state.user.name,
        email: this.state.user.email,
        password: this.state.user.senha,
      })
      .then((resp) => {
        if (resp.data.length) {
          this.setState({ label2: false });
          this.setState({ label: false });
          this.setState({ stageNew: false });
        } else {
          this.setState({ label2: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  updateField(event) {
    const user = { ...this.state.user };
    user[event.target.name] = event.target.value;
    this.setState({ user: user });
  }
  render() {
    return (
      <div className="container">
        <div className="cont-text">
          <h1 className="title">TWITERGRAM</h1>
        </div>
        <div className="body">
          <img src={Home} className="image" />
          <form className="form">
            <div
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
                textAlign: "center",
                width: "100%",
                paddingBottom: "12px",
              }}
            >
              {this.state.label2 && (
                <label
                  style={{
                    textAlign: "center",
                    color: "red",
                    fontSize: "15px",
                  }}
                >
                  Usuário já castrado
                </label>
              )}
            </div>
            {this.state.stageNew && (
              <div className="form-group email">
                <label>Nome</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={this.state.user.name}
                  onChange={(e) => this.updateField(e)}
                  placeholder="Digite o name"
                />
              </div>
            )}
            <div
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
                textAlign: "center",
                width: "100%",
                paddingBottom: "12px",
              }}
            >
              {this.state.label && (
                <label
                  style={{
                    textAlign: "center",
                    color: "red",
                    fontSize: "15px",
                  }}
                >
                  Verifique se email e senha estão corretos
                </label>
              )}
            </div>
            <div className="form-group email">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                name="email"
                value={this.state.user.email}
                onChange={(e) => this.updateField(e)}
                placeholder="Digite o email"
              />
            </div>

            <div className="form-group senha">
              <label>Senha</label>
              <input
                type="password"
                className="form-control"
                name="senha"
                value={this.state.user.senha}
                onChange={(e) => this.updateField(e)}
                placeholder="Digite o senha"
              />
            </div>

            {!this.state.stageNew && (
              <button
                className="singin btn btn-primary"
                type="button"
                onClick={() => this.auth()}
              >
                Entrar
              </button>
            )}

            {!this.state.stageNew && (
              <button
                className="register"
                type="button"
                onClick={() => {
                  this.setState({ label2: false });
                  this.setState({ label: false });
                  this.setState({ stageNew: true });
                }}
              >
                Cadastrar
              </button>
            )}

            {this.state.stageNew && (
              <button
                className="singin btn btn-primary"
                type="button"
                onClick={() => this.register()}
              >
                Registrar
              </button>
            )}
          </form>
        </div>
      </div>
    );
  }
}