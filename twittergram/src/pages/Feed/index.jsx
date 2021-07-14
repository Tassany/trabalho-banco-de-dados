import React, { Component } from  'react'
import {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Header from '../../components/Header'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Post from '../../components/Post'
import axios from 'axios';

export default class Feed extends Component{

  state = {
    usersPost: [],
    user: [],
    comments: []
  }

  componentDidMount(){
    axios.get(`http://localhost:5000/users/1/feed`)
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
          <h1>Feed</h1>

          <Row>
            <Col md={4}>
              <Card style={{ width: '18rem' }}>
                  <Card.Body>
                    { this.state.user.map(user => <Card.Title>{user.name}</Card.Title>)}
                    <Card.Text>
                      Some quick example text to build on the card title and make up the bulk of
                      the card's content.
                    </Card.Text>
                  </Card.Body>
                </Card>
            </Col>
            <Col md={4}>
              <ul>
                { this.state.usersPost.map(user => <Post
                src={user.url_picture}
                titulo={user.title}
                texto={user.text}
                > </Post>)}
              </ul>
            </Col>
          </Row>
          
      </Container>

    </>
  );
  }

}