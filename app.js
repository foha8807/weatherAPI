const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
  const query = req.body.cityName;
  const apiKey = "cbf16ae33d34340fece188efd2eb8923";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+ apiKey+"&units="+unit;

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const imgIcon = weatherData.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/"+ imgIcon +"@2x.png";
      res.write("<h1>weather in " + query + " is like: " + temp + " C && Sky is: " + description + "</h1>");
      res.write("<img src = " + imgURL + ">");

      res.send();
    })
  })

})








app.listen(3000, function(){
  console.log("server is running 3000;");
});
