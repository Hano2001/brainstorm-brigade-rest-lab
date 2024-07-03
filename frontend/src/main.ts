import "./style.css";
const response = await fetch("http://localhost:3000/greetings").catch((err) =>
  console.log(err)
);
const greetings: string[] = await response.json();

const greetingsMessage = document.getElementById("greetings-message");
const greetingForm = document.getElementById("greeting-form");

greetingForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const input: HTMLInputElement = document.getElementById("greeting-input");
  console.log(JSON.stringify({ message: input.value }));
  fetch("http://localhost:3000/greetings", {
    method: "POST",
    body: JSON.stringify({ message: input.value }),
    headers: {
      "Content-Type": "application/json",
    },
  });
});

if (greetingsMessage) {
  if (greetings.length == 0) {
    greetingsMessage.innerHTML = "No messages";
  } else {
    greetingsMessage.innerHTML = greetings[0].message;
  }
}
