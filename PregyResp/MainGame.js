import React, { Component } from 'react'
import Pregunta from './Pregunta'
import Respuestas from './Respuestas'
import Data from '../Data/PyR2.json'//'./PyR.json'//'../Data/PyR.json';


import BoxImg from "../Img/BoxMillonarie.png"
import BoxSelect from "../Img/BoxMillonarie22.png"
import BoxWrong from "../Img/BoxMillonarieWrong.png"
import BoxCorrect from "../Img/BoxMillonarieCorrect.png"
import Btn50 from "../Img/qqsm_iconButton.png"
import BtnExit from "../Img/qqsm_iconButton_Exit.png"


class App extends Component {

  constructor(props){
    super(props)
    this.state={
      inx:0,
      data:this.props.data,
      estadoJuegoDisplay:"1° Pregunta",
      boxSelector:[BoxImg,BoxImg,BoxImg,BoxImg],
      alreadyAnswer:false,
      isLoading:false,
      nroPregunta:1,
      gameOver:false,
      PreguntasHechas:[],
      InitPregHechas:[],
      respuestasShow:[0,0,0,0],
      help50Used:false,
      showStatusGame:0,
      premios: [18,14,12,10,8,6,4,3,2,1],
      seRetira:false,
    }
    this.resetGame= this.resetGame.bind(this)
  }


  // componentDidMount() {
  //   // this.setState({ isLoading: true });
  //   // fetch('https://api.jsonbin.io/b/5d01476258196b429f52ff14')//'https://jsonblob.com/api/bf035fdc-8d20-11e9-8bcb-2300ed03e1f9')
  //   //  .then(response => {
  //   //    if (response.ok) { 
  //   //     return response.json();
  //   //    } else {
  //   //     throw new Error('Something went wrong ...');
  //   //    }
  //   // })
  //   // .then(json => this.setState({ data: json.DataPyR, isLoading: false }) )

  //   // .catch(error => this.setState({ error, isLoading: false }));

  //   let req = new XMLHttpRequest();

  //   req.onreadystatechange = () => {
  //     if (req.readyState == XMLHttpRequest.DONE) {
  //       var jsonData= JSON.parse(req.responseText);
  //       this.setState({ data:jsonData.DataPyR, isLoading: false }) 
  //     }
  //   };
  //   req.open("GET", "https://api.jsonbin.io/b/5d01672f2132b7426d001cdf", true);
  //   req.setRequestHeader("secret-key", "$2a$10$Pu8ONKLsYb1TjAsQNFTFwOJaYuQ8Lg8yAJr9rteEwtn3pn0nTaI2a");
  //   req.send();

  // }

  
    componentWillReceiveProps(nextProps) {//no agarra el this.setState?
  //   // You don't have to do this check first, but it can help prevent an unneeded render
       if (nextProps.data!== null) {
         this.state.originalSizePreguntas={originalSizePreguntas:nextProps.data.length};
         console.log("Change");
       for (let i = this.state.PreguntasHechas.length; i <nextProps.data.length; i++) {
           this.state.PreguntasHechas.push(i)
           this.state.InitPregHechas.push(i)
       }
  //     console.log(this.state.PreguntasHechas);
  //       //this.setState({ startTime: nextProps.startTime });
          this.state.inx=this.state.PreguntasHechas[(Math.floor(Math.random() * this.state.PreguntasHechas.length))];
          //this.setState={inx:3};//no funca?
      }
    
   }

   resetGame(){
     console.log("resetGames")
    var vector=[0,0,0,0]
      this.setState({alreadyAnswer: false, nroPregunta:1,gameOver:false,help50Used:false,
         respuestasShow:vector,showStatusGame:0,seRetira:false})
      this.setState(state => {
      state.boxSelector.map((item, j) => {
            state.boxSelector[j]=BoxImg;
            return ;
        });
      });
     // this.state.PreguntasHechas.splice( this.state.PreguntasHechas.indexOf(this.state.inx), 1 );
      var nextInx=this.state.PreguntasHechas[(Math.floor(Math.random() * this.state.PreguntasHechas.length))]
      this.setState({estadoJuegoDisplay: "Pregunta Numero "+1,
                    inx:nextInx})
   }

   helpMitad(){
     if(!this.state.alreadyAnswer){
      var vector=[1,1,1,1]
      vector[this.props.data[this.state.inx].Correcta] =0;
      var rndNum=Math.floor(Math.random() * 4);
      var cont=0;
      while(rndNum==this.props.data[this.state.inx].Correcta || cont<25){
       rndNum=Math.floor(Math.random() * 4);
       cont++;
      }
      vector[rndNum]=0;
      this.setState({respuestasShow:vector, help50Used:true})
     }
  
   }
   retirarse(){
    if(!this.state.alreadyAnswer){
      this.setState({showStatusGame:2, seRetira:true})
    }
  }

  selectResp=index=>{
    console.log("responde: "+index);
    this.setState({alreadyAnswer: true})
    this.setState({estadoJuegoDisplay: "Tu respuesta es..."})
    this.setState(state => {
      const list = state.boxSelector.map((item, j) => {
        if (j === index) {
          state.boxSelector[j]=BoxSelect;
          return 
        } else
          return item;
      });
      return {
        list,
      };
    });

    setTimeout(()=>{this.resolve(index)}, 3000);//setTimeout(this.setState, 3000, );
  }

  resolve(index){
    if(index===this.props.data[this.state.inx].Correcta){
      this.setState({estadoJuegoDisplay: "Correcta!"})
    }
    else
      {
        this.setState({estadoJuegoDisplay: "Incorrecta",gameOver:true})
      }
      this.setState(state => {
        const list = state.boxSelector.map((item, j) => {
          if (j === index) {
              if(j===this.props.data[this.state.inx].Correcta)
                  state.boxSelector[j]=BoxCorrect;
              else
                  state.boxSelector[j]=BoxWrong;
              //return ;
          } else {
            if(j===this.props.data[this.state.inx].Correcta)
                state.boxSelector[j]=BoxCorrect;
            //return item;
          }
        });
        return {
          list,
        };
      });

      setTimeout(()=>{this.changeQuestion()}, 3000);
  }

  changeQuestion(){
    if(!this.state.gameOver)
    {
      var vector=[0,0,0,0]

      this.setState({alreadyAnswer: false, nroPregunta:this.state.nroPregunta+1, respuestasShow:vector})
      this.setState(state => {
      state.boxSelector.map((item, j) => {
            state.boxSelector[j]=BoxImg;
            return ;
        });
        // return {
        //   list,
        // };
      });

      //chack if the preguntashechas is going to end
      if(this.state.PreguntasHechas.length<2){
        console.log("reset");
        this.setState({PreguntasHechas:this.state.InitPregHechas});
      }
     
      //___

      this.state.PreguntasHechas.splice( this.state.PreguntasHechas.indexOf(this.state.inx), 1 );
      console.log('t:'+this.state.PreguntasHechas);
      var nextInx=this.state.PreguntasHechas[(Math.floor(Math.random() * this.state.PreguntasHechas.length))]
       console.log(this.state.PreguntasHechas[(Math.floor(Math.random() * this.state.PreguntasHechas.length))])
      this.setState({estadoJuegoDisplay: "Pregunta Numero "+this.state.nroPregunta,
                    inx:nextInx})
    }else{
      this.setState({showStatusGame:1})
      //alert("Se acabo el juego. \nPreguntas Respondidas: "+(this.state.nroPregunta-1)+" ." );
    }
    
  }

  renderTableData() {
   
    return this.state.premios.map((p, index) => {
       return (
          <tr key={index}>
             <td className={index==this.state.premios.length-(this.state.nroPregunta)?"selectedTabla backgroundAnimated colorTabla":
             (index==this.state.premios.length-3 || index==this.state.premios.length-6 || index==this.state.premios.length-10)?"safeTabla colorTabla":"colorTabla"}>
             {this.state.premios.length-index} &#187; &nbsp;&nbsp;&nbsp;{p} Ticket</td>
          </tr>
       )
    })
 }


  render() {

    var safePrize=0
    if(this.state.nroPregunta>3)safePrize=3//this.state.premios[this.state.premios.length-(3)]
    else   if(this.state.nroPregunta>6)safePrize=8//this.state.premios[this.state.premios.length-(6)]
    else   if(this.state.nroPregunta>10)safePrize=18//this.state.premios[this.state.premios.length-(10)]

    return(
        <div>
           <div className={this.state.showStatusGame==1?"boxPuntajes":"hidden"}>
             <h3 className="container colorBlocks">Fin del Juego</h3>
             <p className="container colorBlocks">Tickets Ganados:{this.state.seRetira?(this.state.nroPregunta==1?0:this.state.premios[this.state.premios.length-(this.state.nroPregunta)+1])
             :safePrize}</p>
             <button  onClick={this.resetGame} className="container colorBlocks">Volver a Jugar</button>
           </div>
           <div className={this.state.showStatusGame==2?"boxPuntajes":"hidden"}>
             <h3 className="container colorBlocks">¿Retirarse del Juego?</h3>
             <table className="container">
             <tbody>
                  {this.renderTableData()}
               </tbody>
             </table>
             <p className="container colorBlocks">Tickets que ganarias: {this.state.nroPregunta==1?0:this.state.premios[this.state.premios.length-(this.state.nroPregunta)+1]}</p>
             <button onClick={()=>this.setState({showStatusGame:0})} className="container colorBlocks">Seguir Jugando</button>
             <button onClick={()=>this.setState({showStatusGame:1})} className="container colorBlocks">Retirarse</button>
           </div>

             {/* <div className={this.state.gameOver?"none":"hidden"}>
                <button className="container" onClick={this.resetGame}>Volver a Jugar</button>
             </div> */}
             <div className="btnContainer">
               <img src={Btn50} onClick={()=>{ this.helpMitad()}} className={!this.state.help50Used?"btnIcon resp":"hidden"} alt="50"/>

               <img src={BtnExit}  onClick={()=>{ this.retirarse()}} className="btnIconRight resp" alt="50"/>
             </div>

               <h2 className="estJuego">{this.state.estadoJuegoDisplay}</h2>

          <Pregunta p={this.props.data==null?"Loading...":this.props.data[this.state.inx].Pregunta}/>
          <Respuestas r={this.props.data==null?"Loading...":this.props.data[this.state.inx].Respuestas}
           boxSelect={this.state.boxSelector} selectResp={this.selectResp} alreadyAnswer={this.state.alreadyAnswer} 
           respuestasShow={this.state.respuestasShow}/>
        </div>
    ) 
  }
}

export default App