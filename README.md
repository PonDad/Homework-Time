# Homework Time - Google Assistant app

![logo](https://github.com/PonDad/Homework-Time/blob/master/img/ActionsonGoogle.png)

My children (twins, 6 years old) are also early items and are elementary school students from next year. Before school They started going to the "Kumon" expression from early spring. I tried an assist mechanism to watch the homework done by the children on a daily basis with their families.

## Kumon: After School Math & Reading Programs

![Kumon Method Logo.svg](https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Kumon_Method_Logo.svg/1200px-Kumon_Method_Logo.svg.png)
By [Kumon](http://www.kumon.com/), Public domain

> Features of Kumon - Kumon is not a method of teaching how to solve it, but by a learning method that solves problems of teaching materials with your own power, it fosters a self-affirmation that "can do if you do it", and even from unknown areas Develop the ability to challenge. Kumon expression is an education aiming at "pursuit of possibility" of each and every one. - From the official website

![home-work-time-3.png](https://qiita-image-store.s3.amazonaws.com/0/47128/41d6016c-d714-6cc4-850c-2e2ed1d11041.png)

Utilizing original texts of Kumon, children learn the ability to learn by themselves.

## Share with family

The time spent on homework is written by parent in case of preschool child. I tried this mechanism using electronic machine tools.

![DSC_0132.jpg](https://qiita-image-store.s3.amazonaws.com/0/47128/ea0f38d5-45d4-91c5-1f00-651ea8a0d036.jpeg)

I use a timer using Seeed's WioNode and Grove system. When Children press the button, the countdown of 10 minutes begins. They can measure the time it took by pushing the button at the end timing.（When more than 10 minutes have elapsed, the timer will automatically end）

The point sticking is that it is driven by 3 AA batteries because children use it everyday.When they turn on the power, it connects to the server set up by RaspberryPi with websocket.

The measured time can be sent to various services via IFTTT. By sending it to LINE, it is easy to share information with parents. Here we are sending to the line group we created for notification.

![home-work-time-1.png](https://qiita-image-store.s3.amazonaws.com/0/47128/a7fefdb5-b8f8-a81b-119b-227773c99afe.png)

We can also check the time when the child finished our children's homework from the outside.

![home-work-time-8.png](https://qiita-image-store.s3.amazonaws.com/0/47128/ca3492ce-343c-fbdb-cab4-fb4439823a33.png)


Write study time in Google spreadsheet. Mark it for more than 10 minutes.

## GoogleAssistant

[Homework Time - Google Assistant app - Youtube](https://www.youtube.com/watch?v=tJtANzVOpB8)

I can check the learning situation from Google Assistant using Google spreadsheet API.

![Video Caption Maker 2017-07-29 19-04-11.png](https://qiita-image-store.s3.amazonaws.com/0/47128/f01e4750-3b17-ad21-c085-f2fb84b02617.png)

Call the spreadsheet data using api.ai's intents. Here we search by "name + date".Request Actions on Google for json data of "Name(Yolanda)) + Date (Today - July 29th, 2017)"

Since the date uses the entity of api.ai, it will draw out the intention of spoken words such as "yesterday" "day before yesterday" "three days ago".

![Video Caption Maker 2017-07-29 19-04-37.png](https://qiita-image-store.s3.amazonaws.com/0/47128/51617da5-d7f7-c595-bbbf-d98f9ee9518e.png)

In addition to just checking the date, you can specify the period and see if children can do homework within 10 minutes.

![Video Caption Maker 2017-07-29 19-29-12.png](https://qiita-image-store.s3.amazonaws.com/0/47128/638fcaf3-6ee9-2189-c7a9-ba10105b0d1e.png)

Search by "name + period". I will request Actions on Google for json data of "  Name(Amanda) + period (Last week - July 17, 2017 to July 23, 2017) ".

I also use the api.ai entity for the period. We will pick up the period specified in spoken language as intended, such as "last week", "this month", "last month".

![Video Caption Maker 2017-07-29 19-29-32.png](https://qiita-image-store.s3.amazonaws.com/0/47128/653af972-075e-4d8e-dbe7-6c15f8eb971a.png)

It tells the number of times the children were able to do their homework and the number of times they could not do it within hours.

![home-work-time-2.png](https://qiita-image-store.s3.amazonaws.com/0/47128/9422b34e-3d73-5d54-3244-5f7be3c51686.png)

In Kumon, it is not only that the answer is correct but also it will be the point to go to the next step, even if it is done within time.

## Structure

### Wio Node & IFTTT

![wio-node (1).png](https://qiita-image-store.s3.amazonaws.com/0/47128/bcb65a49-82da-6147-ba9f-484e97236e3e.png)

#### 1. Wio Node
[WioNode](http://wiki.seeed.cc/Wio_Node/) [Grove - Button](http://wiki.seeed.cc/Grove-Button/) [Grove - 4-Digit Display](http://wiki.seeed.cc/Grove-4-Digit_Display/)Set it up and enable the API.

#### 2. websocket
In order to be able to receive Seeed's API, set up a server in RaspberryPi with node.js. I use websocket to receive button press data and send count down time. Together store the start time and end time in the array.

[Homework-Time/RaspberryPi/wio-node/app.js](https://github.com/PonDad/Homework-Time/blob/master/RaspberryPi/wio-node/app.js)

[Homework-Time/RaspberryPi/wio-node/app2.js](https://github.com/PonDad/Homework-Time/blob/master/RaspberryPi/wio-node/app2.js)

#### 3.PM2
Process management has been daemonized using [PM2](http://pm2.keymetrics.io/). When WioNode is turned on, websocket is connected. .

#### 4.IFTTT
Make an account on [IFTTT](https://ifttt.com/discover) and make it available as a trigger for [webhook](https://ifttt.com/maker_webhooks).

#### 5.webhook
I send the start and end dates of homework from RaspberryPi's server to the endpoint of webhook. With webhook as the trigger, we send the start and end time of received homework to LINE and Google spreadsheet.



### Raspberry Pi & Google Assistant SDK

![google-assistant.png](https://qiita-image-store.s3.amazonaws.com/0/47128/63ef4e98-99aa-452e-ee0c-5f1bc449ad66.png)

#### 1.Google Assistant SDK
[Google Assistant SDK](https://developers.google.com/assistant/sdk/)Install to RaspberryPi

#### 2.Actions on Google
At [Actions on Google](https://developers.google.com/actions/), add a project and create a Google Assistant app. I used [api.ai](https://api.ai/) as a trigger of action this time.

[Homework-Time/APIai/](https://github.com/PonDad/Homework-Time/tree/master/APIai)

#### 3.Cloud Functions
Actions on Google can be run by installing the executable file at [Cloud Functions](https://cloud.google.com/functions/?hl=en) on Google Cloud Platform.

[Homework-Time/GCP/cloud_functions/](https://github.com/PonDad/Homework-Time/tree/master/GCP/cloud_functions)

#### 4.Sheets API v4
In order to use the data of Google spreadsheet, please use [Sheets API v4](https://developers.google.com/sheets/api/?hl=en). This time we will perform Oauth 2 authentication using the Pyhon library [Python Quickstart](https://developers.google.com/sheets/api/quickstart/python)

[Homework-Time/RaspberryPi/spread-sheet/](https://github.com/PonDad/Homework-Time/tree/master/RaspberryPi/spread-sheet)

#### 5.ngrok
In order to connect to RaspberryPi from Cloud Functions, connect using [ngrok](https://ngrok.com/). I started it from node.js for easy management.

[Homework-Time/RaspberryPi/ngrok/](https://github.com/PonDad/Homework-Time/tree/master/RaspberryPi/ngrok)


## Summary

Children like the timer and are using it each time they do their homework.I hope that GoogleAssistant will be a good support.Ciao.

## Additional notes: August 28, 2017

The Google Assistant iOS application can now be used in Japan.

[Homework Time - Google Assistant app on iOS -　YouTube](https://youtu.be/HC3oA2nDHF4)

![2017-08-28 19_52_52.gif](https://qiita-image-store.s3.amazonaws.com/0/47128/157c394f-3893-29eb-e149-3d938cdb2fff.gif)

It supports not only character input but also audio input.

![homeworktime_ios2](https://github.com/PonDad/Homework-Time/blob/master/img/homeworktime_ios2.png)

I can hardly wait for Japanese support for Actions on Google. Ciao.

The MIT License
Copyright (c) 2017 Studio Identical Twins
