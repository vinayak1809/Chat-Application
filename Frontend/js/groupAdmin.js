const openChgAdmin = document.getElementById("open-chg-admin");
const closeChgAdmin = document.getElementById("close-chg-admin");
const chgAdminContainer = document.getElementById("chg-admin-conatiner");

const clickToChgAdmin = document.getElementById("click-to-chg-admin");

///////////////////////////////////////////
// show users to change admin
///////////////////////////////////////////

openChgAdmin.addEventListener("click", async (e) => {
  chgAdminContainer.classList.add("active");

  try {
    var group_id = { group_id: e.target.name };

    const GroupMember = await axios.post(
      `${url}/get-grp-members`,
      group_id,
      headers
    );

    clickToChgAdmin.innerHTML = "";

    GroupMember.data.load_user.forEach((element) => {
      const btn = document.createElement("button");
      btn.id = element.id;
      btn.innerHTML = element.name;
      btn.name = group_id.group_id;
      clickToChgAdmin.appendChild(btn);
    });
  } catch (err) {
    console.log(err, " in show users to change admin");
  }
});

closeChgAdmin.addEventListener("click", () => {
  chgAdminContainer.classList.remove("active");
});

///////////////////////////////////////////
// click on user and change admin
///////////////////////////////////////////

clickToChgAdmin.addEventListener("click", async (e) => {
  const group = { user_id: e.target.id, grp_id: e.target.name };

  const change_admin = axios
    .post(`${url}/change-admin`, group, headers)
    .then((result) => {
      console.log(result);
    });
});

///////////////////////////////////////////
// remove user from group section
///////////////////////////////////////////

const openRemoveUser = document.getElementById("open-remove-user");
const closeRemoveUser = document.getElementById("close-remove-user");
const removeUserConatiner = document.getElementById("remove-user-conatiner");

const clickOnUserToRemove = document.getElementById("click-to-remove-user");

openRemoveUser.addEventListener("click", async (e) => {
  removeUserConatiner.classList.add("active");

  try {
    var group_id = { group_id: e.target.name };

    const GroupMember = await axios.post(
      `${url}/get-grp-members`,
      group_id,
      headers
    );

    clickOnUserToRemove.innerHTML = "";

    GroupMember.data.load_user.forEach((element) => {
      const btn = document.createElement("button");
      btn.id = element.id;
      btn.innerHTML = element.name;
      btn.name = group_id.group_id;
      clickOnUserToRemove.appendChild(btn);
    });
  } catch (err) {
    console.log(err, " in show users to change admin");
  }
});

closeRemoveUser.addEventListener("click", () => {
  removeUserConatiner.classList.remove("active");
});

///////////////////////////////////////////
// click on user and remove him from group
///////////////////////////////////////////

clickOnUserToRemove.addEventListener("click", async (e) => {
  console.log(e.target.id, e.target.name);
  const send = { usedid: e.target.id, groupid: e.target.name };
  try {
    const sendReqToRemUser = await axios.post(
      `${url}/remove-from-group`,
      send,
      headers
    );
    sendReqToRemUser.then(() => {
      alert("user removed");
    });
  } catch (error) {}
});
