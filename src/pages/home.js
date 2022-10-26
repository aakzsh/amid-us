import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
const whatsapp = require('whatsapp-chat-parser');

const Home = () => {
    const navigate = useNavigate()

    const [messages, setMessages] = useState([]);
    const [isDisabled, setDisabled] = useState(true);

  

    const showFile = async (e) => {
        if(e.target.files[0].name.slice(-3) == "txt"){
            setDisabled(false)

        }
        else{
            alert("Please upload a .txt file of the exported WhatsApp chat")
        }
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => {
            let text = (e.target.result);
            localStorage["chat"] = text

            whatsapp
                .parseString(text)
                .then(messages => {
                    // Do whatever you want with messages
                    console.log(messages);
                    setMessages(messages);
                   

                })
                .catch(err => {
                    // Something went wrong
                    console.error(err);
                });
        };
console.log(messages)

        // localStorage.setItem("chat", JSON.stringify([messages]));
        reader.readAsText(e.target.files[0])
       
    }

    return (<div>
        <div class="s-promo-block-v4 g-fullheight--xs g-bg-position--center swiper-slide home">
            <div class="container g-ver-center--xs g-margin-t-0--xs">
                <div class="row">
                    <div class="col-md-6">
                        <div class="g-margin-b-40--xs">
                            <h1 class="g-font-size-60--xs g-font-size-65--sm g-font-size-75--md g-font-weight--400 g-color--dark">Get Insights into your chats</h1>
                            <p class="g-font-size-22--xs g-font-size-24--sm g-color--dark g-font-weight--400">Analyze your chats with natural language processing powered by expert.ai</p>
                        </div>
                        <a href="/jobs"
                            class="text-uppercase s-btn s-btn--sm s-btn--dark-bg g-padding-x-30--xs">Get Started</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="container g-padding-y-80--xs">
            <div class="row">
                <div class="col-md-6">
                    <h1 class="g-font-weight--700"><b>It's easy than ever to analyze your chats and get first hand data insights</b></h1>
                    <p class="g-font-weight--700 g-color--dark g-font-size-22--xs g-margin-t-25--xs">Identify the bullying, quick notes, make most frequently discussed topics, and many more stats.</p>

                </div>
                <div className="col-md-2"></div>
                <div className="col-md-4"><img class="g-margin-t-0--xs" src="./logo-sm.png" alt="Logo" width="360" /></div>
            </div>

        </div>
        <div class="container g-padding-y-80--xs">

            <div class="row">
                <div class="col-md-7">
                    <h2 class="g-font-size-32--xs g-font-size-36--md g-font-weight--600 g-color--dark">Get Started</h2>
                    <p class="g-font-size-16--xs g-color--dark g-margin-b-30--xs">Upload your chats and we'll show relevant insights for it!</p>
                    
                   
                    <label itemID="chatFile">WhatsApp Chat File *</label>
                    <input className="s-form-v5__input input" type="file" name="Chat File" id="chatFile"
                        placeholder="Select Chat File"
                        onChange={async (e) => {
                            await showFile(e);
                        }} />
                    <button disabled={isDisabled} onClick={async ()=>{
let x = localStorage.getItem("chat");
if(x!=null || x.length!=0){
    navigate('/result')
}
else{
    alert("Something went wrong, please try again")
}
                    }}
                    class="text-uppercase s-btn s-btn--sm s-btn--dark-bg g-padding-x-30--xs">Analyze</button>
                   
                </div>
                <div className="col-md-5">

                    {messages && messages.length > 0 ?
                        <div style={{ "overflow": "auto" }} class="g-bg-color--sky-light g-height-350--xs g-padding-y-10--xs g-padding-x-10--xs">
                            {messages.map(message => {
                                return (<div> <div style={{ "width": "max-content" }} class="g-bg-color--primary-ltr g-padding-y-5--xs g-padding-x-25--xs g-radius--50 g-margin-b-10--xs">
                                    <div class="g-font-size-11--xs g-font-weight-700 text-uppercase g-color--primary">{message?.author}<span class="g-color-dark g-margin-l-5--xs">{message?.date.toLocaleTimeString()}</span></div>
                                    <div style={{ "max-width": "370px" }} class="g-font-size-12--xs g-line-height--xs g-color--dark">{message?.message}</div>
                                </div></div>)
                            })}

                        </div>
                        : <div><img src="./img/inbox.png" alt="inbox" width="400" /></div>}
                </div>
            </div>
        </div>

    </div>)
}

export default Home;
