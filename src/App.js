import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';
import NumberButton from './NumberButton';
import ProgressBar from './ProgressBar';
import {Settings} from './Settings.js'
import 'jquery/dist/jquery.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


var CoconutDance = require('./CoconutDance.gif')
var BackgroundImage = require('./Background.jpg');
var AppCss = require('./App.css');
var applauseFile = require('./applause.mp3');



library.add(faStroopwafel)

class App extends Component {

  constructor()
  {
    super();
    this.state = {progressBarValue: 0, youWin: 'none'};
    this.updateProgressBar = this.updateProgressBar.bind(this);
  }

  updateProgressBar(pbValue)
  {
    this.setState((previousState, currentProps) => ({progressBarValue: pbValue}));
    
    if ( pbValue == 100 )
    {
      var audio = new Audio(applauseFile);
      audio.addEventListener("ended", function()
      {
      });
      this.setState((previousState, currentProps) => ({youWin: ''}));
      audio.play();
      
    }
  }



  render() {
    return (  
      <div className="App">



            <div style={{position: 'absolute', width: '10%', height: '100%', backgroundColor: '#F2D565', borderRightStyle: 'solid', borderRightWidth: '2px'}}>

              <div style={{position: 'absolute', width: '50%', top: '25%', left: '25%', height: '75%'}}>
              <ProgressBar percentage={this.state.progressBarValue.toString()}></ProgressBar>
              </div>
              

            
            </div>
            <div style={{position: 'absolute', width: '90%', left: '10%', height: '100%'}}>

              <div className="title">
                  <span style={{fontSize:Settings.BIG_TEXT_FONT + "px"}}># # Coconuts</span>
              </div>

              <Game updateProgressEvent={this.updateProgressBar}/>
            
            </div>
        
            <div style={{display: this.state.youWin}} className="youwin">
                <span style={{fontSize:Settings.BIG_TEXT_FONT + "px"}}>Congratulations - You Win!<br/>
                  <img src={require('./CoconutDance.gif')}/>
                  <br/>
                  <button onClick={() => {window.location.href = window.location.href;}}>Play Again</button>
                </span>
                
            </div>
      </div>
    );
  }
}

class Game extends Component
{
  constructor(props) {
    super(props);
    this.state = {items: [0], clickedCount: 0};
    this.addChild = this.addChild.bind(this);
    this.buttonClickHandler = this.buttonClickHandler.bind(this);
  }

  render()
  {
    return (<div id="DivGameBackground" onLoad={() => this.PanelLoaded()} style={{width: '100%', height: '100%', backgroundImage: "url(" + BackgroundImage + ")", backgroundSize: "cover"}}>
      {
          this.state.items.map((item) => (
            <NumberButton key={"Nb" + item.toString()} parentClickHandler={this.buttonClickHandler} id={"Nb" + item.toString()} />
          ))
      }
    </div>);
  }

  componentDidMount()
  {
    this.intervalId = setInterval(this.addChild, Settings.COMPONENT_ADD_INTERVAL);
  }

  buttonClickHandler(clientId, wasClicked) {

    console.log(wasClicked)
    if ( wasClicked)
    {
      console.log("Clicked Count: " + this.state.clickedCount)
      if ( (this.state.clickedCount+1) >= 20)
      {
          console.log("Clearing Items");
          this.setState(function (previousState, currentProps) {
            return {items: []}
          });
          clearInterval(this.intervalId);
      }
      else{
        this.setState(function (previousState, currentProps) 
        {
    
          return {items: previousState.items.filter(element => {
            return element.toString() !== clientId.substring(2) 
          }), clickedCount: wasClicked ? previousState.clickedCount + 1 : previousState.clickedCount};
        });
      }
      
      this.props.updateProgressEvent((this.state.clickedCount+1) * 5);
    }
    else{
      this.setState(function (previousState, currentProps) 
      {
  
        return {items: previousState.items.filter(element => {
          return element.toString() !== clientId.substring(2) 
        }), clickedCount: wasClicked ? previousState.clickedCount + 1 : previousState.clickedCount};
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  addChild() 
  {
   
    this.setState((previousState, currentProps) => {

        if (previousState.items.length == 0)
          return {items:[0]};
        else
          return {items: previousState.items.concat([previousState.items[previousState.items.length-1]+1])};
    });
  }
}

export default App;