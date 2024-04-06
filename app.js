const express = require("express");
const app = express();
const requests = require('requests');

app.get('/', (req, res)=>{
    res.send("hello express2");
})

app.get('/about', (req, res)=>{
    requests(
        `http://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&units=metric&appid=b14425a6554d189a2d7dc18a8e7d7263`
    )
    .on("data", (chunk)=>{
        const objData = JSON.parse(chunk);
        const arrayData = [objData];
        console.log(`city name is: ${arrayData[0].name} and the temp is: ${arrayData[0].main.temp}`);

        // const realTimeData = arrayData
        // .map((val)=>replaceVal(homeFile,val))
        // .join("");
        // res.write(realTimeData);
        console.log(realTimeData);
    })
    .on("end", (err)=>{
        if(err) return console.log("connection closed due to error", err);
        res.end();
    });
    // res.status(200).send("about us page");
});
 
app.listen(8000, ()=>{
    console.log('listening the port at 8000');
});
