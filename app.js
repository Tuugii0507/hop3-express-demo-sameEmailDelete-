const express = require("express");
const app = express();

app.use(express.json());

var users = [
  {
    name: "Tuugii",
    email: "tuugii.1980.b@gmail.com",
    password: "password12345",
  },
  {
    name: "Bataa",
    email: "bataa.1980.b@gmail.com",
    password: "password12345",
  },
  {
    name: "Nasaa",
    email: "nasaa.1980.b@gmail.com",
    password: "password12345",
  },
];

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/greet/:name", (req, res) => {
  res.send("Hello, " + req.params.name);
});

app.post("/user", (req, res) => {
  users.push(req.body);
  console.log(users);
  res.send("user created");
});


app.delete("/user", (req, res) => {
  for (let i = 0; i <= users.length; i++) {
    if (users[i].email === req.body.email) {
      // delete users[i]
      users.splice(i, 1);
      break;
    }
  }
  res.send(users);
});


app.listen(3000, () => {
  console.log("servers is running");
});




