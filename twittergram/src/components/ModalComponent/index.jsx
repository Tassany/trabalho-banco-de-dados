import React, { Component } from  'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


import axios from 'axios';

export default class ModalComponent extends Component{
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
        
    
      </>
    )
  }
  

}
