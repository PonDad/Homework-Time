#!/usr/bin/env node
var WebSocketClient = require('websocket').client;
var client = new WebSocketClient();
var exec = require('child_process').exec;
var moment = require('moment-timezone');

var adress = "https://us.wio.seeed.io/v1/node/xxxxxxxxxxxxxxxx"
var access_token = "?access_token=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

var count, startMoment, startMomentTime,startMomentMin, stopMoment, stopMomentTime, stopMonmentMin = [];
var flag = true;

function timer_start() {
  console.log("flag = " + flag)
  var startDate = new Date().getTime();
  var endDate = new Date(startDate+ 601000).getTime();
  startMoment = moment().tz("Asia/Tokyo").format("YYYY-MM-DD");
  startMomentTime = moment().tz("Asia/Tokyo").format("HH:mm:ss");
  startMomentMin = moment().tz("Asia/Tokyo").format("mm");
  console.log(startMoment + "\n" + startMomentTime + "\nSTART")
  flag =　false;

  clearInterval(count)
  count = setInterval(function() {
    var nowDate = new Date().getTime();
    var distance = endDate - nowDate;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    var countTime = ('0' + minutes).slice(-2) + "" + ('0' + seconds).slice(-2)

    console.log (countTime);

    exec(`curl -k -X POST  ${adress}/display_point/1${access_token} |curl -k -X POST  ${adress}/display_digits/0/`+ countTime +`${access_token}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      });

      if (distance < 0) {
      console.log("flag = " + flag)
      stopMoment = moment().tz("Asia/Tokyo").format("YYYY-MM-DD");
      stopMomentTime = moment().tz("Asia/Tokyo").format("HH:mm:ss");
      console.log(stopMoment + "\n" + stopMomentTime + "\nTIMEOVER...")

      clearInterval(count)
      countTime = "0000"
      console.log(countTime);

      exec(`curl -k -X POST  ${adress}/display_point/1${access_token} |curl -k -X POST  ${adress}/display_digits/0/`+ countTime +`${access_token} | curl -X POST -H "Content-Type: application/json" -d '{"value1":"${stopMoment}","value2":"${startMomentTime}","value3":"${stopMomentTime}"}' https://maker.ifttt.com/trigger/amanda_kumon_false/with/key/xxxxxxxxxxxxxxxxxxxxx`, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        });
      flag =　true;
    };
  }, 1000);
};

function timer_stop(){
  console.log("flag = " + flag)
  stopMoment = moment().tz("Asia/Tokyo").format("YYYY-MM-DD");
  stopMomentTime = moment().tz("Asia/Tokyo").format("HH:mm:ss");
  stopMomentMin = moment().tz("Asia/Tokyo").format("mm");
  console.log(stopMoment + "\n" + stopMomentTime + "\nDONE")

  clearInterval(count)
  countTime = "0000"
  console.log(countTime);

  clickTime = stopMomentMin - startMomentMin
  console.log("time" + clickTime + "minute")

  if(clickTime < 2){
    exec(`curl -k -X POST  ${adress}/display_point/1${access_token} |curl -k -X POST  ${adress}/display_digits/0/`+ countTime +`${access_token}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      });
  }else{
  exec(`curl -k -X POST  ${adress}/display_point/1${access_token} |curl -k -X POST  ${adress}/display_digits/0/`+ countTime +`${access_token} | curl -X POST -H "Content-Type: application/json" -d '{"value1":"${stopMoment}","value2":"${startMomentTime}","value3":"${stopMomentTime}"}' https://maker.ifttt.com/trigger/amanda_kumon_true/with/key/xxxxxxxxxxxxxxxxxxxxx`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    });
  };
  flag =　true;
}

function process_exit(){
  process.exit(0);
};

function welcome_text(){
  welcome_text = "AAAA"
  exec(`curl -k -X POST  ${adress}/display_digits/0/`+ welcome_text +`${access_token}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    });

}

client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');
    welcome_text();
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
        process_exit();
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
            if(flag == false){
              timer_stop();
            }else{
              timer_start();
            };
        };
    });

    function sendNumber() {
        if (connection.connected) {
            var number = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
            connection.sendUTF(number.toString());
        }
    }
    sendNumber();
});

client.connect('wss://us.wio.seeed.io/v1/node/event');
