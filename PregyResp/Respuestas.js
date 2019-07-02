import React, { Component } from 'react'

class Respuestas extends Component {

    onItemClick=(n)=> {
        if( !this.props.alreadyAnswer && this.props.respuestasShow[n]==0)
        {
            this.props.selectResp(n)
        }
    }
 
  render() {

    const pStyle = {
      color:'white'
    };

    return(
        <div>
             <div className="container">
                 <span className="resp" >
                    <img src={ this.props.boxSelect[0]} alt="X" className="boxResp" onClick={()=>{ this.onItemClick(0)}}/>
                    <h2 className={this.props.respuestasShow[0]==0?"centeredRespL":"hidden"}><span className="colorWord">A: </span>
                    <span style={pStyle}>{this.props.r.A}</span></h2>
                 </span>
                 <span className="resp" onClick={()=>{ this.onItemClick(1)}}>
                    <img src={this.props.boxSelect[1]} alt="X" className="boxResp"/>
                    <h2 className={this.props.respuestasShow[1]==0?"centeredRespR":"hidden"}><span className="colorWord">B: </span>{this.props.r.B}</h2>
                </span>
            </div>
            <div className="container">
            <span className="resp" onClick={()=>{ this.onItemClick(2)}}>
                    <img src={this.props.boxSelect[2]} alt="X" className="boxResp"/>
                    <h2 className={this.props.respuestasShow[2]==0?"centeredRespL":"hidden"}><span className="colorWord">C: </span>{this.props.r.C}</h2>
                </span>
                <span className="resp" onClick={()=>{ this.onItemClick(3)}}>
                    <img src={this.props.boxSelect[3]} alt="X" className="boxResp"/>
                    <h2 className={this.props.respuestasShow[3]==0?"centeredRespR":"hidden"}><span className="colorWord">D: </span>{this.props.r.D}</h2>
                </span>
            </div>
        </div>
       
    ) 
  }
}

export default Respuestas