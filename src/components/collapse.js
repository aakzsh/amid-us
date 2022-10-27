import React, { useState } from "react";
import chevron from "../images/chevron.png";

import wpmicon from "../images/wpm.png";
import Collapsible from "react-collapsible";
import { getSentimentAnalysis, getHateSpeechAnalysis } from "../utils/api";



const Collapse = (props) => {

  const findActiveHours = (msg) => {
    var hrs = { "00:00 - 04:00": 0, "04:00 - 08:00": 0, "08:00 - 12:00": 0, "12:00 - 16:00": 0, "16:00 - 20:00": 0, "20:00 - 24:00": 0, }

    var messages = msg.filter(function (obj) {
      return obj.date.getHours() >= 0 && obj.date.getHours() < 4;
    });
    hrs["00:00 - 04:00"] = messages.length
    messages = msg.filter(function (obj) {
      return obj.date.getHours() >= 4 && obj.date.getHours() < 8;
    });
    hrs["04:00 - 08:00"] = messages.length

    messages = msg.filter(function (obj) {
      return obj.date.getHours() >= 8 && obj.date.getHours() < 12;
    });
    hrs["08:00 - 12:00"] = messages.length

    messages = msg.filter(function (obj) {
      return obj.date.getHours() >= 12 && obj.date.getHours() < 16;
    });
    hrs["12:00 - 16:00"] = messages.length

    messages = msg.filter(function (obj) {
      return obj.date.getHours() >= 16 && obj.date.getHours() < 20;
    });
    hrs["16:00 - 20:00"] = messages.length

    messages = msg.filter(function (obj) {
      return obj.date.getHours() >= 20 && obj.date.getHours() < 24;
    });
    hrs["20:00 - 24:00"] = messages.length
    // console.log()
    setHours(Object.keys(hrs).reduce((a, b) => hrs[a] > hrs[b] ? a : b))
    console.log(hrs)
  };


 const  onOpenCallback = () => {

let msg = "";

for (let index = 0; index < props.message.length; index++) {
  msg+= props.message[index]["message"] + " ";
  
}

  getSentimentAnalysis(msg).then(value => {
    console.log(value)
    setSentiment(value.overall)
  })

  getHateSpeechAnalysis(msg).then((value) => {
    console.log(value);
    let hsTags = value.categories;
    let score = 0;
    for (let index = 0; index < hsTags.length; index++) {
      score += hsTags[index].score;
    }

    console.log(score, hsTags);
    setHs(Math.round(score / hsTags.length/10));
  });

  findActiveHours(props.message);
 }
      



const [activeHours, setHours] = useState("00:00 - 04:00");
const [sentiment, setSentiment] = useState(0);
const [hs, setHs] = useState(0)

    return <div>
        <Collapsible
              trigger={[
                <h4>
                  <b>{props.name}</b>
                </h4>,
                <div className="rightcol">
                  <img src={wpmicon} height="50rem" alt="" srcset="" />
                  <h4>
                    <b>{props.messageCount} Messages</b>
                  </h4>
                  <div style={{ width: "2rem" }}></div>
                  <img src={chevron} alt="" style={{ height: "3rem" }} />
                </div>,
              ]}

              onOpen = {()=>{onOpenCallback()}}
            >
              <div className="collapse-parent">
                <div>
                  <div className="collapse-item">
                    <h5>Most Active Hours</h5>
                    <h6>
                      <b>{activeHours}</b>
                    </h6>
                  </div>
                 
                </div>

                <div>
                  <div className="collapse-item">
                    <h5>Hate Speech Score</h5>
                    <h6>
                      <b>{hs}</b>
                    </h6>
                  </div>
                  
                </div>

                <div>
                  <div className="collapse-item">
                    <h5>Sentiment Score</h5>
                    <h6>
                      <b>{sentiment}</b>
                    </h6>
                  </div>
                 
                </div>
              </div>
            </Collapsible>
    </div>
}

export default Collapse;