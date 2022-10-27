# Amid US

Identify the bullying, quick notes, top discussed topics, and many more stats out of your chats.

## Run Locally using `npm i && npm start`

Runs the app in the development mode locally after cloning.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Inspiration

The world of the internet opens up a lot of pathways and opportunities for everyone. But, one aspect of it is bullying. We wanted to make something that could automate the process of identifying cyberbullying. Moreover, we wanted to make something that lets the users analyze their group chats, and find out the insights very easily, without having to read all of the chat over and over again, but instead, with a single click. Amid Us is powered by Expert AI, an amazing AI-powered NLP tool that can find the sentiments and deep insights of texts. It let us formulate everything and display it all to the user base. Users just have to upload their WhatsApp chats, which they can get by exporting them through their phone, and then get started!

## What it does

The core idea is to remove the nuisances of discovering the word cloud, most frequently used topics for discussion, user activity, the overall sentiment of the group, emotion-specific to one user, total messages count, total words count, most active hours by days, most active days by week, chats discussion aligned to the goal of the group, is there any abusing going on, identify important talks so far and make a summary out of it.
Keeping this in mind with the help of Expert.ai services we want to provide users with a seamless learning experience by giving a fully-fledged solution that aims to reduce the time and hassles we faced while joining new groups or identifying chats and provide a timeless solution to make your understanding efficient.

## How we built it

AMID US is a progressive web app having its client interface developed on ReactJS. All the data analysis within the application is powered by Expert.ai for identifying the bullying, quick notes, top discussed topics, and many more stats out of chats. Here’re the details of the Expert.ai APIs we have utilized in the application:

1. detect/hate-speech/en: to identify any bullying or abusive comments.
2. To get a detailed analysis of the sentiment of the overall group or individual chat.
   - /categorize/behavioral-traits/en
   - categorize/emotional-traits/en
   - analyze/standard/en/sentiment
3. analyze/standard/en/relevant: To classify frequently used topics for discussion.

## Challenges we ran into

Working with new APIs from Expert.ai was new to us. Learning it at pace while trying to use it and Integrating everything along with a dedicated backend and front end was challenging but fun!

## Accomplishments that we're proud of

The fact that we planned the idea, and website and coded the idea in three days. We are also extremely proud of having a proper understanding of everyone's schedule during this crucial time.

## What we learned

Through this project, we learn how to leverage the amazing expert.ai NLP APIs. We also learn the process of developing a serverless application. This project can’t be done without the efforts and collaboration of a team with diverse backgrounds in technical skills.

## What's next for Amid Us

The team is ambitious on looking forward to continuing to develop the project. Our next step is to make AMID US for teams groups and subreddit channels on one single platform.
