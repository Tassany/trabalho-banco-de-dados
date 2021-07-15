import React, { Component } from  'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import ListGroup from 'react-bootstrap/ListGroup'
import Photo from '../Photo'
import Form from 'react-bootstrap/Form'

import axios from 'axios';
const initialFormState ={
  show: false,
  comments: [],
  addComments:{
    id_usuario: 1,
    texto: "",
    id_comentario_pai: null,
  }
}


export default class Post extends Component{
  state ={
    ...initialFormState
  }
  clear = () => {
    this.setState(...initialFormState);
  };

  commentStyle = () => {
    if(!this.state.comments.id_comentario_pai){
      return {paddingLeft:'50px'}
    }
  }

  handleClose = ()=>{this.setState({show:false})};
  handleShow =()=>{this.setState({show:true})};

  handleSubmit = ()=>{
      axios.post(`http://localhost:5000/posts/132/comment`, {
        id_user:  1,
        text: this.state.addComments.texto,
        id_comment_father: null,
      })
      .then(res => {
        this.setState({
          addComments:{texto:''}
        });
        axios.get(`http://localhost:5000/posts/132`)
        .then(res => {
          const comments = res.data.comments;
          this.setState({ comments });
          
        })
        console.log(res); //
        console.log(res.data); //retonar o id


      })
    
  
  };

  componentDidMount(){
      axios.get(`http://localhost:5000/posts/132`)
      .then(res => {
        const comments = res.data.comments;
        this.setState({ comments });
        
      })
  }

  updateField(event) {
    const addComments = { ...this.state.addComments };
    addComments[event.target.name] = event.target.value;
    this.setState({ addComments: addComments });
    
  }
  // handleChange = event => {
  //   this.setState({ addComments: event.target.value });
  // }
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
                    Mostrar Comentários
                </Button>
              </Card.Body>
            </Card>
    
            <Modal show={this.state.show} onHide={() => this.handleClose()}>
              <Modal.Header closeButton>
                <Modal.Title>Comentários</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ul > 
                
                  {this.state.comments.map(user=> 
                  <div style={user.depth ? {marginLeft: user.depth*50+'px'}: {paddingLeft:'0px'}}>
                    <strong>{user.name}: </strong>  <li > {user.text}</li>
                  </div>
                  )}
                </ul>  
                  <form  onSubmit={this.handleSubmit}>
                    <label>Comentário</label>
                    <input
                    type="text"
                    name="texto"
                    value={this.state.addComments.texto}
                    onChange={(e) => this.updateField(e)}
                    placeholder="Digite o comentário"
                    />

                    <Button variant="primary" onClick={this.handleSubmit} >
                      Enviar
                    </Button>

                  </form> 
              </Modal.Body>
              <Modal.Footer>

              </Modal.Footer>
            </Modal>
            
        </div>
      </>
    )
  }
  

}
