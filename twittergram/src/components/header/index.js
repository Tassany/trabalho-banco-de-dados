import React from 'react'
import './index.css'
import Menu from '../menu/index'

const Header = () => (
    <header className="app-header">
        <span className="app-header__logo"/>
        <Menu />
    </header>
)

export default Header