import { TagCloud } from "react-tagcloud";
import "../styles/result.css";
import clock from '../images/clock.png'
import trends from '../images/trend.png'
import chaticon from "../images/messages.png";
import wpmicon from "../images/wpm.png";
import downloadicon from '../images/download.png'
import chevron from '../images/chevron.png'
import wordsicon from "../images/words.png";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import React, { useEffect, useState } from "react";
import Meter from "../components/meter";
import { Doughnut } from "react-chartjs-2/dist";
import SentimentMeter from "../components/sentiment-meter";
import Collapsible from 'react-collapsible';
import { pdfFromReact } from "generate-pdf-from-react-html";


const whatsapp = require("whatsapp-chat-parser");


const Result = () => {

    ChartJS.register(ArcElement, Tooltip, Legend);

const chartdata = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

  let text = localStorage.getItem("chat");
  const [messages, setMessages] = useState([]);
  const [messageCount, setMessageCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [data, setData] = useState([]);

  const [wpm, setwpm] = useState(0);
  const [rawText, setRawText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const findMostFrequent = (str) => {
    var num = 10;
    const strArr = str.toLowerCase().split(' ');
    const map = {};
    strArr.forEach(word => {
       if(word.length>3){
        if(map.hasOwnProperty(word)){
            map[word]++;
         }else{
            map[word] = 1;
         }
       }
    });
    const frequencyArr = Object.keys(map).map(key => [key, map[key]]);
    frequencyArr.sort((a, b) => b[1] - a[1]);
var wordfreq = []

for (let index = 0; index < 20; index++) {
    wordfreq.push({"value": frequencyArr[index][0],"count": frequencyArr[index][1] })
}
setData(wordfreq)

    console.log(frequencyArr);
 };


  const findMessageCount = (msg) => {
    setMessageCount(msg.length);
  };
  const findWordCount = (msg) => {
    let count = 0;
    let rawT = "";
    setRawText("");
    for (let index = 0; index < msg.length; index++) {
      count += msg[index]["message"].split(" ").length;
      rawT += " " + msg[index]["message"];
    }

    setRawText(rawT);

    setWordCount(count);
  };

  const findHateSpeech = () => {};
  const findActiveHours = () => {};
  const findTrends = () => {};
  const findSentiment = () => {};

useEffect(()=>{
    console.log(wordCount/messageCount)
    if(wordCount){
       setwpm(Math.round(wordCount/messageCount))
       findMostFrequent(rawText)
    }

}, [wordCount, messageCount])

  useEffect( () => {
    whatsapp.parseString(text).then((messages) => {
      messages = messages.filter(function (obj) {
        return obj.author !== "System" && obj.message != "<Media omitted>";
      });

      setMessages(messages);

      console.log(messages);

      (async () => {
        await findMessageCount(messages);
        await findWordCount(messages)
      })();

     
      console.log(wordCount, messageCount)
    //   findMostFrequent(rawText);
      findHateSpeech();
      findActiveHours();
      findTrends();
      findSentiment();
      setIsLoading(false)
    });
  }, []);

  return (
    <div>
      {
        isLoading?<div className="container g-padding-y-80--xs  g-fullheight--xs loading">

<div className="loader2"></div>
<h3>We're loading your stats</h3>
        </div>:<div className="container g-padding-y-80--xs fullpage">
        <h1 className="g-font-weight--500 g-font-size-50--xs">
          <b>Chat Analysis</b>
        </h1>

        <div className="wordcloud-parent">
          <div className="cloud-cont"><center> <TagCloud maxSize={35} minSize={20} tags={data}/></center> </div>
          <p className="cloud-text subheading">Word Cloud</p>
        </div>

        <div className="message-summary">
          <div className="summary-child">
            <img src={chaticon} alt="" className="iconimage" />
            <h2 className="count">{messageCount}</h2>
            <h4 className="topic">Messages</h4>
          </div>
          <div className="summary-child">
            <img src={wordsicon} alt="" className="iconimage" />
            <h2 className="count">{wordCount}</h2>
            <h4 className="topic">Words</h4>
          </div>
          <div className="summary-child">
            <img src={wpmicon} alt="" className="iconimage" />
            <h2 className="count">{wpm}</h2>
            <h4 className="topic">Words/Message</h4>
          </div>
        </div>

        <div className="hatespeech">
<p className="subheading">Hate Speech Meter</p>
<Meter score={40}/>
<h4><b>{"Score: 37/100 [Moderate]"}</b></h4>
        </div>


        <div className="most">

<div className="most-child">
<p className="subheading">Most Active Hours</p>
    <div className="icon-content">
    <img src={clock} alt="" className="most-child-icon"/>
<h4><b>{"7:00 - 8:00"}</b></h4>
    </div>

</div>
<div className="most-child">
<p className="subheading">Most Talked Topics</p>
<div className="icon-content">
    <img src={trends} alt="" className="most-child-icon"/>
<h4><b>{"7:00 - 8:00"}</b></h4>
    </div>

</div>
        </div>

        <div className="sentiment">
<p className="subheading">Sentiment Analysis</p>
<SentimentMeter score={40} positive={40} negative={30}/>

<div className="sentiment-score">
<h3><b>Overall Sentiment Score:</b></h3>
<h1><b>+10</b></h1>
</div>

<div className="sentiments">
<div className="chart-parent">
    <h3><b>Emotional Analysis</b></h3>
<Doughnut data={chartdata}/>
</div>
<div className="chart-parent">
    <h3><b>Behavioral Analysis</b></h3>
<Doughnut data={chartdata}/>
</div>
</div>
        </div>
        

        <div className="indie">
<p className="subheading">Individual Stats</p>
<Collapsible trigger={[<h4><b>Aakash</b></h4>, <div className="rightcol"><img src={wpmicon} height="50rem" alt="" srcset="" />
<h4><b>76 Messages</b></h4>
<div style={{"width": "2rem"}}></div>
<img src={chevron} alt="" style={{"height": "3rem"}} />
</div> ]}>     

<div className="collapse-parent">
<div>
<div className="collapse-item">
<h5>Most Active Hours</h5>
<h6><b>00:00 - 01:00</b></h6>

</div>
<div className="collapse-item">
<h5>Most Active Hours</h5>
<h6><b>00:00 - 01:00</b></h6>

</div>
</div>

<div>
<div className="collapse-item">
<h5>Most Active Hours</h5>
<h6><b>00:00 - 01:00</b></h6>

</div>
<div className="collapse-item">
<h5>Most Active Hours</h5>
<h6><b>00:00 - 01:00</b></h6>

</div>
</div>

<div>
<div className="collapse-item">
<h5>Most Active Hours</h5>
<h6><b>00:00 - 01:00</b></h6>

</div>
<div className="collapse-item">
<h5>Most Active Hours</h5>
<h6><b>00:00 - 01:00</b></h6>

</div>
</div>

</div>
      
    </Collapsible>
        </div>


<div className="download-report" onClick={()=>{
        window.print();

}}>
<img src={downloadicon} alt="" style={{"height": "2rem"}} />
</div>

      </div>
      }
    </div>
  );
};

export default Result;
