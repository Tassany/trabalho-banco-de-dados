// import React from  'react'
// import {useState, useEffect,useContext} from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './index.css'
// import Card from 'react-bootstrap/Card'
// import Container from 'react-bootstrap/Container'
// import Header from '../../components/Header'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
// import Post from '../../components/Post'
// import { AuthContex } from "../../components/Provider/AuthProvider";
// import axios from 'axios';

// const initialState = {
//   usersPost:["papai","mamae","titia"],
//   user: ["papai","mamae","titia"],
// }

// export default function Feed (props){
//   const [user2, setUser2] = useContext(AuthContex);
//   const [state,setState] = useState(initialState)

//   useEffect(async()=>{
    

//     const usersPost = await axios.get(`http://localhost:5000/users/${user2.id_user}/feed`)
//     const user = await axios.get(`http://localhost:5000/users/${user2.id_user}`)
//       setState({usersPost: usersPost.data, user: user.data})
//       console.log(state.usersPost)
//   },[])
  
//   return(
    
//     <> 
//       <Header />
//       {state &&
//       <Container>
//           <h1>Feed</h1>

//           <Row>
//             <Col md={4}>
//               <Card style={{ width: '18rem' }}>
//                   <Card.Body>
//                     { state.user && state.user.map(user =>
//                     <>
//                       <Card.Title>{user.name}</Card.Title>
//                       <Card.Text>
//                       {user.description}
//                       </Card.Text>
//                     </>
//                       )}

//                   </Card.Body>
//                 </Card>
//             </Col>
//             <Col md={4}>
//               <ul>
//                 { state.usersPost && state.usersPost.map(user => <Post
//                 src={user.url_picture}
//                 titulo={user.title}
//                 texto={user.text}
//                 > </Post>)}
//               </ul>
//             </Col>
//           </Row>
          
//       </Container>
// }
//     </>
    
//   );
  

// }