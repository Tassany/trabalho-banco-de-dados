import React from  'react'
import {useState, useEffect,useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Header from '../../components/Header'
import api from '../../services/api';
import Button from 'react-bootstrap/Button'


export default function OwnPosts(){
  return(
    <>
      <Header />
      <Container>
          <h1>Fotos</h1>
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
