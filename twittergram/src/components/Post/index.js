import React from 'react'
import './index.css'


const Post = (props) => (
    <div className="post-class">
        {/* <div className="rectangle-post"></div> */}
        <img className="photo-post" src="https://static.vecteezy.com/ti/fotos-gratis/p1/703357-bom-pequeno-amarelo-pato-retrato-isolado-no-branco-foto.jpg"></img>
        <h1>{props.titulo}</h1>
        <span>Tags:</span>
    </div>
)

export default Post