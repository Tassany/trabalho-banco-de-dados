import React from 'react'
import { Link } from 'react-router-dom'

import './index.css'

const Menu = () => (
    <nav class="app-menu">
        <ul className="app-menu__list">
            <li className="app-menu__item">
                <Link className="app-menu__link" to="/">
                    Login
                </Link>
            </li>
            <li className="app-menu__item">
                <Link className="app-menu__link" to="/Feed">
                    Feed
                </Link>
            </li>
        </ul>
    </nav>
)

export default Menu