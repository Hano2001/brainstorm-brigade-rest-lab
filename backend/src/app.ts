import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
type Message = {
  id: string;
  message: string;
};
let messages: Message[] = [];

app.use(bodyParser.json());

app.get("/status", (req, res) => {
  res.statusCode = 200;
  res.send();
});

app.get("/greetings", (req, res) => {
  res.header({ "Access-Control-Allow-Origin": "*" });
  res.statusCode = 200;
  res.json(messages);
});

app.post("/greetings", (req, res) => {
  res.header({ "Access-Control-Allow-Origin": "*" });
  messages.push({ id: messages.length.toString(), message: req.body.message });
  res.statusCode = 201;
  res.json(messages);
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
