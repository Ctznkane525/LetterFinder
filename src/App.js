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

var BackgroundImage = require('./Background.jpg');
var AppCss = require('./App.css');



library.add(faStroopwafel)

class App extends Component {

  constructor()
  {
    super();
    this.state = {progressBarValue: 0};
    this.updateProgressBar = this.updateProgressBar.bind(this);
  }

  updateProgressBar(pbValue)
  {
    this.setState((previousState, currentProps) => ({progressBarValue: pbValue}));
    
    if ( pbValue == 100 )
    {
      window.alert("Congratulations! You Win!!");
      window.location.href = window.location.href;
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
            <div style={{position: 'absolute', width: '90%', left: '10%', height: '100%'}}><Game updateProgressEvent={this.updateProgressBar}/></div>
        
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
    setInterval(this.addChild, Settings.COMPONENT_ADD_INTERVAL);
  }

  buttonClickHandler(clientId, wasClicked) {

    this.setState(function (previousState, currentProps) 
    {

      return {items: previousState.items.filter(element => {
        return element.toString() !== clientId.substring(2) 
      }), clickedCount: wasClicked ? previousState.clickedCount + 1 : previousState.clickedCount};
    });

    if ( wasClicked)
    {
      this.props.updateProgressEvent((this.state.clickedCount+1) * 5);
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