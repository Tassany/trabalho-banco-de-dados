import React from  'react'

import './index.css'
import Home from '../../assets/images/home.png'

export default props => {
    const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      };
      const tailLayout = {
        wrapperCol: {
          offset: 8,
          span: 16,
        },
      };
      const Demo = () => {
        const onFinish = (values) => {
          console.log('Success:', values);
        };
      
        const onFinishFailed = (errorInfo) => {
          console.log('Failed:', errorInfo);
        };
    }

    return (
        <div className= "container">
            <div className = "cont-text">
                <h1 className = "title" >TWITERGRAM</h1>
            </div>
            <div className= "body">
                <img src= {Home} className= "image"/>
                
                <form className = "form">
                    
                        <label className="email" placeholder= 'email' >
                            
                            <input type= "text" name="email"/>
                        </label>
                        <label className="senha" placeholder= 'senha' >
                            
                            <input type= "text" name="senha"/>
                        </label>

                        <button className="singin" type="submit">Entrar</button>

                        <button className="register" type="submit">Cadastrar</button>
                </form>
               
            </div>
        </div>
    )
} 

