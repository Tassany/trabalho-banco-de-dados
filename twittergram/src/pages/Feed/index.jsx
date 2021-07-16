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
<<<<<<< HEAD
const userBD = require("../../components/userBD/userBD");
=======
import {AuthProvider, MyContext} from '../../components/Provider/AuthProvider';
import Contes from '../../components/Provider/Contes';
>>>>>>> ca509943ce827e706d4fc6d7732f4ead7402d465

class Feed extends Component{
  
  constructor(props){
    super(props);
  }

  static contextType = MyContext

  state = {
    usersPost: [],
    user: [],
  }

  componentDidMount(){
    console.log(userBD.id_user)
     axios.get(`http://localhost:5000/users/1/feed`)
      .then(res => {
        const usersPost  = res.data;
        this.setState({ usersPost });
<<<<<<< HEAD
        
=======
>>>>>>> ca509943ce827e706d4fc6d7732f4ead7402d465
      })
      axios.get(`http://localhost:5000/users/1`)
      
      .then(res => {
        const user = res.data;
        this.setState({ user });
      })
  }

  
  render(){
<<<<<<< HEAD

=======
    console.log("feed-context===================")
    console.log(this.context);
>>>>>>> ca509943ce827e706d4fc6d7732f4ead7402d465
      return(
    <>
      <Header />

      
      <Container>
          <h1>Feed</h1>

          <Row>
            <Col md={4}>
              <Card style={{ width: '18rem' }}>
                  <Card.Body>
                    { this.state.user.map(user =>
                    <>
                      <Card.Title>{user.name}</Card.Title>
                      <Card.Text>
                      {user.description}
                      </Card.Text>
                    </>
                      )}

                  </Card.Body>
                </Card>
            </Col>
            <Col md={4}>
              <ul>
                { this.state.usersPost.map(user => <Post
                src={user.url_picture}
                titulo={user.title}
                texto={user.text}
                id_post={user.id_post}
                > </Post>)}
              </ul>
            </Col>
          </Row>
          
      </Container>

    </>
  );
  }

}

export default Feed;