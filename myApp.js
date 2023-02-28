let express = require('express');
let app = express();

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

console.log("Hello World");

app.use("/public", express.static(__dirname + "/public"));

app.use("/", (req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.get("/", (req, res) => {
  // res.send("Hello Express");
  res.sendFile(__dirname + "/views/index.html")
});

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    res.json({ "message": "Hello json".toUpperCase() })
  } else {
    res.json({ "message": "Hello json" })
  }
});

app.get("/now", (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({ "time": req.time });
});

app.get("/:word/echo", (req, res, next) => {
  res.json({ "echo": req.params.word });
  next();
});

app.get("/name", (req, res) => {
  var { first: firstName, last: lastName } = req.query;
  res.json({
    name: `${firstName} ${lastName}`
  });
});

app.post("/name", (req, res) => {
  var { first: firstName, last: lastName } = req.body;
  res.json({
    name: `${firstName} ${lastName}`
  });
});

module.exports = app;
