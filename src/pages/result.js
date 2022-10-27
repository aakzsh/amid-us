import { TagCloud } from "react-tagcloud";
import "../styles/result.css";
import clock from "../images/clock.png";
import trends from "../images/trend.png";
import chaticon from "../images/messages.png";
import wpmicon from "../images/wpm.png";
import downloadicon from "../images/download.png";
import chevron from "../images/chevron.png";
import wordsicon from "../images/words.png";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import DonutChart from 'react-donut-chart';
import Meter from "../components/meter";
import { Doughnut } from "react-chartjs-2/dist";
import SentimentMeter from "../components/sentiment-meter";

import { pdfFromReact } from "generate-pdf-from-react-html";
import {
  getKeyElements,
  getSentimentAnalysis,
  getHateSpeechAnalysis,
  getBehaviouralAnalysis,
  getEmotionalAnalysis
} from "../utils/api";
import Collapse from "../components/collapse";

const whatsapp = require("whatsapp-chat-parser");

const Result = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const tempcd = {
    labels: ["Red", "blue", "green"],
    datasets: [
      {
        label: "# of Votes",
        data: [1, 1, 1],
        backgroundColor: [
          "#5B6145", "#889261", "#4CC05F"
        ],
        borderColor: [
          "#5B6145", "#889261", "#4CC05F"
        ],
        borderWidth: 1,
      },
    ],
  };

  const getHSLevel = (level) => {
    if (level < 20) {
      return "[Very Low]";
    } else if (level >= 20 || level < 40) {
      return "[Low]";
    } else if (level >= 40 || level < 60) {
      return "[Moderate]";
    } else if (level >= 60 || level < 80) {
      return "[High]";
    } else if (level >= 80 || level <= 100) {
      return "[Extremely High]";
    }
  };



  let text = localStorage.getItem("chat");
  const [messages, setMessages] = useState([]);
  const [topicsArr, setTopicsArr] = useState([]);
  const [messageCount, setMessageCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [data, setData] = useState([]);
  const [uniqueAuthors, setAuthors] = useState([]);
  const [hours, setHours] = useState("");

  const [wpm, setwpm] = useState(0);
  const [hs, seths] = useState(0);
  const [rawText, setRawText] = useState("");
  const [sentimentNeg, setSentimentNeg] = useState(0);
  const [sentimentPos, setSentimentPos] = useState(0);
  const [sentimentOverall, setSentimentOverall] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [chart1Data, setChart1Data] = useState([]);

  const findMostFrequent = (str) => {
    var num = 20;
    const stopwords = ["a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't", "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "can't", "cannot", "could", "couldn't", "did", "didn't", "do", "does", "doesn't", "doing", "don't", "down", "during", "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't", "have", "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't", "it", "it's", "its", "itself", "let's", "me", "more", "most", "mustn't", "my", "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own", "same", "shan't", "she", "she'd", "she'll", "she's", "should", "shouldn't", "so", "some", "such", "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then", "there", "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this", "those", "through", "to", "too", "under", "until", "up", "very", "was", "wasn't", "we", "we'd", "we'll", "we're", "we've", "were", "weren't", "what", "what's", "when", "when's", "where", "where's", "which", "while", "who", "who's", "whom", "why", "why's", "with", "will", "won't", "would", "wouldn't", "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves"];
    const strArr = str.toLowerCase().split(" ");
    const map = {};
    strArr.forEach((word) => {
      if (!stopwords.includes(word) && word.length > 2) {
        if (map.hasOwnProperty(word)) {
          map[word]++;
        } else {
          map[word] = 1;
        }
      }
    });
    const frequencyArr = Object.keys(map).map((key) => [key, map[key]]);
    frequencyArr.sort((a, b) => b[1] - a[1]);
    var wordfreq = [];

    for (let index = 0; index < num; index++) {
      wordfreq.push({
        value: frequencyArr[index][0],
        count: frequencyArr[index][1],
      });
    }
    setData(wordfreq);

    // console.log(frequencyArr);
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

  const findHateSpeech = () => { };
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
  const findTrends = () => { };
  const findSentiment = () => { };

  useEffect(() => {
    // console.log(wordCount / messageCount);
    if (wordCount) {
      setwpm(Math.round(wordCount / messageCount));
      findMostFrequent(rawText);

      const arrayUniqueByKey = [...new Map(messages.map(item =>
        [item["author"], item])).values()];
      var tempdata = []

      for (let index = 0; index < arrayUniqueByKey.length; index++) {
        // const element = array[index];
        // console.log()
        tempdata.push(arrayUniqueByKey[index]["author"])
      }
      setAuthors(tempdata)
      // console.log(tempdata)
    }
  }, [wordCount, messageCount]);

  useEffect(() => {
    if (rawText != "") {
      // getKeyElements(rawText).then((value) => {
      //   const topics = value.topics;

      //   let tempTopics = [];
      //   let len = topics.length > 3 ? 3 : topics.length;
      //   for (let i = 0; i < len; i++) {
      //     tempTopics.push(topics[i].label);
      //   }

      //   console.log(tempTopics)
      //   setTopicsArr(tempTopics);
      // });
      // getHateSpeechAnalysis(rawText).then((value) => {
      //   console.log(value);
      //   let hsTags = value.categories;
      //   let score = 0;
      //   // let count = 0;
      //   for (let index = 0; index < hsTags.length; index++) {
      //     score += hsTags[index].score;
      //   }

      //   console.log(score, hsTags);
      //   seths(Math.round(score / hsTags.length));
      // });

      // getSentimentAnalysis(rawText).then(value => {
      //   setSentimentNeg(value.negativity)
      //   setSentimentPos(value.positivity)
      //   setSentimentOverall(value.overall)
      // })

      // const chartdata = {
      //   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      //   datasets: [
      //     {
      //       label: "# of Votes",
      //       data: [12, 19, 3, 5, 2, 3],
      //       backgroundColor: [
      //         "rgba(255, 99, 132, 0.2)",
      //         "rgba(54, 162, 235, 0.2)",
      //         "rgba(255, 206, 86, 0.2)",
      //         "rgba(75, 192, 192, 0.2)",
      //         "rgba(153, 102, 255, 0.2)",
      //         "rgba(255, 159, 64, 0.2)",
      //       ],
      //       borderColor: [
      //         "rgba(255, 99, 132, 1)",
      //         "rgba(54, 162, 235, 1)",
      //         "rgba(255, 206, 86, 1)",
      //         "rgba(75, 192, 192, 1)",
      //         "rgba(153, 102, 255, 1)",
      //         "rgba(255, 159, 64, 1)",
      //       ],
      //       borderWidth: 1,
      //     },
      //   ],
      // };

      //       getBehaviouralAnalysis(rawText).then((value) => {
      //         console.log(value)
      // var finalCD = [];
      //         let tempLabels = [];
      //         let tempData = [];

      //         const data = value.categories;
      //         for (let i = 0; i < data.length; i++) {
      //   finalCD.push({"label": data[i].label,"value": data[i].score })
      //         }

      //         console.log(finalCD)

      //         const cd = {
      //           labels: tempLabels,
      //           dataset: [
      //             {
      //               data: tempData,
      //               label: "# of Votes",
      //               backgroundColor: [
      //                 "rgba(255, 99, 132, 0.2)",
      //                 "rgba(54, 162, 235, 0.2)",
      //                 "rgba(255, 206, 86, 0.2)",
      //               ],
      //               borderColor: [
      //                 "rgba(255, 99, 132, 1)",
      //                 "rgba(54, 162, 235, 1)",
      //                 "rgba(255, 206, 86, 1)",
      //               ],
      //               borderWidth: 1,
      //             },
      //           ],
      //         }
      // console.log(cd)
      //         setChartData(finalCD);
      //       },


      //       getEmotionalAnalysis(rawText).then((value) => {
      //         console.log(value)
      //         var finalCD = [];

      //         const data = value.categories;
      //         for (let i = 0; i < data.length; i++) {
      //   finalCD.push({"label": data[i].label,"value": data[i].score })
      //         }

      //         console.log(finalCD)

      const data = value.categories;
      for (let i = 0; i < data.length; i++) {
        tempLabels.push(data[i].label);
        tempData.push(data[i].score);
      }

      const cd = {
        labels: tempLabels,
        dataset: [
          {
            data: tempData,
            label: "# of Votes",
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
            ],
            borderWidth: 1,
          },
        ],
      }
      console.log(cd)
      setChart1Data(cd);
    }

        ));
}
  }, [rawText]);

useEffect(() => {
  whatsapp.parseString(text).then((messages) => {
    messages = messages.filter(function (obj) {
      return obj.author !== "System" && obj.message != "<Media omitted>";
    });

    setMessages(messages);

    // console.log(messages);


    (async () => {
      await findMessageCount(messages);
      await findWordCount(messages);
    })();

    // console.log(wordCount, messageCount);
    //   findMostFrequent(rawText);
    findHateSpeech();
    findActiveHours(messages);
    findTrends();
    findSentiment();
    setIsLoading(false);
  });
}, []);

return (
  <div>
    {isLoading ? (
      <div className="container g-padding-y-80--xs  g-fullheight--xs loading">
        <div className="loader2"></div>
        <h3>We're loading your stats</h3>
      </div>
    ) : (
      <div className="container g-padding-y-120--xs fullpage">
        <h1 className="g-font-weight--500 g-font-size-50--xs">
          <b>Chat Analysis</b>
        </h1>

        <div className="wordcloud-parent">
          <div className="cloud-cont">
            <center>
              {" "}
              <TagCloud maxSize={45} minSize={15} tags={data} randomSeed={12} colorOptions={{ "hue": "green", "luminosity ": "bright" }} />
            </center>{" "}
          </div>
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
          <Meter score={hs} />
          <h4>
            <b>{"Score: " + hs + "/100 " + getHSLevel(hs)}</b>
          </h4>
        </div>

        <div className="most">
          <div className="most-child">
            <p className="subheading">Most Active Hours</p>
            <div className="icon-content">
              <img src={clock} alt="" className="most-child-icon" />
              <h4>
                <b>{hours}</b>
              </h4>
            </div>
          </div>
          <div className="most-child">
            <p className="subheading">Most Talked Topics</p>
            <div className="icon-content">
              <img src={trends} alt="" className="most-child-icon" />
              <div className="" style={{ padding: "0px" }}>
                {topicsArr
                  ? topicsArr.map((item) => {
                    return (
                      <>
                        <h4 style={{ padding: "0px" }}>
                          <b>{item}</b>
                        </h4>
                      </>
                    );
                  })
                  : ""}
              </div>
            </div>
          </div>
        </div>

        <div className="sentiment">
          <p className="subheading">Sentiment Analysis</p>
          <SentimentMeter
            score={sentimentOverall}
            positive={sentimentPos}
            negative={sentimentNeg}
          />

          <div className="sentiment-score">
            <h3>
              <b>Overall Sentiment Score:</b>
            </h3>
            {sentimentOverall > 0 ? (
              <h1 style={{ color: "#3B951B" }}>
                <b>{sentimentOverall}</b>
              </h1>
            ) : (
              <h1 style={{ color: "#863333" }}>
                <b>{sentimentOverall}</b>
              </h1>
            )}
          </div>

          {chartData == tempcd ? <div></div> : <div className="sentiments">
            <div className="chart-parent">
              <h3>
                <b>Emotional Analysis</b>
              </h3>
              <DonutChart height={350} width={350} innerRadius={0.5} outerRadius={0.9} legend={false} colors={["#5B6145", "#889261", "#4CC05F"]}
                data={chart1Data}
              />;
              {/* <Doughnut data={chart1Data} /> */}
            </div>
            <div className="chart-parent">
              <h3>
                <b>Behavioral Analysis</b>
              </h3>
              <DonutChart height={350} width={350} innerRadius={0.5} outerRadius={0.9} legend={false} colors={["#5B6145", "#889261", "#4CC05F"]}
                data={chartData}
              />;
            </div>
          </div>}
        </div>

        <div className="indie">
          <p className="subheading">Individual Stats</p>

          {topicsArr
            ? uniqueAuthors.map((item) => {
              const msg = messages.filter(function (obj) {
                return obj.author == item;
              });
              return (
                <>
                  <Collapse name={item} messageCount={msg.length} activeHours={60} />
                  <br />

                </>
              );
            })
            : ""}



        </div>

        <div
          className="download-report"
          onClick={() => {
            window.print();
          }}
        >
          <img src={downloadicon} alt="" style={{ height: "2rem" }} />
        </div>
      </div>
    )}
  </div>
);
};

export default Result;
