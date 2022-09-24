async function loginUser(event) {
  event.preventDefault();
  const form = new FormData(event.target);

  const login = {
    email: form.get("email"),
    password: form.get("password"),
  };

  await axios
    .post("http://localhost:5000/login", login)
    .then((result) => {
      localStorage.setItem("token", result.data.token);
      alert("logged in successfully");
      window.location.href = "http://localhost:5000/chat.html";
    })
    .catch((err) => {
      alert(err.response.data.message);
    });
}
