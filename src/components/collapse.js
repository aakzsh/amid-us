import React from "react";
import chevron from "../images/chevron.png";

import wpmicon from "../images/wpm.png";
import Collapsible from "react-collapsible";

const Collapse = (props) => {
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
            >
              <div className="collapse-parent">
                <div>
                  <div className="collapse-item">
                    <h5>Most Active Hours</h5>
                    <h6>
                      <b>{props.activeHours}</b>
                    </h6>
                  </div>
                  <div className="collapse-item">
                    <h5>Most Talked Topics</h5>
                    <h6>
                      <b>00:00 - 01:00</b>
                    </h6>
                  </div>
                </div>

                <div>
                  <div className="collapse-item">
                    <h5>Hate Speech Score</h5>
                    <h6>
                      <b>00:00 - 01:00</b>
                    </h6>
                  </div>
                  <div className="collapse-item">
                    <h5>Sentiment Score</h5>
                    <h6>
                      <b>00:00 - 01:00</b>
                    </h6>
                  </div>
                </div>

                <div>
                  <div className="collapse-item">
                    <h5>Dominating Emotional Trait</h5>
                    <h6>
                      <b>00:00 - 01:00</b>
                    </h6>
                  </div>
                  <div className="collapse-item">
                    <h5>Dominating Behavioral Trait</h5>
                    <h6>
                      <b>00:00 - 01:00</b>
                    </h6>
                  </div>
                </div>
              </div>
            </Collapsible>
    </div>
}

export default Collapse;