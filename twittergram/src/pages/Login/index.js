import React, {Text} from 'react'
import './index.css'
import Home from '../../assets/images/home.png'
export default props => {

    return (
        <div className= "container">
            <div className = "cont-text">
                <h1 className = "title" >TWITERGRAM</h1>
            </div>
            <div className= "body">
                <img src= {Home} className= "image"/>
                <div className = "form">
                    
                </div>
            </div>
        </div>
    )
} 