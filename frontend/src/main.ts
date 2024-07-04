import "./style.css";
type Message = {
  id: string;
  message: string;
};
const response = await fetch("http://localhost:3001/greetings").catch((err) =>
  console.log(err)
);
const greetings: Message[] = await response.json();

const greetingsMessage = document.getElementById("greetings-message");
const greetingForm = document.getElementById("greeting-form");

greetingForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const input: HTMLInputElement = document.getElementById("greeting-input");
  console.log(JSON.stringify({ message: input.value }));

  const res = await fetch("http://localhost:3001/greetings", {
    method: "POST",
    body: JSON.stringify({ message: input.value }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data: Message[] = await res.json();
  greetingsMessage!.innerHTML = "";
  data.forEach((greeting) => {
    greetingsMessage.innerHTML += greeting.message;
  });
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
