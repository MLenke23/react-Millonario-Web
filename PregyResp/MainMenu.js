import React, { Component } from 'react'
import Data from './PyR.json';
import App from './MainGame'
import CreatePR from './CreatePR'
import ViewPR from './ViewPR'
import BoxImg from "../Img/BoxMillonarie.png"

class Menu extends Component {

  constructor() {
    super()
    this.state = {
    
      data:null,
      sceneDisplay:0,
      editItem:-1,
    }
    this.goTo = this.goTo.bind(this)
    this.goToEdit = this.goToEdit.bind(this)
    this.goBackToMenu= this.goBackToMenu.bind(this)
    this.reloadData= this.reloadData.bind(this)
  
}

componentDidMount() {

  this.reloadData()

}

reloadData(){
  let req = new XMLHttpRequest();

  req.onreadystatechange = () => {
    if (req.readyState === XMLHttpRequest.DONE) {

      var jsonData= JSON.parse(req.responseText);
      this.setState({   JsonDataToImport:req.responseText, data:jsonData.DataPyR, isLoading: false })
    }
  };
  req.open("GET", "https://api.jsonbin.io/b/5d039eee2808a77fb808abbb", true);
  req.setRequestHeader("secret-key", "$2a$10$Pu8ONKLsYb1TjAsQNFTFwOJaYuQ8Lg8yAJr9rteEwtn3pn0nTaI2a");
  req.send();

  
 
}

goTo(n){
    this.setState({  sceneDisplay:n }) 
}

goToEdit(i){
  this.setState({  sceneDisplay:2,editItem:i})
}

goBackToMenu=index=>{
  this.setState({  sceneDisplay:0, editItem:-1})
  this.reloadData()
}

  render() {

    return(
        <div>
           <h1 className="container">¿Quién Quiere ser Millonario?</h1>

            <div className={(this.state.sceneDisplay==0 && this.state.data!=null)?"container":"hidden"}>
                {/* <div className={this.state.data!=null?"none":"hidden"}> */}

                  <div className="containerMenu resp"  onClick={()=>{ this.goTo(1)}} >
                    <img src={BoxImg} alt="X" className="box"/>
                    <h2 className="centered">JUGAR</h2>
                  </div>
                  <br></br>     
                  <br></br>
                  <div className="containerMenu resp"  onClick={()=>{ this.goTo(2)}} >
                    <img src={BoxImg} alt="X" className="box"/>
                    <h2 className="centered">Crear Preguntas</h2>
                  </div>
                  <br></br>     
                  <br></br>
                  <div className="containerMenu resp"  onClick={()=>{ this.goTo(3)}} >
                    <img src={BoxImg} alt="X" className="box"/>
                    <h2 className="centered">Ver Preguntas</h2>
                  </div>
               
            </div>

            <div className={this.state.data==null?"none":"hidden"}>
            <div className="lds-dual-ring"></div>
                <h3 className="centered">Cargando datos de internet...</h3>
            </div>

            <div className={this.state.sceneDisplay==1?"none":"hidden"}>
                <App data={this.state.data}/>
            </div>

            <div className={this.state.sceneDisplay==2?"none":"hidden"}>
                <CreatePR data={this.state.data} goBackToMenu={this.goBackToMenu} edit={this.state.editItem}/>
            </div>
            <div className={this.state.sceneDisplay==3?"none":"hidden"}>
                <ViewPR data={this.state.data} goBackToMenu={this.goBackToMenu} goToEdit={this.goToEdit}/>
            </div>
           
        </div>
    ) 
  }
}

export default Menu