import React, { Component } from  'react'
import {useState, useEffect,useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Header from '../../components/Header'
import axios from 'axios';
import Button from 'react-bootstrap/Button'


export default class OwnPosts extends Component{


  componentDidMount(){
    axios.get(`http://localhost:5000/users/posts`)
      .then(res => {
        const usersPost  = res.data;
        this.setState({ usersPost });
        
      })
      axios.get(`http://localhost:5000/users/1`)
      
      .then(res => {
        const user = res.data;
        this.setState({ user });
      })

      
  }
  

  render(){
    return(
      <>
        <Header />
        <Container>
            <h1>Suas postagens</h1>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
        </Container>
  
      </>
    );
  }

}
