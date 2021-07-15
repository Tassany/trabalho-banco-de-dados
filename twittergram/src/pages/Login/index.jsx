import React, { useContext, useState } from "react";
import axios from "axios";
import "./index.css";
import Home from "../../assets/images/home.png";
import { AuthContex } from "../../components/Provider/AuthProvider";
const API_URL = "http://localhost:5000";

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

export default function Login(props) {
  const [user2, setUser2] = useContext(AuthContex);
  const [form, setForm] = useState(initialFormState);

  const clear = () => {
    setForm(...initialFormState);
  };

  const auth = () => {
    axios
      .post(`${API_URL}/signin`, {
        email: form.user.email,
        password: form.user.senha,
      })
      .then((res) => {
        console.log(res.data);

        if (res.data.length) {
          setUser2(res.data[0]);
          console.log(user2);

          return props.history.push({
            pathname: "/feed",
          });
        } else {
          this.setState({ label: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const register = () => {
    console.log(form.user.name);
    console.log(form.user.email);
    console.log(form.user.senha);

    axios
      .post(`${API_URL}/signup`, {
        name: form.user.name,
        email: form.user.email,
        password: form.user.senha,
      })
      .then((resp) => {
        if (resp.data.length) {
          setForm({ label2: false });
          setForm({ label: false });
          setForm({ stageNew: false });
        } else {
          setForm({ label2: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateField = (event) => {
    const user = { ...form.user };
    user[event.target.name] = event.target.value;
    setForm({ user: user });
  };

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
            {form.label2 && (
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
          {form.stageNew && (
            <div className="form-group email">
              <label>Nome</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={form.user.name}
                onChange={(e) => updateField(e)}
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
            {form.label && (
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
              value={form.user.email}
              onChange={(e) => updateField(e)}
              placeholder="Digite o email"
            />
          </div>

          <div className="form-group senha">
            <label>Senha</label>
            <input
              type="password"
              className="form-control"
              name="senha"
              value={form.user.senha}
              onChange={(e) => updateField(e)}
              placeholder="Digite o senha"
            />
          </div>

          {!form.stageNew && (
            <button
              className="singin btn btn-primary"
              type="button"
              onClick={() => auth()}
            >
              Entrar
            </button>
          )}

          {!form.stageNew && (
            <button
              className="register"
              type="button"
              onClick={() => {
                setForm({ label2: false });
                setForm({ label: false });
                setForm({ stageNew: true });
              }}
            >
              Cadastrar
            </button>
          )}

          {form.stageNew && (
            <button
              className="singin btn btn-primary"
              type="button"
              onClick={() => register()}
            >
              Registrar
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
