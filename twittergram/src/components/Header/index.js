import React from 'react'
import './index.css'
import Menu from '../Menu/index'

const imageUrl = "https://static.vecteezy.com/ti/fotos-gratis/p1/703357-bom-pequeno-amarelo-pato-retrato-isolado-no-branco-foto.jpg"
const Header = () => (
    <header className="app-header">
        
        <img className="photo" src={imageUrl}></img>
        <h1 className="h1-header">Nome Usuário</h1>
        {/* <Profile></Profile> */}
        <Menu />
        
    </header>
)

export default Header