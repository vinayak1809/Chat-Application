const url = "http://localhost:5000";
const token = localStorage.getItem("token");

////////////////////////////////////////////////////
//save message to datbase
////////////////////////////////////////////////////
async function saveToLocalstorage(messages) {
  const obj = {
    id: messages[0].id,
    msg: messages[0].message,
    username: messages[0].username,
  };

  const old_arr = JSON.parse(localStorage.getItem("msgRecord"));

  if (old_arr == null) {
    const newly_created_arr = [obj];
    localStorage.setItem("msgRecord", JSON.stringify(newly_created_arr));
  } else {
    if (old_arr.length >= 10) {
      console.log("DOM will do it");
    } else {
      const new_arr = JSON.stringify(old_arr.push(obj));
      localStorage.setItem("msgRecord", new_arr);
    }
  }
}

async function saveMessage(event) {
  event.preventDefault();
  const form = new FormData(event.target);

  const message = {
    message: form.get("message"),
  };

  const postMessage = await axios.post(`${url}/chat`, message, {
    headers: { authorization: token },
  });

  const messages = [postMessage.data.result];
  await saveToLocalstorage(messages);
}

////////////////////////////////////////////////////
//display and update message
////////////////////////////////////////////////////

async function displayMessage(messages) {
  const message_table = document.getElementById("messages-table");

  message_table.innerHTML = "";

  await messages.forEach((message) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${message.msg}</td>`;

    message_table.appendChild(tr);
  });
}

async function update_msg(new_msg, msg_list) {
  await new_msg.forEach((record) => {
    msg_list.shift();
    msg_list.push({
      id: record.id,
      msg: record.message,
      username: record.username,
    });

    localStorage.setItem("msgRecord", JSON.stringify(msg_list));
  });
}

////////////////////////////////////////////////////
//DOM
////////////////////////////////////////////////////

window.addEventListener("DOMContentLoaded", async () => {
  const record = localStorage.getItem("msgRecord");
  const msg_list = JSON.parse(record);
  const last_record = msg_list[msg_list.length - 1].id;

  await new Promise((resolve) => {
    setTimeout(async () => {
      if (record) {
        const display = await displayMessage(msg_list);

        const message = await axios.get(
          `${url}/chat/?lastMsg=${last_record} `,
          {
            headers: { authorization: token },
          }
        );

        const update = await update_msg(message.data.chat, msg_list);
      } else {
        console.log("no msg");
      }
    });
  }, 1000);
});
