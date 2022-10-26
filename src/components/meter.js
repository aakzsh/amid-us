import "../styles/meter.css"
import React from "react";

const Meter = (props) => {

    return (<div className="meter-body">
<div className="meter-score" style={{"width": props.score + "%"}}>

</div>

    </div>)
}

export default Meter;


