import React from "react";

const Home = () => {

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
                    <p class="g-font-size-16--xs g-color--dark g-margin-b-60--xs">Upload your chats and we'll show relevant insights for it!</p>
                    <a href="/jobs"
                        class="text-uppercase s-btn s-btn--sm s-btn--primary-bg g-padding-x-30--xs">Upload</a>
                </div>
                <div className="col-md-5">
                    <div><img src="./img/inbox.png" alt="inbox" width="400" /></div>
                </div>
            </div>
        </div>

    </div>)
}

export default Home;
