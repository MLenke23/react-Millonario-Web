import React, { Component } from 'react'

class ViewPR extends Component {

    constructor(props){
        super(props)
        this.state={
            data:null,
            mostrar:0,
        }
        this.showPreguntas = this.showPreguntas.bind(this)
        this.guardarData= this.guardarData.bind(this)
    }

    componentWillReceiveProps(nextProps) {//no agarra el this.setState?
          if(nextProps.data!=this.state.data){
            this.state.data=nextProps.data
          }
    }
    goToTheMenu=()=> {
      this.props.goBackToMenu();
  }

  showPreguntas(id){
      this.setState({mostrar:id})
  }
  remove(i){
    console.log(i);
    var dupData=this.state.data
    dupData[i].Dificultad=-2
    this.setState({data:dupData})
    this.guardarData()
  }

  edit(i){
    console.log(i)
    this.props.goToEdit(i)
  }


  guardarData(){
    
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
      if (req.readyState === XMLHttpRequest.DONE) {
        alert("Base de Datos Actualizada")
      }
    };
    var contID=0
    let textUpload='{"DataPyR": ['
    this.state.data.forEach(element => {
      textUpload+='{"ID":'+contID+',"Pregunta": "'+element.Pregunta+
                  '", "Respuestas": {"A":"'+element.Respuestas.A+'","B":"'+element.Respuestas.B+'","C":"'+element.Respuestas.C+
                  '","D":"'+element.Respuestas.D+'"},"Correcta":'+element.Correcta+',"Dificultad":'+element.Dificultad+'},'
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

  render() {

    var pMuyFacil=[]
    var pFacil=[]
    var pModerada=[]
    var pDificil=[]
    var pMuyDificil=[]
    var roots=[1];
    if(this.state.data!=null)
    {
      for (let i = 0; i < this.state.data.length; i++) {
        switch (this.state.data[i].Dificultad) {
          case 0:
            pMuyFacil[pMuyFacil.length] =  i;
            break;
          case 1:
            pFacil[pFacil.length] =  i;
            break;
          case 2:
            pModerada[pModerada.length] =  i;
            break;
          case 3:
            pDificil[pDificil.length] =  i;
            break;
          case 4:
            pMuyDificil[pMuyDificil.length] =  i;
            break;
        }
        
      }
      var cont=-1;
         roots = this.state.data.map(function(num) {
         cont++
         var newArray=[num.Dificultad,num.Pregunta]
         //if(num.Dificultad==0)
          return newArray
        // return 0
         });
        console.log(roots);
    }

    return(
        <div>

            <div className={this.state.mostrar==0?"":"hidden"}>
              <button  onClick={this.goToTheMenu}>Volver</button>
              <button onClick={()=>{ this.showPreguntas(1)}}  className="btnView">Muy Facil : {pMuyFacil.length} </button>
              <button  onClick={()=>{ this.showPreguntas(2)}} className="btnView">Facil : {pFacil.length} </button>
              <button  onClick={()=>{ this.showPreguntas(3)}} className="btnView">Moderada : {pModerada.length} </button>
              <button  onClick={()=>{ this.showPreguntas(4)}} className="btnView">Dificil : {pDificil.length} </button>
              <button  onClick={()=>{ this.showPreguntas(5)}} className="btnView">Muy Dificil : {pMuyDificil.length} </button>
            </div>
            <div className={this.state.mostrar!=0?"container":"hidden"}> <button  onClick={()=>{ this.showPreguntas(0)}}>Volver</button>
            </div>
            <div className={this.state.mostrar!=0?"":"hidden"}>
              { this.state.mostrar==1?"Muy Faciles:":
              this.state.mostrar==2?"Faciles:":this.state.mostrar==3?"Moderadas:":this.state.mostrar==4?"Dificiles:":"Muy Dificiles:"
              }
            </div>

            {roots.map((m,i)=><div  className={m[0]!=(this.state.mostrar-1)?"":"txPregDisplay"} key={i}>{m[0]!=(this.state.mostrar-1)?"":<span>{i +" : "+ m[1]+"\n"}
            <button onClick={()=>{this.edit(i)}}>Edit</button><button onClick={()=>{ if (window.confirm('¿Eliminar la pregunta?')) this.remove(i)}}>Remove</button></span>}</div>)}
            
        </div>
    ) 
  }
}

export default ViewPR