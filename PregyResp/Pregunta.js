import React, { Component } from 'react'
import BoxImg from "../Img/BoxMillonarie.png"

class Pregunta extends Component {

  render() {

    return(
        <div className="container">
         <img src={BoxImg} alt="X" className="box"/>
         <h2 className="centered">{this.props.p}</h2>
        </div>
    ) 
  }
}

export default Pregunta