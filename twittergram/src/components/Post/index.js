import React, { Component } from  'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import ListGroup from 'react-bootstrap/ListGroup'
import Photo from '../Photo'

import axios from 'axios';

export default class Post extends Component{
  state ={
    show: false,
    comments: []
  }
  handleClose = ()=>{this.setState({show:false})};
  handleShow =()=>{this.setState({show:true})};

  componentDidMount(){

      axios.get(`http://localhost:5000/posts/132`)
      .then(res => {
        const comments = res.data.comments;
        this.setState({ comments });
        console.log(this.state.comments)
        
      })
      
  }
  render(){
    
    
    return(
      
      <>
        <div className="post-class"> 
            <Card className="card-feed" style={{ width: '30rem' }}>
              <Card.Img variant="top" src={this.props.src} />
              <Card.Body>
                <Card.Title>{this.props.titulo}</Card.Title>
                <Card.Text>
                  {this.props.texto}
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>tags</ListGroupItem>
              </ListGroup>
              <Card.Body>
                <Button variant="primary" onClick={() => this.handleShow()}>
                  Launch demo modal
                </Button>
              </Card.Body>
            </Card>
    
            <Modal show={this.state.show} onHide={() => this.handleClose()}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ul>
                  {this.state.comments.map(user=> <il> {user.text}</il>)}
                  {console.log(this.state.comments)}
                </ul> 
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => this.handleClose()}>
                  Close
                </Button>
                <Button variant="primary" onClick={() => this.handleClose()}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
            
        </div>
      </>
    )
  }
  

}
