const error = document.getElementById("error");
const form = document.querySelector("#form");
const loginButton = document.getElementById("login");

// const login = document.getElementsByTagName('login');
const url_login = "https://stocka-zuri-api.herokuapp.com/auth/login/";

window.addEventListener("load", async () => {
  console.log("loaded");
  // const data = {
  //   email: email,
  //   password: password,
  // };

  form.addEventListener("submit", async (e) => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };

    console.log("working");
    console.log(email);

    await login(url_login, data); // await repsonse since it takes some time to get data.
  });
});

async function login(url = "", data = {}) {
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      if (response.user.status_code === 403) {
        // user not found
        error.innerHTML = response.user.detail;
      } else if (response.user.status_code === 400) {
        // empty fields
        error.innerHTML =
          "Email: " +
          response.user.email +
          ".<br/> Password: " +
          response.user.password;
        console.log(response.user.email);
        console.log(response.user.password);
      } else {
        error.style.color = "green";
        error.innerHTML = "success login in";

        localStorage.setItem("token", response.user.token.access);
        localStorage.setItem("username", response.user.email);
        //  form.setAttribute('action','./post-category.html');
        window.location = "./post-category.html";
      }
    })
    .catch((error) => console.log(error));
}