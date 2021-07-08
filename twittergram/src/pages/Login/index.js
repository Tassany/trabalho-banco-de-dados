import React, { useState } from "react";
import axios from "axios";
import "./index.css";
import Home from "../../assets/images/home.png";
const API_URL = "http://localhost:5000";
const initialFormState = {
  name: "",
  email: "",
  senha: "",
};

export default function Login(props) {
  const [form, setForm] = useState(initialFormState);
  const [stageNew, setStageNew] = useState(false);
  const [label, setlabel] = useState(false);
  const [label2, setlabel2] = useState(false);
  const clear = () => {
    setForm(initialFormState);
  };

  const auth = () => {
    axios( `${API_URL}/auth`, { email: form.email, senha: form.senha }).then((resp) => {
      resp = JSON.parse(resp);
      if (resp) {
        return props.history.push({
          pathname: "/feed",
          state: { data: resp.data },
        });
      } else {
        clear();
        setlabel(true);
      }
    });
  };
  const register = () => {
    axios
      .post(`${API_URL}/register`, { name: form.name, email: form.email, senha: form.senha })
      .then((resp) => {
        resp = JSON.parse(resp);

        if (resp) {
          setlabel2(false);
          setlabel(false);
          setStageNew(false);
        } else {
          clear();
          setlabel2(true);
        }
      });
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
            {label2 && (
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
          {stageNew && (
            <div className="form-group email">
              <label>Nome</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={form.name}
                onChange={(e) => setForm(e.target.value)}
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
            {label && (
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
              value={form.email}
              onChange={(e) => setForm(e.target.value)}
              placeholder="Digite o email"
            />
          </div>

          <div className="form-group senha">
            <label>Senha</label>
            <input
              type="password"
              className="form-control"
              name="senha"
              value={form.senha}
              onChange={(e) => setForm(e.target.value)}
              placeholder="Digite o senha"
            />
          </div>

          {!stageNew && (
            <button
              className="singin btn btn-primary"
              type="button"
              onClick={() => auth()}
            >
              Entrar
            </button>
          )}

          {!stageNew && (
            <button
              className="register"
              type="button"
              onClick={() => {
                setStageNew(true);
                setlabel2(false);
                setlabel(false);
              }}
            >
              Cadastrar
            </button>
          )}

          {stageNew && (
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
