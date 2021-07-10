import React from 'react'
import './index.css'
import Photo from '../Photo'


const Post = (props) => (
    <div className="post-class">
        <div className="rectangle-post">
            <h1 className="titulo-post">{props.titulo}</h1>
        </div>

        
        <Photo src={props.src}></Photo>
        <span>Tags:</span>
    </div>
)

export default Post