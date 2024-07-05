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
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(5),
  DOB: z.string().date(),
  roles: z.array(z.string().regex(/admin|user|guest/)).min(1),
});

type Message = z.infer<typeof Message>;
type User = z.infer<typeof User>;

let messages: Message[] = [];
let users: User[] = [
  {
    id: "1",
    username: "Carlos",
    email: "this@is",
    password: "carlos",
    DOB: "1993-08-09",
    roles: ["user"],
  },
];

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

app.get("/users", (req, res) => {
  res.statusCode = 200;
  res.json(users);
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
