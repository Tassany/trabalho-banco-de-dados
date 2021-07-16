import React, { Component } from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Header from "../../components/Header";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Post from "../../components/Post";
import axios from "axios";
import {
  AuthProvider,
  MyContext,
} from "../../components/Provider/AuthProvider";
import Contes from "../../components/Provider/Contes";

class Feed extends Component {
  constructor(props) {
    super(props);
  }

  static contextType = MyContext;

  state = {
    usersPost: [],
    user: [],
  };

  componentDidMount(){
  
     axios.get(`http://localhost:5000/users/${this.context.user.id_user}/feed`)
      .then(res => {
        const usersPost  = res.data;
        this.setState({ usersPost });
      })
      axios.get(`http://localhost:5000/users/${this.context.user.id_user}`)
      
      .then(res => {
        const user = res.data;
        this.setState({ user });
      })
  }

  
  render(){
    console.log("feed-context===================")
    console.log(this.context);
      return(
    <>
      <Header />

      
      <Container>
          <h1>Feed</h1>

          <Row>
            <Col md={4}>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  {this.state.user.map((user) => (
                    <>
                      <Card.Title>{user.name}</Card.Title>
                      <Card.Text>{user.description}</Card.Text>
                    </>
                  ))}
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <ul>
                {this.state.usersPost.map((user) => (
                  <Post
                    src={user.url_picture}
                    titulo={user.title}
                    texto={user.text}
                    id_post={user.id_post}
                  >
                    {" "}
                  </Post>
                ))}
              </ul>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Feed;
