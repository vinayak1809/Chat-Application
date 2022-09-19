const url = "http://localhost:5000";
const token = localStorage.getItem("token");

function saveMessage(event) {
  event.preventDefault();
  const form = new FormData(event.target);

  const message = {
    message: form.get("message"),
  };
  axios
    .post(`${url}/chat`, message, {
      headers: { authorization: token },
    })
    .then(() => {
      alert("message added");
    });
}
