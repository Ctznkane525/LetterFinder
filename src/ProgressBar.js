import React, { Component } from 'react';

const ProgressBar = (props) => {
    return (
        <div className="progress-bar">
            <Filler percentage={props.percentage}></Filler>
        </div>
    )
}

const Filler = (props) => {
    return (
    <div className="filler" style={{bottom: '0', position: 'absolute', height: (props.percentage.toString() + '%')}}></div>
    )
}

export default ProgressBar;