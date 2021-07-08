/* eslint-disable no-undef */
import React from  'react'
import {useState, useEffect} from 'react';
import './index.css'

import Container from '../../components/Container'
import Header from '../../components/Header'
import teste from '../../data/teste'
import Post from '../../components/Post'
import axios from 'axios';



export default function Feed(){

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
  return(
    <>
      <Header />
      <Container>
          <h1>Feed</h1>

                <ul>
        { this.state.users.map(user => <li>{user.name}</li>)}
      </ul>
          {/* <h2>{posts}</h2>
          {lis} */}
          {/* <Post></Post> */}
      </Container>

    </>
  );
}
