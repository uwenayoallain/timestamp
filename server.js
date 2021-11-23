const path = require("path");
const express = require("express");
const app = express();

const PORT = 3000;

const cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "views/index.html"));
});

app.get("/api/:date?", (req, res) => {
  const givenDate = req.params.date;
  let date;
  if (!givenDate) {
    date = new Date();
  } else {
    const checkUnix = givenDate * 1;
    date = isNaN(checkUnix) ? new Date(givenDate) : new Date(checkUnix);
  }

  if (date == "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    const unix = date.getTime();
    const utc = date.toUTCString();
    res.json({ unix, utc });
  }
});

var listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
