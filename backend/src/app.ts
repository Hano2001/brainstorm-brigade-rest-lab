import express = require("express");
const app = express();
const port = 3000;

app.get("/status", (req, res) => {
  res.statusCode = 200;
  res.send();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
