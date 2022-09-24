async function saveUser(event) {
  event.preventDefault();
  const form = new FormData(event.target);

  const Signup = {
    name: form.get("name"),
    email: form.get("email"),
    phone_number: form.get("ph_num"),
    password: form.get("password"),
  };

  await axios
    .post("http://localhost:5000/signup", Signup)
    .then((result) => {
      alert("signup successfully");
      window.location.href = "http://localhost:5000/login.html";
    })
    .catch((err) => {
      alert(err.response.data.message);
    });
}
