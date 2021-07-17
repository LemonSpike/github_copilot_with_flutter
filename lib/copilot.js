// WORKS!
function calculateDaysBetweenDates(begin, end) {
    var beginDate = new Date(begin);
    var endDate = new Date(end);
    var days = Math.round((endDate - beginDate) / (24 * 60 * 60 * 1000));
    return days;
}

// find all images without alternate text
// and give them a red border
function process() {
    var images = document.getElementsByTagName("img");
    for (var i = 0; i < images.length; i++) {
        if (images[i].alt == "") {
            images[i].style.border = "1px solid red";
        }
    }
}

// Express server on port 3000
// Serve the UI from the dist folder
// Serve the API from the api folder
// Express is configured to serve assets
// from the dist folder
var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var port = 3000;

// Set up the server
server.listen(port, function () {
    console.log("Server listening on port " + port);
});

// Set up the socket.io server
io.configure(function () {
    io.set("transports", ["websocket"]);
});

// Set up the express app
app.use(express.static(__dirname + "/dist"));

// Set up the socket.io app
io.sockets.on("connection", function (socket) {
    socket.on("image", function (data) {
        console.log(data);
        var img = document.createElement("img");
        img.src = data;
        img.style.border = "1px solid red";
        document.body.appendChild(img);
        setTimeout(function () {
            document.body.removeChild(img);
        }, 3000);
    });
});

// Run the process function
setInterval(function () {
    process();
}, 1000);

// Express server on port 3000
// Return the current time
app.get("/", function (req, res) {
    res.send(new Date());
});

// Express server on port 3000
// Return the current time
app.get("/api/time", function (req, res) {
    res.send(new Date());
});

// Express server on port 3000
// Return the current time
app.get("/api/days", function (req, res) {
    var begin = req.query.begin;
    var end = req.query.end;
    if (begin && end) {
        var days = calculateDaysBetweenDates(begin, end);
        res.send(days);
    }
    else {
        res.send(0);
    }
});