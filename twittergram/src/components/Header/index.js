import React from 'react'
import './index.css'
import Menu from '../Menu/index'
import Navbar from 'react-bootstrap/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom';

const imageUrl = "https://static.vecteezy.com/ti/fotos-gratis/p1/703357-bom-pequeno-amarelo-pato-retrato-isolado-no-branco-foto.jpg"
const Header = () => (
    <Navbar className="navbar" bg="dark" variant="dark" fixed="top">

        <Navbar.Brand href="/">TwitterGram</Navbar.Brand>
        <Nav className="me-auto">

            <Nav.Link>
                <Link to="/feed" style={{ color: '#fff' }}> Feed </Link>
            </Nav.Link>
            <Nav.Link>
                <Link to="/friends" style={{ color: '#fff' }}>Amigos</Link>
            </Nav.Link>
            <Nav.Link>
                <Link to="/ownposts" style={{ color: '#fff' }}>Suas postagens</Link>
            </Nav.Link>
            <Nav.Link>
                <Link to="/postar" style={{ color: '#fff' }}>Postar</Link>
            </Nav.Link>
        </Nav>

    </Navbar>

)

export default Header