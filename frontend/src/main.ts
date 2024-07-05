import "./style.css";

type Message = {
  id: string;
  message: string;
};
const response = await fetch("http://localhost:3000/greetings").catch((err) =>
  console.log(err),
);
const greetings: Message[] = await response.json();

const greetingsMessage = document.getElementById("greetings-message");
const greetingForm = document.getElementById("greeting-form");
const deleteGreetingsForm = document.getElementById("delete-greetings-form");
const patchGreetingsForm = document.getElementById("patch-greetings-form");
const postUserButton = document.getElementById("post-user");

postUserButton?.addEventListener("click", () => {
  fetch("http://localhost:3000/users", {
    method: "POST",
    body: JSON.stringify({
      username: "A11an",
      email: "allan@mackan.se",
      password: "a1234567",
      dateOfBirth: "1993-06-10",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
});

greetingForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = document.getElementById("greeting-input") as HTMLInputElement;
  console.log(JSON.stringify({ message: input.value }));

  await fetch("http://localhost:3000/greetings", {
    method: "POST",
    body: JSON.stringify({ message: input.value }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const res = await fetch("http://localhost:3000/greetings");
  const data: Message[] = await res.json();

  if (greetingsMessage) {
    greetingsMessage.innerHTML = "";
    data.forEach((greeting: { message: string }) => {
      greetingsMessage.innerHTML += greeting.message;
    });
  }
});

deleteGreetingsForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = document.getElementById(
    "delete-greeting-input",
  ) as HTMLInputElement;
  await fetch(`http://localhost:3000/greetings/${input.value}`, {
    method: "DELETE",
  });

  const res = await fetch("http://localhost:3000/greetings");
  const data = await res.json();

  if (greetingsMessage) {
    greetingsMessage.innerHTML = "";
    data.forEach((greeting: { message: string }) => {
      greetingsMessage.innerHTML += greeting.message;
    });
  }
});

patchGreetingsForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const idInput = document.getElementById(
    "patch-greeting-id-input",
  ) as HTMLInputElement;

  const messageInput = document.getElementById(
    "patch-greeting-message-input",
  ) as HTMLInputElement;

  await fetch(`http://localhost:3000/greetings/${idInput.value}`, {
    method: "PATCH",
    body: JSON.stringify({ message: messageInput.value }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const res = await fetch("http://localhost:3000/greetings");
  const data = await res.json();

  if (greetingsMessage) {
    greetingsMessage.innerHTML = "";
    data.forEach((greeting: { message: string }) => {
      greetingsMessage.innerHTML += greeting.message;
    });
  }
});

if (greetingsMessage) {
  if (greetings.length == 0) {
    greetingsMessage.innerHTML = "No messages";
  } else {
    console.table(greetings);
    greetings.forEach((greeting) => {
      greetingsMessage.innerHTML += greeting.message;
    });
  }
}
