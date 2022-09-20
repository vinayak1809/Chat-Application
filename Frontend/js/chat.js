const url = "http://localhost:5000";
const token = localStorage.getItem("token");

////////////////////////////////////////////////////
//display message
////////////////////////////////////////////////////

function displayMessage(messages) {
  const message_table = document.getElementById("messages-table");
  message_table.innerHTML = "";
  messages.forEach((message) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${message.message}</td>`;

    message_table.appendChild(tr);
  });
}

////////////////////////////////////////////////////
//save message to datbase
////////////////////////////////////////////////////

async function saveMessage(event) {
  event.preventDefault();
  const form = new FormData(event.target);

  const message = {
    message: form.get("message"),
  };
  await axios
    .post(`${url}/chat`, message, {
      headers: { authorization: token },
    })
    .then((message) => {
      const messages = [message.data.result];
      //displayMessage(messages);
    });
}

////////////////////////////////////////////////////
//DOM
////////////////////////////////////////////////////

window.addEventListener("DOMContentLoaded", async () => {
  await new Promise((resolve) => {
    setInterval(async () => {
      await axios
        .get(`${url}/chat`, {
          headers: { authorization: token },
        })
        .then((result) => {
          const messages = result.data.chat;
          displayMessage(messages);
        });
    });
  }, 1000);
});
