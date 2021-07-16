import React, { Component } from  'react'
import {useState, useEffect,useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Header from '../../components/Header'
import axios from 'axios';
import Button from 'react-bootstrap/Button'

const userBD = require("../../components/userBD/userBD");


export default class OwnPosts extends Component{

  state = {
    userPost: [],
    posts: [],
  }


  componentDidMount(){
    axios.get(`http://localhost:5000/users/posts/1`)
      .then(res => {
        const userPost  = res.data;
        this.setState({ userPost });
        console.log(res.data)
      })
  }

  handleDelete = async(id_post) => {
    await axios.delete(`http://localhost:5000/posts/${id_post}`)
    .then(res => {
      const posts  = res.data;
      this.setState({ posts });
      console.log(res.data)
    })
    axios.get(`http://localhost:5000/users/posts/1`)
    .then(res => {
      const userPost  = res.data;
      this.setState({ userPost });
      console.log(res.data)
    })
  }

  render(){
    console.log(this.state)
    return(
      <>
       <Header /> 
        <Container className="containerOwnPost">
      <h1>Suas postagens</h1>
        {this.state.userPost.map(user => 
          <div >
            <Card className="cardsOwnPost">
              <Card.Img variant="top" src={user.url_picture} />
              <Card.Body>
                <Card.Title>{user.title}</Card.Title>
                <Card.Text>
                  {user.text}
                </Card.Text>
                <Button variant="danger" onClick={() => this.handleDelete(user.id_post)}>Deletar</Button>
              </Card.Body>
            </Card>
          </div>
          )}

          </Container>
      </>
    );
  }

}
