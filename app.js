const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (request, response) {
    const city = request.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",&appid=3f2531d06df5578eaf1a7efc3bdc2ad9&units=metric";

    https.get(url, function (res) {

        res.on("data", function (data) {
            const jsondata = JSON.parse(data);
            const temp = jsondata.main.temp;
            const description = jsondata.weather[0].description;
            response.send("Temperature: " + temp + " Degree Celcius "+"<br>"+ description+ ".");
            
          
        });

 
    });
   
});


app.listen(3000, function () {
    console.log("Server Port at 3000");
});