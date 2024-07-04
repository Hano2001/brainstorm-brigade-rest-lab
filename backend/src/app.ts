import express from 'express';
import cors from 'cors';
import z from 'zod';

const app = express();
const port = 3000;

const Message = z.object({
  id: z.string(),
  message: z.string(),
});

type Message = z.infer<typeof Message>;

let messages: Message[] = [];

app.use(express.json());

app.use(cors());

app.get('/status', (req, res) => {
  res.statusCode = 200;
  res.send();
});

app.get('/greetings', (req, res) => {
  res.statusCode = 200;
  res.json(messages);
});

app.post('/greetings', (req, res) => {
  console.table(req.body);
  const { message } = req.body;
  const messageObject = { id: messages.length.toString(), message: message };
  Message.parse(messageObject);
  messages.push(messageObject);
  res.statusCode = 201;
  res.json(messageObject);
});

app.delete('/greetings/:id', (req, res) => {
  const { id } = req.params;
  const indexToDelete = messages.findIndex((message) => message.id == id);
  if (indexToDelete == -1) {
    res.sendStatus(404);
  }
  messages.splice(indexToDelete, 1);
  res.json(id);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
