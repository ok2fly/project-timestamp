// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
	res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
	res.json({ greeting: "hello API" });
});

app.get("/api/:date?", function (req, res) {
	debugger;
	let utc;
	const date = req.params.date;
	console.log("req.params.date: ", req.params);
	if (!date) {
		utc = new Date();
	} else if (
		typeof date === "string" &&
		new Date(date).toString() !== "Invalid Date"
	) {
		utc = new Date(date);
	} else if (typeof date === "string" && /^\d\d*\d$/g.test(date)) {
		utc = new Date(parseInt(date));
	} else {
		res.json({ error: "Invalid Date" });
		return;
	}
	// debugger
	res.json({ unix: utc.getTime(), utc: utc.toUTCString() });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
	console.log("Your app is listening on port " + listener.address().port);
});
