import React, { Component } from 'react'
import Data from './PyR.json';

class CreatePR extends Component {

  constructor(props) {
    super(props)
    this.state = {
      inx:this.props.edit,
      data:this.props.data,
      respA:"",
      respB:"",
      respC:"",
      respD:"",
      Pregunta:"¿?",//"¿?",
      Correcta:"",
      Dificultad:"",
      JsonDataToImport:"",
      CargaTxt:"",
      isLoading:false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.addToDB = this.addToDB.bind(this)
    this.guardarData = this.guardarData.bind(this)
   // this.goToTheMenu = this.goToTheMenu.bind(this)
}

componentDidMount() {
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

  handleChange(event) {
    const {name, value} = event.target
    this.setState({
        [name]: value
    })
  }

  componentWillReceiveProps(nextProps) {//no agarra el this.setState?
    //   // You don't have to do this check first, but it can help prevent an unneeded render
         if (nextProps.data!== null && nextProps.edit!=this.state.inx && nextProps.edit!=-1) {
           this.state.inx=nextProps.data[nextProps.edit].ID
          this.state.Pregunta=nextProps.data[nextProps.edit].Pregunta
          this.state.respA=nextProps.data[nextProps.edit].Respuestas.A
          this.state.respB=nextProps.data[nextProps.edit].Respuestas.B
          this.state.respC=nextProps.data[nextProps.edit].Respuestas.C
          this.state.respD=nextProps.data[nextProps.edit].Respuestas.D

          var correcta="a";
          if(nextProps.data[nextProps.edit].Correcta==1)
            correcta="b"
          else
            if(nextProps.data[nextProps.edit].Correcta==2)
              correcta="c"
            else
              if(nextProps.data[nextProps.edit].Correcta==3)
                correcta="d"

          this.state.Correcta=correcta

          var diff="muy facil";
              if(nextProps.data[nextProps.edit].Dificultad==1)
                diff="facil"
              else
                if(nextProps.data[nextProps.edit].Dificultad==2)
                  diff="moderado"
                else
                  if(nextProps.data[nextProps.edit].Dificultad==3)
                    diff="dificil"
                    else
                    if(nextProps.data[nextProps.edit].Dificultad==4)
                      diff="muy dificil"

          
          this.state.Dificultad=diff
           console.log("ChangeCPR");
         
        }
      
     }

  guardarData(){
    
    this.setState({isLoading:true})
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
      if (req.readyState === XMLHttpRequest.DONE) {
        //alert("Base de Datos Actualizada")
        this.setState({isLoading:false})
      }
    };
    var contID=0
    let textUpload='{"DataPyR": ['
    this.state.data.forEach(element => {
      if(this.state.inx!=contID){
        textUpload+='{"ID":'+contID+',"Pregunta": "'+element.Pregunta+
        '", "Respuestas": {"A":"'+element.Respuestas.A+'","B":"'+element.Respuestas.B+'","C":"'+element.Respuestas.C+
        '","D":"'+element.Respuestas.D+'"},"Correcta":'+element.Correcta+',"Dificultad":'+element.Dificultad+'},'
      }
      else{
        var correcta=0;
        if(this.state.Correcta==="b")
          correcta=1
        else
          if(this.state.Correcta==="c")
            correcta=2
          else
            if(this.state.Correcta==="d")
              correcta=3

        var diff=0;
        if(this.state.Dificultad==="facil")
          diff=1
        else
          if(this.state.Dificultad==="moderado")
            diff=2
          else
            if(this.state.Dificultad==="dificil")
              diff=3
              else
              if(this.state.Dificultad==="muy dificil")
                diff=4

        textUpload+='{"ID":'+contID+',"Pregunta": "'+this.state.Pregunta+
        '", "Respuestas": {"A":"'+this.state.respA+'","B":"'+this.state.respB+'","C":"'+this.state.respC+
        '","D":"'+this.state.respD+'"},"Correcta":'+correcta+',"Dificultad":'+diff+'},'
      }
      contID++
    
    });
    textUpload= textUpload.substring(0, textUpload.length-1)
    textUpload+=']}'
    console.log(textUpload);

    // var auxString=', ;

      req.open("PUT", "https://api.jsonbin.io/b/5d039eee2808a77fb808abbb", true);
      req.setRequestHeader("Content-type", "application/json");
      req.setRequestHeader("secret-key", "$2a$10$Pu8ONKLsYb1TjAsQNFTFwOJaYuQ8Lg8yAJr9rteEwtn3pn0nTaI2a");
      req.setRequestHeader("versioning", "false");
      req.send(textUpload);

     //this.setState({ CargaTxt:this.state.CargaTxt+auxString.substring(0, auxString.length-2) }) 


}

  goToTheMenu=()=> {
    this.props.goBackToMenu();
    this.setState({respA:"",
      respB:"",
      respC:"",
      respD:"",
      Pregunta:"¿?",//"¿?",
      Correcta:"",
      Dificultad:"",
      inx:-1,
    })
    
}

  addToDB(){
 
  
    if(this.state.respA==="" || this.state.respB==="" || this.state.respC==="" || this.state.respD==="" ||
            this.state.Pregunta==="" || this.state.Pregunta==="¿?" )
        alert("Rellena todos los campos");
    else
      if(this.state.Correcta==="")
        alert("Marca la respuesta correcta");
        else
          if( this.state.Dificultad==="")
            alert("Selecciona la dificultad");
            else{
              this.setState({isLoading:true})
              let req = new XMLHttpRequest();

              req.onreadystatechange = () => {
                if (req.readyState === XMLHttpRequest.DONE) {
                  this.setState({isLoading:false})
                }
              };

              var correcta=0;
              if(this.state.Correcta==="b")
                correcta=1
              else
                if(this.state.Correcta==="c")
                  correcta=2
                else
                  if(this.state.Correcta==="d")
                    correcta=3

              var diff=0;
              if(this.state.Dificultad==="facil")
                diff=1
              else
                if(this.state.Dificultad==="moderado")
                  diff=2
                else
                  if(this.state.Dificultad=="dificil")
                    diff=3
                    else
                    if(this.state.Dificultad=="muy dificil")
                      diff=4
          
              
              var auxString=', {"ID":'+this.state.data.length+', "Pregunta": "'+this.state.Pregunta+
              '", "Respuestas": {"A":"'+this.state.respA+'","B":"'+this.state.respB+'","C":"'+this.state.respC+
              '","D":"'+this.state.respD+'"},"Correcta":'+correcta+',"Dificultad":'+diff+'} ]}';

              req.open("PUT", "https://api.jsonbin.io/b/5d039eee2808a77fb808abbb", true);
              req.setRequestHeader("Content-type", "application/json");
              req.setRequestHeader("secret-key", "$2a$10$Pu8ONKLsYb1TjAsQNFTFwOJaYuQ8Lg8yAJr9rteEwtn3pn0nTaI2a");
              req.setRequestHeader("versioning", "false");
              req.send(this.state.JsonDataToImport.substring(0, this.state.JsonDataToImport.length-2)+this.state.CargaTxt+auxString);
              console.log(this.state.JsonDataToImport.substring(0, this.state.JsonDataToImport.length-2)+this.state.CargaTxt+auxString);
              this.setState({ CargaTxt:this.state.CargaTxt+auxString.substring(0, auxString.length-2) }) 
             // console.log(this.state.CargaTxt);
            }
  }

  render() {

    var editMode=false
    if(this.props.edit !=-1 && this.state.data!=null){
      editMode=true
    }
      

    return(
        <div>
          <h2>{editMode?"Editar":"Crear"} Pregunta:</h2>
          <div className={!this.state.isLoading?"hidden":""}>
              <div className="lds-dual-ring"></div>
              <p className="centered">actualizando...</p>
          </div>
          <div className={this.state.isLoading?"hidden":""}>
          <form>
            <p>Pregunta:</p>
            <div><textarea  rows="4" cols="50" value={this.state.Pregunta}
             name="Pregunta" onChange={this.handleChange} /></div>
            <div className="inSameRow">
            <p>Respuesta A:</p>
            <div><input type="text" 
                    value={this.state.respA} 
                    name="respA" 
                    onChange={this.handleChange} />
                    <input  type="radio" 
                            name="Correcta"
                            value="a"
                            checked={this.state.Correcta === "a"}
                            onChange={this.handleChange}/></div>
            <p>Respuesta B:</p>
            <div><input type="text" 
                    value={this.state.respB} 
                    name="respB" 
                    onChange={this.handleChange} />
                    <input  type="radio" 
                            name="Correcta"
                            value="b"
                            checked={this.state.Correcta === "b"}
                            onChange={this.handleChange}/></div>
</div>
<div className="inSameRow">
            <p>Respuesta C:</p>
            <div><input type="text" 
                    value={this.state.respC} 
                    name="respC" 
                    onChange={this.handleChange} />
                    <input  type="radio" 
                            name="Correcta"
                            value="c"
                            checked={this.state.Correcta === "c"}
                            onChange={this.handleChange}/></div>
            <p>Respuesta D:</p>
            <div><input type="text" 
                    value={this.state.respD} 
                    name="respD" 
                    onChange={this.handleChange} />
                    <input  type="radio" 
                            name="Correcta"
                            value="d"
                            checked={this.state.Correcta === "d"}
                            onChange={this.handleChange}/></div>
                            </div>
            <br/>
            <label>Dificultad:</label>
                <select 
                    value={this.state.Dificultad}
                    onChange={this.handleChange}
                    name="Dificultad"
                >
                   <option value="">-Elegir Dificultad-</option>
                    <option value="muy facil">muy facil</option>
                    <option value="facil">facil</option>
                    <option value="moderado">moderado</option>
                    <option value="dificil">dificil</option>
                    <option value="muy dificil">muy dificil</option>
                </select>
           
          </form>
          <br/>
          <button onClick={editMode?this.guardarData:this.addToDB}>{!editMode?"Agregar":"Modificar"}</button>
          <button  onClick={this.goToTheMenu}>Volver</button>
          
        </div>
        </div>
    ) 
  }
}

export default CreatePR