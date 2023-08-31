// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Date endpoint
app.get('/api/:date', (req, res) => {
  const date = req.params.date;
  const iso8601Pattern = /^\d{4}-\d{2}-\d{2}[T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z]?$/;
  const unixPattern = /^(?:\d{10}|\d{13})$/;

  let inDate;

  if (iso8601Pattern.test(date)) {
    inDate = new Date(date);
  } else if (unixPattern.test(date)) {
    inDate = new Date(Number(date));
  } else {
    res.status(400).json({ meaasge: 'Bad Request' })
  }

  const unix = inDate.getTime();
  const utc = convertTimeToRFC822(inDate);

  res.json({ unix, utc });
});

// Convert Time to RFC 822
const convertTimeToRFC822 = (date) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const dayOfWeek = daysOfWeek[date.getUTCDay()];
  const dayOfMonth = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  const hrs = String(date.getUTCHours()).padStart(2, '0');
  const mins = String(date.getUTCMinutes()).padStart(2, '0');
  const secs = String(date.getUTCSeconds()).padStart(2, '0');

  return `${dayOfWeek} ${dayOfMonth} ${month} ${year} ${hrs}:${mins}:${secs} GMT`
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
