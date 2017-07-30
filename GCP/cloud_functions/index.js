'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').ApiAiApp;

const exec = require('child_process').exec;
const yolanda_adress = "https://xxxxxxxx.ap.ngrok.io/yolanda_date"
const amanda_adress = "https://xxxxxxxx.ap.ngrok.io/amanda_date"
const yolanda_adress_2 = "https://xxxxxxxx.ap.ngrok.io/yolanda_period"
const amanda_adress_2 = "https://xxxxxxxx.ap.ngrok.io/amanda_prriod"

const YOLANDA_NAME = 'yolanda_name'
const AMANDA_NAME = 'amanda_name'
const DATE = 'date';
const DATE_PERIOD = 'date-period';

exports.homeWork = (request, response) => {
  const app = new App({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));

  function responseYolandaDate (app) {
    let yolanda_name = app.getArgument(yolanda_NAME);
    let work_date = app.getArgument(DATE);
    // Complete your fulfillment logic and send a response
    exec(`curl ${yolanda_adress}?date=` + work_date, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      if(`${stdout}` == 'none'){
          app.ask(`<speak>`+ yolanda_name +` did not her homework. <say-as interpret-as="date" format="yyyymmdd" detail="1">` + work_date + `</say-as>.</speak>`);
      }else{
        let array =[]
        let good_job = ['Good job', 'Nice work', 'Well done'];
        let good_try = ['Good try', 'Nice try'];
        let start_time =　`${stdout}`.substring(0, 8);
        let stop_time = `${stdout}`.substring(9, 17);
        let status = `${stdout}`.substring(18, 23);
        if(status == 'TRUE'){
          status = good_job[Math.floor(Math.random() * good_job.length)]
        }else{
          status = good_try[Math.floor(Math.random() * good_try.length)]
        }
        array.push(start_time,stop_time,status)
        app.ask(`<speak>`+ yolanda_name +` did her homework. <say-as interpret-as="date" format="YYYYmmdd" detail="1">` + work_date + `</say-as> from <say-as interpret-as="time" format="hms24">` + array[0] + `</say-as> to <say-as interpret-as="time" format="hms24">` + array[1] + `</say-as>. <break time="1s" />` + array[2] + `.</speak>`);
      }
    });
  }

  function responseAmandaDate (app) {
    let amanda_name = app.getArgument(amanda_NAME);
    let work_date = app.getArgument(DATE);
    exec(`curl ${amanda_adress}?date=` + work_date, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      if(`${stdout}` == 'none'){
          app.ask(`<speak>`+ amanda_name +` did not her homework. <say-as interpret-as="date" format="yyyymmdd" detail="1">` + work_date + `</say-as>.</speak>`);
      }else{
        let array =[]
        let good_job = ['Good job', 'Nice work', 'Well done'];
        let good_try = ['Good try', 'Nice try'];
        let start_time =　`${stdout}`.substring(0, 8);
        let stop_time = `${stdout}`.substring(9, 17);
        let status = `${stdout}`.substring(18, 23);
        if(status == 'TRUE'){
          status = good_job[Math.floor(Math.random() * good_job.length)]
        }else{
          status = good_try[Math.floor(Math.random() * good_try.length)]
        }
        array.push(start_time,stop_time,status)
        app.ask(`<speak>`+ amanda_name +` did her homework. <say-as interpret-as="date" format="YYYYmmdd" detail="1">` + work_date + `</say-as> from <say-as interpret-as="time" format="hms24">` + array[0] + `</say-as> to <say-as interpret-as="time" format="hms24">` + array[1] + `</say-as>. <break time="1s" />` + array[2] + `.</speak>`);
      }
    });
  }

  function responseYolandaPeriod (app) {
    let yolanda_name = app.getArgument(yolanda_NAME);
    let work_period = app.getArgument(DATE_PERIOD);
    // Complete your fulfillment logic and send a response
    exec(`curl ${yolanda_adress_2}?date-period=` + work_period, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }else{
        let array =[]
        let great_job = ['Great job', 'Way to go', 'Excellent'];
        let good_try = ['Good try', 'Nice try'];
        let true_cnt =　Number(`${stdout}`.substring(0, 2));
        let false_cnt = Number(`${stdout}`.substring(3, 5));
        let start_day =　work_period.substring(0, 10);
        let end_day = work_period.substring(11, 21);
        let status = ''
        if(false_cnt == 0){
          status = great_job[Math.floor(Math.random() * great_job.length)]
        }else{
          status = good_try[Math.floor(Math.random() * good_try.length)]
        }
        array.push(true_cnt,false_cnt,status)
        app.ask(`<speak>`+ yolanda_name +` was archived her homework <say-as interpret-as="cardinal">` + array[0] + `</say-as>times and was not archive <say-as interpret-as="cardinal">` + array[1] + `</say-as>times. from <say-as interpret-as="date" format="YYYYmmdd" detail="1">`+ start_day +`</say-as> to <say-as interpret-as="date" format="YYYYmmdd" detail="1">`+ end_day +`</say-as>. <break time="1s" />` + array[2] + `.</speak>`);
      }
    });
  }

  function responseAmandaPeriod (app) {
    let amanda_name = app.getArgument(amanda_NAME);
    let work_period = app.getArgument(DATE_PERIOD);
    // Complete your fulfillment logic and send a response
    exec(`curl ${amanda_adress_2}?date-period=` + work_period, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }else{
        let array =[]
        let great_job = ['Great job', 'Way to go', 'Excellent'];
        let good_try = ['Good try', 'Nice try'];
        let true_cnt =　Number(`${stdout}`.substring(0, 2));
        let false_cnt = Number(`${stdout}`.substring(3, 5));
        let start_day =　work_period.substring(0, 10);
        let end_day = work_period.substring(11, 21);
        let status = ''
        if(false_cnt == 0){
          status = great_job[Math.floor(Math.random() * great_job.length)]
        }else{
          status = good_try[Math.floor(Math.random() * good_try.length)]
        }
        array.push(true_cnt,false_cnt,status)
        app.ask(`<speak>`+ amanda_name +` was archived her homework <say-as interpret-as="cardinal">` + array[0] + `</say-as>times and was not archive <say-as interpret-as="cardinal">` + array[1] + `</say-as>times. from <say-as interpret-as="date" format="YYYYmmdd" detail="1">`+ start_day +`</say-as> to <say-as interpret-as="date" format="YYYYmmdd" detail="1">`+ end_day +`</say-as>. <break time="1s" />` + array[2] + `.</speak>`);
      }
    });
  }

  const actionMap = new Map();
  actionMap.set('input.yolanda_date', responseYolandaDate);
  actionMap.set('input.amanda_date', responseAmandaDate);
  actionMap.set('input.yolanda_period', responseYolandaPeriod);
  actionMap.set('input.amanda_period', responseamAndaPeriod);
  app.handleRequest(actionMap);
};
