const registerForm = document.querySelector("#register");
const main = document.querySelector("main");

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("this is register page");
  let name, email, password, cpassword;

  name = e.target.name.value;
  email = e.target.email.value;
  password = e.target.password.value;
  cpassword = e.target.cpassword.value;

  if (password !== cpassword) {
    let msg = document.createTextNode("Passwords do not match");
    let msgAlert = document.createElement("div");
    msgAlert.appendChild(msg);
    msgAlert.classList.add("error");
    main.insertBefore(msgAlert, createPwdForm);
    setTimeout(() => {
      msgAlert.classList.add("hidden");
    }, 6000);
    return;
  }

  if (password.length < 8) {
    let msg = document.createTextNode("Password must be at least 8 characters");
    let msgAlert = document.createElement("div");
    msgAlert.appendChild(msg);
    msgAlert.classList.add("error");
    main.insertBefore(msgAlert, createPwdForm);
    setTimeout(() => {
      msgAlert.classList.add("hidden");
    }, 6000);
    return;
  }

  const formData = {
    name,
    email,
    password,
  };
  console.log(formData);

  fetch("/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((data) => {
      console.log(data);
      const msgAlert = document.createElement("div");
      if (data.ok) {
        console.log(data.ok, data.message);
        let msg = document.createTextNode(data.message);
        msgAlert.appendChild(msg);
        msgAlert.classList.add("success");
        main.insertBefore(msgAlert, registerForm);
        setTimeout(() => {
          msgAlert.classList.add("hidden");
        }, 6000);
        name = e.target.name.value = "";
        email = e.target.email.value = "";
        password = e.target.password.value = "";
        cpassword = e.target.cpassword.value = "";
      } else {
        console.log(data.ok, data.message);
        let msg = document.createTextNode(data.message);
        msgAlert.appendChild(msg);
        msgAlert.classList.add("error");
        main.insertBefore(msgAlert, registerForm);
        setTimeout(() => {
          msgAlert.classList.add("hidden");
        }, 6000);
        name = e.target.name.value = "";
        email = e.target.email.value = "";
        password = e.target.password.value = "";
        cpassword = e.target.cpassword.value = "";
      }
    });
});
