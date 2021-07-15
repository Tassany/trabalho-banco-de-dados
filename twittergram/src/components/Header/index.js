import React from 'react'
import './index.css'
import Menu from '../Menu/index'
import Navbar from 'react-bootstrap/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav'

const imageUrl = "https://static.vecteezy.com/ti/fotos-gratis/p1/703357-bom-pequeno-amarelo-pato-retrato-isolado-no-branco-foto.jpg"
const Header = () => (
<Navbar className="navbar" bg="dark" variant="dark" fixed="top">
    
    <Navbar.Brand href="/feed">TwitterGram</Navbar.Brand>
        <Nav className="me-auto">
            <Nav.Link href="/feed">Feed</Nav.Link>
            <Nav.Link href="/friends">Amigos</Nav.Link>
            <Nav.Link href="/photos">Fotos</Nav.Link>
            <Nav.Link href="/videos">Vídeos</Nav.Link>
            <Nav.Link href="/postar">Postar</Nav.Link>
        </Nav>
    
 </Navbar>

)

export default Header