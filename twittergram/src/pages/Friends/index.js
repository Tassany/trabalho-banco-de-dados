import React, { Component } from  'react'
import {useState, useEffect,useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Header from '../../components/Header'
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import {AuthProvider, MyContext} from '../../components/Provider/AuthProvider';
const userBD = require("../../components/userBD/userBD");

const initialFormState ={
  users: [],
  followw:[]
}


export default class Friends extends Component{

  state ={
    ...initialFormState
  }

static contextType = MyContext
  componentDidMount(){
    axios.get(`http://localhost:5000/users/`)
      .then(res => {
        const users  = res.data;
        this.setState({ users });
        console.log(res.data)
      })
  }

  handleFollow = async(id_usuario) => {
    console.log(id_usuario)
    await axios.post(`http://localhost:5000/users/follow/${id_usuario}`, {
      id_user : this.context.user.id_user,
    })
    .then(res => {
      const follow  = res.data;
      this.setState({ follow });
      console.log(res.data)
    })
    axios.get(`http://localhost:5000/users/`)
    .then(res => {
      const users = res.data;
      this.setState({ users });
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
      {this.state.users.map(user => 
          <div >
            
            <Card className="cardsOwnPost">

              <Card.Body>
                <Card.Title>{user.name}</Card.Title>
                <Card.Text>
                  {user.email}
                </Card.Text>
                <Card.Text>
                  {user.description}
                </Card.Text>
                <Button variant="success" onClick={() => this.handleFollow(user.id_user)}>Follow</Button>
              </Card.Body>
            </Card>
          </div>
          )}

          </Container>
      </>
    );
  }

}
