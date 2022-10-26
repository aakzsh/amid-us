import "../styles/meter.css"
import React from "react";

const SentimentMeter = (props) => {

    return (<div className="meter-body2">
<div className="meter-negative" style={{"width": props.negative/2 + "%"}}></div>
<div className="meter-positive" style={{"width": props.positive/2 + "%"}}></div>



    </div>)
}

export default SentimentMeter;


