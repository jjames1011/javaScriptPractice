//create a command line application that allows for checking the weather
//api: http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={APIKEY}
//api key: 4c2ad1606fe03e0aad188c27c4b82ccb
//to use go to directory and run this file with node followed by a zip code or city name:
// $node scripts.js portland
// $node scripts.js 97217

//require http module
const http = require('http');
const APIKEY = '4c2ad1606fe03e0aad188c27c4b82ccb';

function printError(error){
  console.error(error.message);
};
function printWeather(city, forecast, temperature){
  console.log(`The weather in ${city} is ${forecast} at ${temperature} degrees fahrenheit`);
};
function isNumber(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function getWeather(zipOrCityName) {
  try {
    console.log(zipOrCityName);
    let urlCall = ``;
    //check if user input is a number(zip) or not (city name)
    if(isNumber(zipOrCityName)) {
      urlCall = `http://api.openweathermap.org/data/2.5/weather?zip=${zipOrCityName}&units=imperial&APPID=${APIKEY}`;
    } else {
      //join words together with + in case of cities like san diego(san+diego) for query param.
      zipOrCityName = zipOrCityName.join('+');
      console.log(zipOrCityName);
      urlCall = `http://api.openweathermap.org/data/2.5/weather?q=${zipOrCityName}&units=imperial&APPID=${APIKEY}`
    }

    const request = http.get(urlCall, (response) => {

      if(response.statusCode === 200){
      let body = '';

      response.on('data', data => {
        body += data.toString();
      });

      response.on('end', () =>{
        try{
          const weather = JSON.parse(body);
          printWeather(weather.name, weather.weather[0].description, weather.main.temp);
        }catch(error){
          printError(error);
        }
      });
    } else {
      const message = `There was an error getting the weather for ${zipOrCityName} (${http.STATUS_CODES[response.statusCode]})`;
      const statusCodeError = new Error(message);
      printError(statusCodeError);
    }

    });
    request.on('error', e => printError(e));


  } catch (error){
    printError(error);
  }
}

const userInput = process.argv.slice(2);
getWeather(userInput);
