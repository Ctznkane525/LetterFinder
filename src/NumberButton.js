import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';
import {Settings} from './Settings.js'


var CoconutImage = require('./Coconut.png');
var Waves = [];
for ( var i = 0; i <= 9; i++)
{
  Waves[i] = require('./' + i.toString() + '.wav');
}


class NumberButton extends Component
{

  constructor(props) {
    super(props);
    var varLeft = (0 + (Math.random() * (90-0))).toString() + '%';
    console.log(varLeft)
    var timeoutValue = Settings.BUTTON_SPEED_MIN + (Math.random() * (Settings.BUTTON_SPEED_MAX-Settings.BUTTON_SPEED_MIN));
    var numberValue = Math.round(Math.random() * (Settings.MAX_NUMBER));
    

    this.state = { clientId: props.id, wavePath: Waves[numberValue], left: varLeft, top: 0, counter: "Hello", timeoutValue: timeoutValue, numberValue: numberValue };
  }


  updateCount() {
    
    if ( this.myElement.parentElement != null && this.state.top + Settings.BUTTON_WIDTH_AND_HEIGHT > this.myElement.parentElement.clientHeight - 20)
    {
        this.props.parentClickHandler(this.state.clientId, false);
    }
    else
    {
        this.setState((prevState, props) => {
          return { top: prevState.top + 1 }
        });
        this.updateCountTimer = setTimeout(()=> this.updateCount(), this.state.timeoutValue)
    }
  
  }

  componentDidMount()
  {
    this.updateCount();
    //this.buttonClicked = this.buttonClicked.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.updateCountTimer);
  }

  render()
  {
    return (
      <button ref={(input) => { this.myElement = input; }} id={this.state.clientId} onClick={() => this.buttonClicked()} style={{color: "white", fontSize: Settings.BUTTON_FONT_SIZE, fontFamily: "Verdana", border: "none", backgroundColor: "Transparent", backgroundSize: "cover", backgroundImage: "url(" + CoconutImage + ")", position: "absolute", left: this.state.left, top: this.state.top, width: Settings.BUTTON_WIDTH_AND_HEIGHT, height: Settings.BUTTON_WIDTH_AND_HEIGHT}}>
      {this.state.numberValue}
      </button>

    );
  }


  buttonClicked()
  {
    var audio = new Audio(this.state.wavePath);
    audio.play();
    this.props.parentClickHandler(this.state.clientId, true);
  }
}

export default NumberButton;