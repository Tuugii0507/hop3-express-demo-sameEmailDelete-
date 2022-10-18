const express = require("express");
const app = express();

app.use(express.json());
let words = {
  classroom: "анги",
  guy: "залуу",
  ladie: "бүсгүй",
  book: "ном",
  food: "хоол",
  phone: "утас",
  dialogue: "харилцан яриа",
};

app.get("/:name", (req, res) => {
  if (words[req.params.name]) {
    res.send("translation : " + words[req.params.name]);
  } else {
    res.send("word not found");
  }
});

app.post("/add_word", (req, res) => {
  words = { ...words, ...req.body };
  console.log(words);
  res.send("Added a word");
});

app.put("/edit_word", (req, res) => {
  for (let word in words) {
    for (let newWord in req.body) {
      if (word === newWord) {
        words[word] = req.body[newWord];
      }
    }
  }
  res.send("Words edited");
});

app.delete("/delete_word", (req, res) => {
  delete words[Object.keys(req.body)]
  res.send( words);
});

app.listen(3000, () => {
  console.log("servers is running");
});
