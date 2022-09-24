const url = "http://localhost:5000";
const token = localStorage.getItem("token");
const headers = { headers: { authorization: token } };

const people = document.getElementById("people");
const add_people = document.getElementById("add-people");

window.addEventListener("DOMContentLoaded", async () => {
  call_it();
});
async function call_it() {
  const user = await axios.get(`${url}/user `, headers);

  user.data.users.forEach((user) => {
    const p = document.createElement("p");
    p.innerHTML = user.name;
    p.id = user.id;
    people.appendChild(p);

    const li = document.createElement("li");
    li.innerHTML = `  <input type="checkbox" id="${user.id}" name="public">
                      <label for="">${user.name}</label>`;
    add_people.appendChild(li);
  });
}

//////////////////////////////////////////////////////
////show message after clicking on specific user
//////////////////////////////////////////////////////

people.addEventListener("click", async (e) => {
  document.getElementById("User-message").classList.add("active");

  document.getElementById("rece-id").value = e.target.id;

  const showMessage = document.getElementById("show-message");

  axios.post("/get-chat", { rec_id: e.target.id }, headers).then((result) => {
    showMessage.innerHTML = "";

    result.data.chat.forEach((chat) => {
      const li = document.createElement("li");
      li.innerHTML = chat.message;

      showMessage.appendChild(li);
    });
  });
});

const closeViewMsg = document.getElementById("close-view-msg");

closeViewMsg.addEventListener("click", (e) => {
  document.getElementById("User-message").classList.remove("active");
});

//////////////////////////////////////////////////////
////save message to database
//////////////////////////////////////////////////////

async function saveUserMsg(event) {
  event.preventDefault();
  const form = new FormData(event.target);

  const message = {
    message: form.get("message"),
    receiverId: form.get("rece-id"),
  };
  console.log(message, " form.get()");
  const postMessage = await axios.post(`${url}/chat`, message, headers);
}

//////////////////////////////////////////////////////
////save message to database
//////////////////////////////////////////////////////
//
//async function saveToLocalstorage(messages) {
//  const obj = {
//    id: messages[0].id,
//    msg: messages[0].message,
//    username: messages[0].username,
//  };
//
//  const old_arr = JSON.parse(localStorage.getItem("msgRecord"));
//
//  if (old_arr == null) {
//    const newly_created_arr = [obj];
//    localStorage.setItem("msgRecord", JSON.stringify(newly_created_arr));
//  } else {
//    if (old_arr.length >= 10) {
//      console.log("DOM will do it");
//    } else {
//      const new_arr = JSON.stringify(old_arr.push(obj));
//      localStorage.setItem("msgRecord", new_arr);
//    }
//  }
//}
//
//async function saveMessage(event) {
//  event.preventDefault();
//  const form = new FormData(event.target);
//
//  const message = {
//    message: form.get("message"),
//  };
//
//  const postMessage = await axios.post(`${url}/chat`, message, headers);
//
//  const messages = [postMessage.data.result];
//  await saveToLocalstorage(messages);
//}
//
//////////////////////////////////////////////////////
////display and update message
//////////////////////////////////////////////////////
//
//async function displayMessage(messages) {
//  const message_table = document.getElementById("messages-table");
//
//  message_table.innerHTML = "";
//
//  return messages.forEach((message) => {
//    const tr = document.createElement("tr");
//    tr.innerHTML = `<td>${message.msg}</td>`;
//
//    message_table.appendChild(tr);
//  });
//}
//
//async function update_msg(new_msg, msg_list) {
//  new_msg.forEach((record) => {
//    msg_list.shift();
//    msg_list.push({
//      id: record.id,
//      msg: record.message,
//      username: record.username,
//    });
//
//    return localStorage.setItem("msgRecord", JSON.stringify(msg_list));
//  });
//}
//
//////////////////////////////////////////////////////
////DOM
//////////////////////////////////////////////////////
//
//window.addEventListener("DOMContentLoaded", async () => {
//  const record = localStorage.getItem("msgRecord");
//  const msg_list = JSON.parse(record);
//  const last_record = msg_list[msg_list.length - 1].id;
//
//  const hello = await new Promise((resolve) => {
//    setTimeout(async () => {
//      if (record) {
//        const display = await displayMessage(msg_list);
//
//        const message = await axios.get(
//          `${url}/chat/?lastMsg=${last_record} `,
//          {
//            headers: { authorization: token },
//          }
//        );
//        const update = await update_msg(message.data.chat, msg_list);
//        resolve(update);
//      } else {
//        console.log("no msg");
//      }
//    }, 1000);
//  });
//  call_it();
//});
//
