async function loginUser(event) {
  event.preventDefault();
  const form = new FormData(event.target);

  const login = {
    email: form.get("email"),
    password: form.get("password"),
  };

  await axios
    .post("http://localhost:5000/login", login)
    .then(() => {
      alert("logged in successfully");
      //Window.location.href = "http://localhost:4000/login.html";
    })
    .catch((err) => {
      alert(err.response.data.message);
    });
}
