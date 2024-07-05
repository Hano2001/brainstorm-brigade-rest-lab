import express from "express";
import cors from "cors";
import z from "zod";

const app = express();
const port = 3000;

const Message = z.object({
  id: z.string(),
  message: z.string(),
});

const User = z.object({
  id: z.string().uuid(),
  username: z
    .string()
    .regex(/^[a-z0-9]+$/i, "Should be alphanumeric")
    .min(3)
    .max(30),
  email: z.string().email(),
  password: z
    .string()
    .regex(/.*[a-z].*/i, "One lowercase character")
    .regex(/.*\d.*/, "One number")
    .min(8)
    .max(20),
});

type Message = z.infer<typeof Message>;
type User = z.infer<typeof User>;

let messages: Message[] = [];
let users: User[] = [];

app.use(express.json());

app.use(cors());

app.get("/status", (req, res) => {
  res.statusCode = 200;
  res.send();
});

app.get("/users", (req, res) => {
  res.statusCode = 200;
  res.json(users);
});

app.post("/users", (req, res) => {
  User.parse(req.body);
  const { id } = req.body;
  console.log(req.body);
  res.json({ id: id });
});

app.get("/greetings", (req, res) => {
  res.statusCode = 200;
  res.json(messages);
});

app.post("/greetings", (req, res) => {
  console.table(req.body);
  const { message } = req.body;
  const messageObject = { id: messages.length.toString(), message: message };
  Message.parse(messageObject);
  messages.push(messageObject);
  res.statusCode = 201;
  res.json(messageObject);
});

app.delete("/greetings/:id", (req, res) => {
  const { id } = req.params;
  const indexToDelete = messages.findIndex((message) => message.id == id);
  if (indexToDelete == -1) {
    res.sendStatus(404);
  }
  messages.splice(indexToDelete, 1);
  res.json(id);
});

app.patch("/greetings/:id", (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  console.log(message);
  const idToPatch = messages.findIndex((item) => item.id == id);
  messages[idToPatch].message = message;
  Message.parse(messages[idToPatch]);
  res.json(id);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
