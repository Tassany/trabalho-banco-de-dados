/* eslint-disable no-undef */
import React, { Component } from "react";
import axios from "axios";

import "./postar.css";
import {AuthProvider, MyContext} from '../../components/Provider/AuthProvider';

import Header from "../../components/Header";
const API_URL = "http://localhost:5000";
const initialFormState = {
  form: {
    title: "",
    text: "",
    url_pic: "",
    url_vid: "",
    tag_name: "",
  },
  label: false,
  label2: false,
  label3: false,
};
export default class Photos extends Component {
  state = { ...initialFormState };
  
  static contextType = MyContext

  posts = () => {
    console.log(this.state.form.title);
    if (
      true
    ) {
      console.log("entrou")
      const url_pic = [this.state.form.url_pic]
      const url_vid = [this.state.form.url_vid]
      const tag_name = [this.state.form.tag_name]
      console.log(this.state.form.url_pic);
      
      axios
        .post(`${API_URL}/posts`, {
          id_user: this.context.user.id_user,
          title: this.state.form.title,
          text: this.state.form.text,
          url_pic: url_pic,
          url_video: url_vid,
          tag_name: tag_name,
        })
        console.log(this.context.user.id_user)
    } else {
      this.setState({ label: false });
      this.setState({ label2: false });
      this.setState({ label3: true });
    }
  };

  updateField(event) {
    const user = { ...this.state.form };
    user[event.target.name] = event.target.value;
    this.setState({ form: user });
  }
  render() {
    return (
      <>
        <Header />
        <div className="container1">
          <div className=" form1 ">
            <div className="form-group camp ">
              <label>Titulo da postagem</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={this.state.form.title}
                onChange={(e) => this.updateField(e)}
                placeholder="Digite o titulo"
              />
            </div>
            <div className="form-group camp">
              <label>Legenda da postagem</label>
              <input
                type="text"
                className="form-control"
                name="text"
                value={this.state.form.text}
                onChange={(e) => this.updateField(e)}
                placeholder="Digite a legenda"
              />
            </div>{" "}
            <div className="form-group camp ">
              <label>Digite as tags da postagem</label>
              <input
                type="text"
                className="form-control"
                name="tag_name"
                value={this.state.form.tag_name}
                onChange={(e) => this.updateField(e)}
                placeholder="Tag1, Tag2, Tag3"
              />
            </div>
            <div className="form-group  camp">
              <label>Link das fotos</label>
              <input
                type="text"
                className="form-control"
                name="url_pic"
                value={this.state.form.url_pic}
                onChange={(e) => {
                  this.updateField(e);
                }}
                placeholder="Foto1, Foto2, Foto3"
              />
            </div>
            <div className="form-group camp ">
              <label>Link dos videos</label>
              <input
                type="text"
                className="form-control"
                name="url_vid"
                value={this.state.form.url_vid}
                onChange={(e) => {
                  this.updateField(e);
                }}
                placeholder="Video1, Video2, Video3"
              />
            </div>
            {this.state.label && (
              <label
                style={{
                  textAlign: "center",
                  color: "red",
                  fontSize: "15px",
                }}
              >
                Postagem feita com sucesso
              </label>
            )}
            {this.state.label2 && (
              <label
                style={{
                  textAlign: "center",
                  color: "red",
                  fontSize: "15px",
                }}
              >
                Erro na postagem
              </label>
            )}
            {this.state.label3 && (
              <label
                style={{
                  textAlign: "center",
                  color: "red",
                  fontSize: "15px",
                }}
              >
                Verifique se os campos estão todos preenchidos
              </label>
            )}
            <button
              className="singin btn btn-primary"
              type="button"
              onClick={this.posts}
            >
              Entrar
            </button>
          </div>
        </div>
      </>
    );
  }
}
