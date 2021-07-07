/* eslint-disable no-undef */
import React from  'react'
import './index.css'

import Container from '../../components/Container'
import Header from '../../components/Header'
import Post from '../../components/Post'
export default function Feed(){
  return(
    <>
      <Header />
      <Container>
          <h1>Feed</h1>
          <Post></Post>
      </Container>

    </>
  );
}
