const openCreateGrp = document.getElementById("openCreateGrp");
const closeCreateGrp = document.getElementById("closeCreateGrp");
const showCreateGroup = document.getElementById("container");
const showGrpMsgs = document.getElementById("GrpMsgs");

let checkboxes = document.querySelectorAll('input[name="public"]:checked');

///////////////////////////////////////////
// DOM to load group information
///////////////////////////////////////////

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const grp_info = await axios.get(`${url}/get-groups`, {
      headers: { authorization: token },
    });

    grp_info.data.group_info.forEach((group) => {
      const button = document.createElement("button");
      button.setAttribute("onclick", "callGrp(event);");
      button.id = group.id;
      button.innerHTML = group.groupName;

      groups.appendChild(button);
    });
  } catch (err) {
    console.log(err, "in Dom to load group information");
  }
});

///////////////////////////////////////////
// open and close create group
///////////////////////////////////////////

openCreateGrp.addEventListener("click", () => {
  showCreateGroup.classList.add("active");
});

closeCreateGrp.addEventListener("click", () => {
  showCreateGroup.classList.remove("active");
  showGrpMsgs.innerHTML = "";
  window.location.href = "http://localhost:5000/chat.html";
});

///////////////////////////////////////////
// make a group and add group member
///////////////////////////////////////////

async function SaveGrpMembers(event) {
  try {
    event.preventDefault();
    const n = document.querySelectorAll('input[name="public"]:checked');

    let id = [];
    n.forEach((checkbox) => {
      id.push(checkbox.id);
    });

    const form = new FormData(event.target);
    const grp_info = { name: form.get("grp_name"), users_ids: id };

    const log = await axios
      .post(`${url}/add-group-member`, grp_info, headers)
      .then((group_info) => {
        alert(group_info.data.message);
      });
  } catch (err) {
    console.log(err, "in SaveGrpMembers(event)");
  }
}

/////////////////////////////////////////////////////
// open and close view group messages
///////////////////////////////////////////

const groups = document.getElementById("groups");
const viewGroupContainer = document.getElementById("grp-msg-container"); //to open group
const closeGroupContainer = document.getElementById("close-grp-msg");
const groupForm = document.getElementById("submit-btn");

groups.addEventListener("click", async (e) => {
  viewGroupContainer.classList.add("active");
  showGrpMsgs.innerHTML = "";

  const input = document.createElement("input");
  input.type = "hidden";
  input.value = e.target.id;
  input.name = "grp-id";

  groupForm.appendChild(input);
});

closeGroupContainer.addEventListener("click", () => {
  viewGroupContainer.classList.remove("active");
});

///////////////////////////////////////////
// show Group information after clicking on specific group
///////////////////////////////////////////

async function callGrp(event) {
  try {
    event.preventDefault();
    const group_id = { group_id: event.target.id };

    const MsgList = await axios.post(`${url}/get-grp-msg`, group_id, headers);

    document.getElementById("Group-name").innerHTML = event.target.innerHTML;
    document.getElementById("admin").innerHTML = `${MsgList.data.group_admin}`;

    if (MsgList.data.authTochgAdmin) {
      document.getElementById("open-chg-admin").name = `${group_id.group_id}`;
      document.getElementById("open-remove-user").name = `${group_id.group_id}`;
    } else {
      document.getElementById("open-chg-admin").style.display = `none`;
      document.getElementById("open-remove-user").style.display = `none`;
    }

    MsgList.data.groupMsg.forEach((message) => {
      const li = document.createElement("li");
      li.innerHTML = message.messages;

      showGrpMsgs.appendChild(li);
    });
  } catch (err) {
    console.log(err, "callGrp(event)");
  }
}

///////////////////////////////////////////
// open and add messages in the group
///////////////////////////////////////////

async function SaveGrpMsg(event) {
  try {
    event.preventDefault();
    const form = new FormData(event.target);
    const forma = { message: form.get("message"), groupid: form.get("grp-id") };

    const postGrpMsg = await axios.post(`${url}/post-grp-msg`, forma, headers);

    alert(postGrpMsg.data.message);
  } catch (err) {
    console.log(err, "in SaveGrpMsg(event)");
  }
}
