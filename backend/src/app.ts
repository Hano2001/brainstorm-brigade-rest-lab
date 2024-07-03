import express from "express";
import cors from "cors";
const app = express();
const port = 3000;
type Message = {
  id: string;
  message: string;
};
let messages: Message[] = [];

app.use(express.json());

app.use(cors());

app.get("/status", (req, res) => {
  res.statusCode = 200;
  res.send();
});

app.get("/greetings", (req, res) => {
  res.statusCode = 200;
  res.json(messages);
});

app.post("/greetings", (req, res) => {
  console.table(req.body);
  const { message } = req.body;
  messages.push({ id: messages.length.toString(), message: message });
  res.statusCode = 201;
  res.json(messages);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
