import React from 'react'
import './index.css'
import Photo from '../Photo'


const Post = (props) => (
    <div className="post-class">
        <div className="rectangle-post">
            <h1 className="titulo-post">{props.titulo}</h1>
        </div>

        
        <Photo src="https://static.vecteezy.com/ti/fotos-gratis/p1/703357-bom-pequeno-amarelo-pato-retrato-isolado-no-branco-foto.jpg"></Photo>
        <span>Tags:</span>
    </div>
)

export default Post