import { TagCloud } from 'react-tagcloud'
import React, { useEffect, useState } from "react";
const whatsapp = require('whatsapp-chat-parser');




const Result = () => {
    const data = [
        { value: 'JavaScript', count: 38 },
        { value: 'React', count: 30 },
        { value: 'Nodejs', count: 28 },
        { value: 'Express.js', count: 25 },
        { value: 'HTML5', count: 33 },
        { value: 'MongoDB', count: 18 },
      ]
       
let text =  localStorage.getItem("chat")
const [messages, setMessages] = useState([]);
const [messageCount, setMessageCount] = useState(0);
const [wordCount, setWordCount] = useState(0);
const [rawText, setRawText] = useState("");


const findMessageCount = (msg)=>{

    setMessageCount(msg.length)

}

const findWordCount = (msg)=>{
let count = 0;
    for (let index = 0; index < msg.length; index++) {
        
        count += msg[index]['message'].split(" ").length
        setRawText(rawText + " " + msg[index]['message'])
    }

    setWordCount(count)
}

useEffect(() => {
    whatsapp
    .parseString(text)
    .then(messages => {
        

        messages = messages.filter(function( obj ) {
            return obj.author !== "System" && obj.message!='<Media omitted>';
          });

        setMessages(messages);

        console.log(messages);
       findMessageCount(messages)
       findWordCount(messages)
    
    })
            
            
               }, [] );
    

    return (<div>
      <div class="container g-padding-y-80--xs">
         

          <p>word cloud</p>
          <p>word count: {wordCount}</p>
        <div style={{"width": "50rem"}}>
        <TagCloud
          
          minSize={12}
          maxSize={35}
          tags={data}
          onClick={tag => alert(`'${tag.value}' was selected!`)}
        />
        </div>
          <p>messages count: {messageCount}</p>
          <p>most active hours</p>
          <p>user activity</p>
          <p>abuse checker</p>
          <p>overall sentiment</p>
          <p>frequent topics of discussion</p>
          <p>individual sentiments</p>
          <p>important topics by week</p>
<p>{messages.toString()}</p>
        </div>
    </div>)
}

export default Result;
