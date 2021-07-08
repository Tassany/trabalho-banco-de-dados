/* eslint-disable no-undef */
import React, { Component } from  'react'
import {useState, useEffect} from 'react';
import './index.css'

import Container from '../../components/Container'
import Header from '../../components/Header'
import teste from '../../data/teste'
import Post from '../../components/Post'
import axios from 'axios';




export default class Feed extends Component{

  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   refreshPosts();
  //     return () => {
          
  //     }
  // }, [])


  // async function refreshPosts(){
  //     Server.getAllUsers()
  //         .then(
  //             response => {
  //                 setPosts(response.data)
  //             }
  //         )
      
  // }
  state = {
    users: []
  }

  componentDidMount(){
    axios.get(`http://localhost:5000/users`)
      .then(res => {
        const users = res.data;
        this.setState({ users });
      })
  }

  // const lis = teste.map(teste => {
  //   return <Post titulo={teste.name}> </Post>
  // })
  render(){
      return(
    <>
      <Header />
      <Container>
          <h1>Feed</h1>

          <ul>
            { this.state.users.map(user => <Post titulo={user.name}> </Post>)}
          </ul>
          {/* <h2>{posts}</h2>
          {lis} */}
          {/* <Post></Post> */}
      </Container>

    </>
  );
  }

}
